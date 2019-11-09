import * as firebase from 'firebase';

/*
const config = {
  apiKey: "AIzaSyAzcizSnT2_MJwQOaAF8uJJLnGNkpd1Xv4",
  authDomain: "pillbox-95f6e.firebaseapp.com",
  databaseURL: "https://pillbox-95f6e.firebaseio.com",
  projectId: "pillbox-95f6e",
  storageBucket: "pillbox-95f6e.appspot.com",
  messagingSenderId: "2935002363",
  appId: "1:2935002363:web:64210d4c3b543381e6cc5e",
  measurementId: "G-72B2GDB01E"
};
*/

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

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    this.messaging = firebase.messaging();
    this.messaging.usePublicVapidKey('BESeE4VQofG0e8ghA0Y80LVHrTNUTA81sHrdf6DYjb2rGZwGKTxRTkTcUQoc8dhmdoI9389yHloGV5_9dNs_2wQ');
    /*
    messaging.setBackgroundMessageHandler(function(payload) {

      const notificationTitle = payload.data.title;
      const notificationOptions = {
        body: payload.data.body,
        //icon: payload.data.icon,
      };
    
      return window.self.registration.showNotification(notificationTitle,
        notificationOptions);
    });
    */
  }

  requestPermission = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification request permitted.');
      } else {
        console.log('Unable to get permission to notify.');
      }
    });
  }

  async getToken() {
    this.requestPermission();
    var token;
    await this.messaging.getToken()
      .then(function (currentToken) {
        if (currentToken) {
          token = currentToken;
          console.log("getToken", currentToken);
        } else {
          // Show permission request.
          console.log('getToken: No Instance ID token available. Request permission to generate one.');
        }
      })
      .catch(function (err) {
        console.log('getToken: An error occurred while retrieving token. ', err);
      });

    // Callback fired if Instance ID token is updated.
    this.messaging.onTokenRefresh(function () {
      this.messaging.getToken()
        .then(function (refreshedToken) {
          token = refreshedToken;
          console.log('onTokenRefresh getToken Token refreshed.');
          console.log('onTokenRefresh getToken', refreshedToken);
        })
        .catch(function (err) {
          console.log('onTokenRefresh getToken Unable to retrieve refreshed token ', err);
        });
    });
    return token;
  }
}

export default Firebase;
