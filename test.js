console.log("logging from custom theme asset updated from github");
var x = document.getElementsByClassName("cjStoreCustomer");
var id = x[0].id;
console.log("customer id is" + id);



x = document.getElementsByClassName("cjStorePageType");
id = x[0].id;
console.log("pageType is" + id);

// var url = window.location.href;
// if(url.includes("cjevent")){
   
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   const cjEventId = urlParams.get('cjevent')
//   console.log("url parameter is" + cjEventId);

// }


// var x = document.getElementsByClassName("cjStoreCustomer");
// var id = x[0].id;
console.log("check test.js in onlinestore->edit code for this");

 


// var x = document.getElementsByClassName("cjStorePageType");
// var id = x[0].id;
// console.log("pageType is " + id);
var referralPeriod =    365;
var url = window.location.href;
var cjEvent = "cjjjj";
var isCjCookiePresent = false;
console.log("hello");
function checkForCjCookie() {
     var name = "cjevent=";
     var decodedCookie = decodeURIComponent(document.cookie);
     var ca = decodedCookie.split(';');
     for(var i=0; i<ca.length; i++) {
         var c = ca[i];
         while (c.charAt(0) == ' ') {
             c = c.substring(1);
         }
     //console.log(c);
     if (c.indexOf(name) == 0) {
         var value = (c.substring(name.length));
         if (cjEvent != undefined) {
            console.log('Found CJ Cookie=====>at===>', cjEvent);
            isCjCookiePresent = true;
            updateCookie();
     } else if (value != undefined){
         console.log('Found CJ Cookie, even though nothing in URL =====>at===>', value);
         setCjCookie('cjevent', value, referralPeriod);
     } else {
     }
    }
     }
     if (cjEvent && !isCjCookiePresent) {
         console.log('cjevent in URL but no cookie  =====>at===>', cjEvent);
         setCjCookie('cjevent', cjEvent, referralPeriod);
     }
}

 

function setCjCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + "path=/;domain=." + location.hostname.replace(/^www\./i,"");
     storeId(cvalue);
    
}

// function printAttribute(){
//   	console.log("print Attribute got called");
//   fetch("/cart.js")
//   .then((resp) => resp.json())
//   .then(function(data) {
//     console.log("This is data" + JSON.stringify(data));
//     if(data.attributes != undefined && data.attributes.cjevent.length != 0){
//       cjEventId = data.attributes.cjevent;
//       console.log("This is cj event id" + cjEventId);
//       var d = new Date();
//     	d.setTime(d.getTime() + (referralPeriod*24*60*60*1000));
//     	var expires = "expires="+ d.toUTCString();
//     	document.cookie = "cjevent_cart=" + cjEventId + ";" + expires + "path=/;domain=." + location.hostname.replace(/^www\./i,"");
//     }
//     })
//   .catch(function(error) {
//     // If there is any error you will catch them here
    
//   }); 
  
// }

async function getCJEventIdFromCart(){
        fetch("/cart.js")
          .then((resp) => resp.json())
          .then(function(data) {
            console.log("This is data" + JSON.stringify(data));
            if(data.attributes != undefined && data.attributes.cjevent.length != 0){
              cjEventId = data.attributes.cjevent;
              console.log("returning event id from getCart " + cjEventId);
              return cjEventId;
          }else{
            return "";
          }
        })
          .catch(function(error) {
            return "";
            
          });
        
    }

 

function storeId(cvalue) {
    var postData = {};
    var cartKey = "attributes[cjevent]";
    postData[cartKey] = cvalue
    console.log("posting data  =====>at===>", postData);
    //return $.post('/cart/update.js', postData, null, 'json');
  
    let formData = new FormData();
    //formData.append('name', 'John');
    formData.append('attributes[cjevent]', cvalue);
  
    fetch("/cart/update.js",
      {
          body: formData,
          method: "post"
      })
    .then(async function(){
      var result = await callGetCart();
      console.log("this is result in store Id " + result);
      
    });
    
//     fetch('/cart/update.js', {
//       method: 'POST', // or 'PUT'
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(postData),
//       })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Success:', data);
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
 
}
  
  async function callGetCart(){
    var result = await getCJEventIdFromCart();
    
    result.then((data) => {
      console.log(data);
      return data;
    });
  }

 

function updateCookie(){
     if (isCjCookiePresent) {
     console.log('Deleting cookie');
     setCjCookie('cjevent',"",-1);
     console.log('Adding new cookie');
     setCjCookie('cjevent', cjEvent, referralPeriod);
 }
}

 

checkForCjCookie()

