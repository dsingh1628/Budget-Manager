

var contextMenuItem={
    "id":"spendMoney",
    "title":"spendMoney",
    "contexts":["selection"]
}

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){   

if (clickData.menuItemId == "spendMoney" && clickData.selectionText){ 

    if(isValidAmount(clickData.selectionText)){
    chrome.storage.sync.get(["total","limit"],function(dbRef){
         let newTotal=0;
        if(dbRef.total){
            newTotal+=parseFloat(dbRef.total);
        }

        newTotal+=parseFloat(clickData.selectionText);
        
        setData(dbRef,newTotal);
    });
}else{
   
    console.log(parseFloat(clickData.selectionText)+ clickData.selectionText);
}

}
});


function isValidAmount(data){

    return parseFloat(data)==data?true:false;
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

chrome.storage.onChanged.addListener(function(changes,storageName){

    chrome.browserAction.setBadgeText({
        "text":changes.total.newValue.toString()
    });

});

