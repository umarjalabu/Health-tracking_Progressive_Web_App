import exercise_db, {
    bulk_create,
    getData,
    createEle
}from './Module.js';



let dbe = exercise_db("Exercise_db", {
    exercise_data: '++id,e_type,e_duration, date_entry'
});

//input tags
const e_id = document.getElementById('e_id');
const exercise_type = document.getElementById('exercise_type');
const exercise_duration = document.getElementById('exercise_duration');
const date_ = document.getElementById('date_');

//buttons
const btn_create = document.getElementById('btn-create');
const btn_post = document.getElementById('btn-post');
const btn_update = document.getElementById('btn-update');
const btn_delete = document.getElementById('btn-delete');


btn_create.onclick = (event) =>{
    let flag = bulk_create(dbe.exercise_data,
        {
            e_type: exercise_type.value,
            e_duration: exercise_duration.value,
            date_entry: date_.value
        })
    console.log(flag);
    exercise_type.value = exercise_duration.value = date_.value ="";
    getData(dbe.exercise_data,
        (data) => {
            //console.log(data.user_id);
            e_id.value = data.e_id + 1 || 1;

        });
}

// create event on btn read button
btn_post.onclick = table;

btn_update.onclick = ()=>{
    const id = parseInt(e_id.value || 0)
    if(id){
        dbe.exercise_data.update(id,{
            e_type: exercise_type.value,
            e_duration: exercise_duration.value,
            date_entry: date_.value
        }).then((updated)=>{
            let get = updated?'data updated': 'coundnt update data';
            console.log(get);
        })
    }
}
// delete button
btn_delete.onclick = ()=>{
    dbe.delete();
    dbe = exercise_db("Exercise_db", {
        exercise_data: '++id,e_type,e_duration, date_entry'
    });
    dbe.open();
    table();
}
window.onload = ()=>{
    textID(e_id);
}
function textID(textboxid){
    getData(dbe.exercise_data, data=>{
        textboxid.value = data.id + 1||1;
    })
}

function table(){
    const tbody = document.getElementById("tbody");

    while(tbody.hasChildNodes()){
        tbody.removeChild(tbody.firstChild);
    }

    getData(dbe.exercise_data, (data)=>{
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

    dbe.exercise_data.get(id,data=>{
        e_id.value = data.id || 0;
        exercise_type.value = data.e_type || "";
        exercise_duration.value = data.e_duration || "";
        date_.value = data.date_entry || "";
    })
}



