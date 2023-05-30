import blood_glucose_db, {
    bulk_create,
    getData,
    createEle
}from './Module.js';


let db = blood_glucose_db("Blood_Glucose_db", {
    blood_glucose: '++id,readings, date_entry'
});

// input tags
const user_id = document.getElementById('user_id');
const blood_reading = document.getElementById('blood_reading');
const date_ = document.getElementById('date_');

//buttons
const btn_create = document.getElementById('btn-create');
const btn_read = document.getElementById('btn-read');
const btn_update = document.getElementById('btn-update');
const btn_delete = document.getElementById('btn-delete');

//
btn_create.onclick = (event) =>{
    let flag = bulk_create(db.blood_glucose,
        {
            readings: blood_reading.value,
            date_entry: date_.value
        })
    console.log(flag);
    blood_reading.value = date_.value ="";
    getData(db.blood_glucose,
        (data) => {
            //console.log(data.user_id);
            user_id.value = data.user_id + 1 || 1;

        });
}

// create event on btn read button
btn_read.onclick = table;

// create event on btn update button
btn_update.onclick = ()=>{
    const id = parseInt(user_id.value || 0)
    if(id){
        db.blood_glucose.update(id,{
            readings : blood_reading.value,
            date_entry : date_.value
        }).then((updated)=>{
            let get = updated?'data updated': 'coundnt update data';
            console.log(get);
        })
    }
}
// create event on btn delete button
btn_delete.onclick = ()=>{
    db.delete();
    db = blood_glucose_db("Blood_Glucose_db", {
        blood_glucose: '++id,readings, date_entry'
    });
    db.open();
    table();
}

//window onload event
window.onload = ()=>{
    textID(user_id);
}
function textID(textboxid){
    getData(db.blood_glucose, data=>{
        textboxid.value = data.id + 1||1;
    })
}


function table(){
    const tbody = document.getElementById("tbody");

    while(tbody.hasChildNodes()){
        tbody.removeChild(tbody.firstChild);
    }

    getData(db.blood_glucose, (data)=>{
        //console.log(data)


        if(data){
            createEle("tr",tbody,tr =>{


                for (const value in data){

                    createEle("td",tr, td=>{
                        td.textContent = data[value];
                    })
                }
                createEle("td",tr, td=>{
                    createEle("i", td,i =>{
                        i.className += "fas fa-edit btnedit";
                        i.setAttribute('data-id',data.id)
                        i.onclick = edit_button;

                    })
                })
                // createEle("td",tr, td=>{
                //     createEle("i", td,i =>{
                //         i.className += "fas fa-trash-alt btndelete";
                //         i.setAttribute('data-id',data.user_id);
                //         i.onclick = delete_button;
                //
                //     })
                // })
            })
        }
    })
}

function edit_button(event){
    //console.log(event.target.dataset.id)
    let id = parseInt(event.target.dataset.id);

    db.blood_glucose.get(id,data=>{
        user_id.value = data.id || 0;
        blood_reading.value = data.readings || "";
        date_.value = data.date_entry || "";
    })
}
// function delete_button(event){
//     let id = parseInt(event.target.dataset.id);
//     db.blood_glucose.delete(id);
//     table();
// }

