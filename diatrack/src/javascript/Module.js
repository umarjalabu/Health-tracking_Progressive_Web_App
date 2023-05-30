// blood glucose database
const blood_glucose_db = (db_name, table) => {
    // create database
    const db = new Dexie(db_name)
    db.version(8).stores(table);
    db.open();
    return db;
}
// exercise database
const exercise_db = (db_name, table) => {
    // create database
    const dbe = new Dexie(db_name)
    dbe.version(1).stores(table);
    dbe.open();

    /*
    const db = new Dexie('myDb')
    db.version(1).stores({
        blood_data:'entry,date'
    })

     */
    return dbe;
}
// medicine database
const medication_db = (db_name, table) => {
    // create database
    const dbb = new Dexie(db_name)
    dbb.version(1).stores(table);
    dbb.open();

    /*
    const db = new Dexie('myDb')
    db.version(1).stores({
        blood_data:'entry,date'
    })

     */
    return dbb;
}

// exercise database
const nutrition_db = (db_name, table) => {
    // create database
    const dbn = new Dexie(db_name)
    dbn.version(1).stores(table);
    dbn.open();

    /*
    const db = new Dexie('myDb')
    db.version(1).stores({
        blood_data:'entry,date'
    })

     */
    return dbn;
}
// insert function
const bulk_create = (db_table, data)=> {
    let flag = empty(data);
    if(flag){
        db_table.bulkAdd([data]);
        console.log('data inserted successfully...!');
    }else {
        console.log("Please provide data...!");
    }
    return flag;
}

const empty = object =>{
    let flag = false;

    for(const value in object){
        if(object[value]!="" && object.hasOwnProperty(value)){
            flag = true;
        }else {
            flag = false;
        }
    }
    return flag;
}
// Get data from the database
const getData = (db_table, fn)=>{
    let index = 0;
    let obj = {};

    db_table.count((count)=>{
        if(count){
           db_table.each(table =>{
               obj = (table)
               fn(obj, index++);
            })
        }else {
            fn(0);
        }
    })
}

//create table element
const createEle = (tag_name, append_To,fn)=>{
    const element = document.createElement(tag_name);
    if(append_To)append_To.appendChild(element);
    if(fn)fn(element);

}

export default blood_glucose_db;
exercise_db();
medication_db();
nutrition_db();
export {
    bulk_create,
    getData,
    createEle
}