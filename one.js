var fs = require("fs");
function done(err,content){
    if(err){
        console.log("Error During File Read ",err);
    }
    else{
        console.log("Content is "+content);
    }

}
console.log("Before File Read");
fs.readFile(__filename,done);
for(let i = 1; i<=10 ; i++){
    console.log('time pass loop ',i);
}