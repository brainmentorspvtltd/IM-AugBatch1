// window.addEventListener("load",init);
// function init(){
//     console.log("Loaded...");
//     document.querySelector("#compute").addEventListener("click",computeIt);
// }
window.addEventListener("DOMContentLoaded",()=>document.querySelector("#compute").addEventListener("click",computeIt));

function computeIt(){
    //console.log("Compute It call");
    var basicSalary = document.querySelector("#basicsalary").value;
    salaryOperations.takeSalary(basicSalary);
    printResults();
}
function printResults(){
    //document.querySelector("#hra").innerHTML = salaryOperations.hra();
    //document.querySelector("#da").innerHTML = salaryOperations.da();
    for(let key in salaryOperations){
        if(typeof salaryOperations[key]=="function"){
        if(key=="takeSalary"){
        continue;
        }
        document.querySelector("#"+key).innerHTML = salaryOperations[key]();
        //console.log("Key is ",key, typeof key, " Value ",salaryOperations[key]()  );
        }
        }
}