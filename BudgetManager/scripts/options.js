
window.onload=function(){

document.getElementById("submit").addEventListener("click", setLimit);
document.getElementById("reset").addEventListener("click", resetTotal);

  chrome.storage.sync.get("limit",function(dbRef){
     document.getElementById('limit').value=dbRef.limit;

    });
}

function setLimit(){
    console.log("inside setlimit");
    var limit=document.getElementById('limit').value;
    console.log("limit"+limit);
    if(limit)
    chrome.storage.sync.set({"limit":limit});

}

function resetTotal(){
 
chrome.storage.sync.set({"total":''});

}