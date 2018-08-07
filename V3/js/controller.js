window.addEventListener("load",init);
var counter ;
function init(){
    // Total Records 0 , UnMark 0 Mark 0
    // Check Records are in LocalStorage
    counter = autoGen();
    updateCount();
    bindEvents();
    document.querySelector("#itemid").innerText = counter.next().value;
}
function loadItems(){
    if(localStorage){
        if(localStorage.items){
            var object = JSON.parse(localStorage.items);
            itemOperations.itemArray = object;
            printTable(itemOperations.itemArray);
        }
        else{
            alert("No Data in Storage...");
        }

    }
    else{
        alert("Not Supported ...");
    }
}
function loadFromServer(){
   // fetch(paths.url,{method:'post',body:JSON.stringify())
  fetch(paths.url).then(response=>{
      response.json().then(object=>{
          itemOperations.itemArray = object.items;
         console.log(itemOperations.itemArray instanceof Array);
          console.log("Item Array is ",itemOperations.itemArray);
          printTable(itemOperations.itemArray);
      }).catch(err=>{
          console.log("Invalid JSON ",err);
      }).catch(err=>{
          alert("Some Problem in Server Side");
      })
  })    
}
function saveItems(){
    if(localStorage){
        let json = JSON.stringify(itemOperations.itemArray);
        console.log("JSON is ",json, " And Array is ",itemOperations.itemArray);
        localStorage.items = json;
        alert("Data Saved...");
    }
    else{
        alert("Outdated Browser...");
    }
}
function bindEvents(){
    document.querySelector("#add").addEventListener("click",addItem);
    document.querySelector("#delete").addEventListener("click",deleteMarkRecords);
    document.querySelector("#save").addEventListener("click",saveItems);
    document.querySelector("#load").addEventListener("click",loadItems);
    document.querySelector("#loadfromserver").addEventListener("click",loadFromServer);
}
function printTable(itemArray){
    document.querySelector("#itemlist").innerHTML = "";
    if(itemArray instanceof Array){
    itemArray.forEach(printRecord);
    }
    else{
        Array.prototype.forEach.call(itemArray,function(currentObject){
            printRecord(currentObject);
        })
    }
   // updateCount();
}
function deleteMarkRecords(){
    printTable(itemOperations.removeMark());
}
function createIcon(path,fn, id){
    //var img = "<img src="
    var img = document.createElement("img");
    img.src = path;
    img.addEventListener("click",fn);
    img.className = "size";
    img.setAttribute("data-itemid", id);
    return img;  
}
function markRecord(){
    var id = this.getAttribute("data-itemid");
    console.log("Mark Record ",id);
    var tr = this.parentNode.parentNode;
    console.log("TR is ",tr);
    tr.classList.toggle("red");
    itemOperations.mark(id);
    updateCount();
}
function editRecord(){
    console.log("Edit Record")
}
function* autoGen(){
    var counter = 1;
    while(true){
    yield counter;
    counter++;
    }
    }
function printRecord(currentObject){
    if(currentObject){
        var tbody = document.querySelector("#itemlist");
        var tr = tbody.insertRow();
        let index = 0;
        for(let key in currentObject){
            if(key=='markForDelete'){
                continue;
            }
            tr.insertCell(index).innerText = currentObject[key];
            index++;
        }
        var td = tr.insertCell(index); //<td><img></td>
        td.appendChild(createIcon(paths.deleteIconPath,markRecord, currentObject.id));
        td.appendChild(createIcon(paths.editIconPath,editRecord, currentObject.id ));
       // tr.insertCell(0).innerText = currentObject.id;
    }
}
function updateCount(){
    document.querySelector("#total").innerText = itemOperations.itemArray.length;
    document.querySelector("#mark").innerText=itemOperations.markCount();
    document.querySelector("#unmark").innerText=itemOperations.itemArray.length-itemOperations.markCount();
}
function addItem(){
    var id = document.querySelector("#itemid").innerText;
    var name = document.querySelector("#name").value;
    var desc = document.querySelector("#desc").value;
    var price = document.querySelector("#price").value;
    var color = document.querySelector("#color").value;
    var date = document.querySelector("#date").value;
    var url = document.querySelector("#url").value;
    itemOperations.add(id, name, desc, price, color, date,url);
    document.querySelector("#itemid").innerText = counter.next().value;
    updateCount();
    printRecord(itemOperations.getLast());
}