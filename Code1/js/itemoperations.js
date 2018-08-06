const itemOperations = {
    itemArray:[],
    add(id, name, desc, price, color, date,url){
        var itemObject = new Item(id, name, desc, price, color, date,url);
        this.itemArray.push(itemObject);
    },
    getLast(){
        if(this.itemArray.length>0){
           return  this.itemArray[this.itemArray.length-1];
        }
        return null;
    }
}