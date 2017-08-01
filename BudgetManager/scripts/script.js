
window.onload=function(){
document.getElementById("submit").addEventListener("click", updateTotal);
  chrome.storage.sync.get("total",function(dbRef){
     document.getElementById('total_spend').innerText=dbRef.total;
    });
     chrome.storage.sync.get("limit",function(dbRef){
     document.getElementById('limit').innerText=dbRef.limit;
    });
}

function updateTotal(){

console.log("inside updateTotal");
    chrome.storage.sync.get(["total","limit"],function(dbRef){
        let newTotal=0;
        if(dbRef.total){
            newTotal+=parseFloat(dbRef.total);
        }

        newTotal+=parseFloat(document.getElementById("amount").value);

        setData(dbRef,newTotal);
        document.getElementById('total_spend').innerText=newTotal;
        document.getElementById("amount").value="";


    });
}

  function setData(dbRef,newTotal){
     chrome.storage.sync.set({'total':newTotal},function(){
            console.log('limit'+dbRef+'totalSpend'+newTotal);
            console.dir(dbRef);
            if(newTotal>=dbRef.limit){
                var notifObject={
                    type:'basic',
                    title:'limit exceeded',
                    iconUrl:'./icons/budget-icon.png',
                    message:'Oops!! your expeditutre exceeded the limit'
                }
                chrome.notifications.create('NotifiId',notifObject);
            }
        });
}

 
