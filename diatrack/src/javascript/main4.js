import nutrition_db, {
    bulk_create,
    getData,
    createEle
}from './Module.js';


let dbn = nutrition_db('Nutrition_db',{
    nutrition_data: '++id,w_intake, c_intake, date_entry'
});

// input tags
const wn_id = document.getElementById('wn_id');
const water_intake = document.getElementById('water_intake');
const carbo_intake = document.getElementById('carbo_intake');
const date_ = document.getElementById('date_');

//
const btn_create = document.getElementById('btn-create');
const btn_post = document.getElementById('btn-post');
const btn_update = document.getElementById('btn-update');
const btn_delete = document.getElementById('btn-delete');

btn_create.onclick = (event) =>{
    let flag = bulk_create(dbn.nutrition_data,
        {
            w_intake: water_intake.value,
            c_intake: carbo_intake.value,
            date_entry: date_.value

        })
    console.log(flag);
    water_intake.value = carbo_intake.value = date_.value = "";
    getData(dbn.nutrition_data,
        (data) => {
            //console.log(data.m_id);
            wn_id.value = data.wn_id + 1 || 1;

        });
}

// create event on btn read button
btn_post.onclick = table;

btn_update.onclick = ()=>{
    const id = parseInt(wn_id.value || 0)
    if(id){
        dbn.exercise_data.update(id,{
            w_intake: water_intake.value,
            c_intake: carbo_intake.value,
            date_entry: date_.value
        }).then((updated)=>{
            let get = updated?'data updated': 'coundnt update data';
            console.log(get);
        })
    }
}
// delete button
btn_delete.onclick = ()=>{
    dbn.delete();
    dbn = nutrition_db("Nutrition_db", {
        nutrition_data: '++id,w_intake, c_intake, date_entry'
    });
    dbn.open();
    table();
}
window.onload = ()=>{
    textID(wn_id);
}
function textID(textboxid){
    getData(dbn.nutrition_data, data=>{
        textboxid.value = data.id + 1||1;
    })
}

function table(){
    const tbody = document.getElementById("tbody");

    while(tbody.hasChildNodes()){
        tbody.removeChild(tbody.firstChild);
    }

    getData(dbn.nutrition_data, (data)=>{
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

            })
        }
    })
}

function edit_button(event){
    //console.log(event.target.dataset.id)
    let id = parseInt(event.target.dataset.id);

    dbn.exercise_data.get(id,data=>{
        wn_id.value = data.id || 0;
        water_intake.value = data.w_intake || "";
        carbo_intake.value = data.c_intake || "";
        date_.value = data.date_entry || "";
    })
}