// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
 firebase.initializeApp({
  'messagingSenderId': '679966463354'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

/* const inicializarFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: '679966463354'
  });
  
navigator.serviceWorker
    .register('/my-sw.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration);
    });
} */

/* messaging.onMessage((payload) => {
	getDetailedData();
    console.log('Message received in service worker ', payload);
    // [START_EXCLUDE]
    // Update the UI to include the received message.
   // appendMessage(payload);
    // [END_EXCLUDE]
	const title = 'Push Codelab';
	  const options = {
		body: 'Yay it works.',
		icon: 'images/icon.png',
		badge: 'images/badge.png'
	  };

	//event.waitUntil(self.registration.showNotification(title, options));
	return self.registration.showNotification(title, options)
  }); */
  
 messaging.setBackgroundMessageHandler(function(payload) {
	fetch('https://jsonplaceholder.typicode.com/todos/1')
	  .then(response => response.json())
	  .then(json => {
		  console.log('[firebase-messaging-sw.js] Received background message ', payload);
		  const notificationTitle = json.title;
		  const notificationOptions = {
			body: json.title + ' with my body',
			icon: '/firebase-logo.png'
		  };
		  console.log("Background json 3", json);
		  return self.registration.showNotification(notificationTitle,
			notificationOptions);
	  });
});
 
 function callDummyAPI(){
 
 
 }
  
  function getDetailedData()
{
	alert("getDetailedData");
    var xmlHttp = new XMLHttpRequest();
	console.log("Calling server");
	xmlHttp.onreadystatechange = function() {
	  if (this.readyState == 4 ) {
		  alert(xmlHttp.readyState);
		  if (xmlHttp.status == 200) {
                alert(xmlHttp.responseText);
				document.getElementById("demo").innerHTML = xmlHttp.responseText;
            }
		document.getElementById("demo").innerHTML = xmlHttp.responseText;
	  }
	};
    /* xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    } */
	var token = "cgJFwAWDT08:APA91bGSHjbfnAEHQvgDpXlgxxQ-zPRfuxyNxKCP-3YXC6dqOuKe4cPAklWBzb6LC5a4GRi-G058T0WogrXcYZG20LTYflYX9xX9NFuYaQtX16fPtltvc9ZxfCo5-ijKfutTc0tWR_eQ";
	var url = "https://dev-external.smefirst.com/api/send/notification" + "?token=" + token;
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send();
}
  
 