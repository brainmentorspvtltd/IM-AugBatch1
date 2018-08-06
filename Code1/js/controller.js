window.addEventListener("load",init);
function init(){
    // Total Records 0 , UnMark 0 Mark 0
    // Check Records are in LocalStorage
    updateCount();
    bindEvents();
}
function bindEvents(){
    document.querySelector("#add").addEventListener("click",addItem);
}
function createIcon(path,fn){
    var img = document.createElement("img");
    img.src = path;
    img.addEventListener("click",fn);
    img.className = "size";
    return img;  
}
function markRecord(){
    console.log("Mark Record");
}
function editRecord(){
    console.log("Edit Record")
}
function printRecord(currentObject){
    if(currentObject){
        var tbody = document.querySelector("#itemlist");
        var tr = tbody.insertRow();
        let index = 0;
        for(let key in currentObject){
            tr.insertCell(index).innerText = currentObject[key];
            index++;
        }
        var td = tr.insertCell(index); //<td><img></td>
        td.appendChild(createIcon(paths.deleteIconPath,markRecord));
        td.appendChild(createIcon(paths.editIconPath,editRecord));
       // tr.insertCell(0).innerText = currentObject.id;
    }
}
function updateCount(){
    document.querySelector("#total").innerText = itemOperations.itemArray.length;
}
function addItem(){
    var id = document.querySelector("#itemid").value;
    var name = document.querySelector("#name").value;
    var desc = document.querySelector("#desc").value;
    var price = document.querySelector("#price").value;
    var color = document.querySelector("#color").value;
    var date = document.querySelector("#date").value;
    var url = document.querySelector("#url").value;
    itemOperations.add(id, name, desc, price, color, date,url);
    updateCount();
    printRecord(itemOperations.getLast());
}