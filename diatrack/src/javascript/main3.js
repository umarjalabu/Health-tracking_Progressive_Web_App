import medication_db, {
    bulk_create,
    getData,
    createEle
}from './Module.js';


let dbb = medication_db('Medication_db',{
    medicine_data: '++id,m_name, m_dosage'
});

//input tags
const m_id = document.getElementById('m_id');
const medicine_name = document.getElementById('medicine_name');
const dosage = document.getElementById('dosage');

//
const btn_create = document.getElementById('btn-create');
const btn_post = document.getElementById('btn-post');
const btn_update = document.getElementById('btn-update');
const btn_delete = document.getElementById('btn-delete');

btn_create.onclick = (event) =>{
    let flag = bulk_create(dbb.medicine_data,
        {
            m_name: medicine_name.value,
            m_dosage: dosage.value,
        })
    console.log(flag);
    medicine_name.value = dosage.value ="";
    getData(dbb.medicine_data,
        (data) => {
            //console.log(data.m_id);
            m_id.value = data.m_id + 1 || 1;

        });
}
// create event on btn read button
btn_post.onclick = table;

btn_update.onclick = ()=>{
    const id = parseInt(m_id.value || 0)
    if(id){
        dbb.medicine_data.update(id,{
            m_name: medicine_name.value,
            m_dosage: dosage.value,
        }).then((updated)=>{
            let get = updated?'data updated': 'coundnt update data';
            console.log(get);
        })
    }
}
// delete button
btn_delete.onclick = ()=>{
    dbb.delete();
    dbb = medication_db("Medication_db", {
        medicine_data: '++id,m_name, m_dosage'
    });
    dbb.open();
    table();
}
window.onload = ()=>{
    textID(m_id);
}
function textID(textboxid){
    getData(dbb.exercise_data, data=>{
        textboxid.value = data.id + 1||1;
    })
}

function table(){
    const tbody = document.getElementById("tbody");

    while(tbody.hasChildNodes()){
        tbody.removeChild(tbody.firstChild);
    }

    getData(dbb.medicine_data, (data)=>{
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

    dbb.medicine_data.get(id,data=>{
        m_id.value = data.id || 0;
        medicine_name.value = data.m_name || "";
        dosage.value = data.m_dosage || "";
    })
}