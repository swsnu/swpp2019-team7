importScripts('https://www.gstatic.com/firebasejs/7.2.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.3/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyCTwtNJzyKJg6vD1MMrpvKYeXpzBrv3e90",
    authDomain: "fir-c769f.firebaseapp.com",
    databaseURL: "https://fir-c769f.firebaseio.com",
    projectId: "fir-c769f",
    storageBucket: "fir-c769f.appspot.com",
    messagingSenderId: "907542495339",
    appId: "1:907542495339:web:d7c280ebb697d50f8fb12e",
    measurementId: "G-PCGWM5N0RX"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {

    const notificationTitle = payload.title;
    const notificationOptions = {
        icon: payload.icon,
        body: payload.body,
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});