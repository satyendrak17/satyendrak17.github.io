var firebaseConfig = {
apiKey: "AIzaSyDyocYBBL4dR14jfIKpO-zWgzGCCnGOLFQ",
authDomain: "pushnotification-81fec.firebaseapp.com",
databaseURL: "https://pushnotification-81fec.firebaseio.com",
projectId: "pushnotification-81fec",
storageBucket: "pushnotification-81fec.appspot.com",
messagingSenderId: "679966463354",
appId: "1:679966463354:web:f2cc464dfcf0a07f0c72c3",
measurementId: "G-Q73RM9B0CB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log("Loading app.js");
const messaging = firebase.messaging();
  messaging.requestPermission().then(function(){
  console.log("Messaging getToken", messaging.getToken());
  return messaging.getToken();
  }).then(function(token){
	  const messagesElement = document.querySelector('#token');
	  const dataHeaderELement = document.createElement('h5');
	  const dataElement = document.createElement('pre');
	  dataElement.style = 'overflow-x:hidden;';
	  dataElement.textContent = token;
	   messagesElement.appendChild(dataElement);
  console.log("TOKEN: " + token);
  sendTokenToServer(token);
  })
  
  function sendTokenToServer(token)
{
    var xmlHttp = new XMLHttpRequest();
	console.log("Calling server");
	xmlHttp.onreadystatechange = function() {
	  if (this.readyState == 4 ) {
		  
		  if (xmlHttp.status == 200) {
                
				document.getElementById("demo").innerHTML = xmlHttp.responseText;
            }
		document.getElementById("demo").innerHTML = xmlHttp.responseText;
	  }
	};
    /* xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    } */
	setTimeout(function(){ 
	var url = "https://dev-external.smefirst.com/api/send/notification" + "?token=" + token
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send();
	}, 8000);
	
}
  
  messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
  });
  
  
  function appendMessage(payload) {
    const messagesElement = document.querySelector('#messages');
    const dataHeaderELement = document.createElement('h5');
    const dataElement = document.createElement('pre');
    dataElement.style = 'overflow-x:hidden;';
    dataHeaderELement.textContent = 'Received message:';
    dataElement.textContent = JSON.stringify(payload, null, 2);
    messagesElement.appendChild(dataHeaderELement);
    messagesElement.appendChild(dataElement);
  }
  
  