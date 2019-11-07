import * as firebase from 'firebase';

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

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    firebase.analytics();

    const messaging = firebase.messaging();
    messaging.usePublicVapidKey('BDw_yOOH_N4lbHNd6BAdt1UWdfeYAAShD4Obhzzhr-RNzlXLp4R5-7pkIE-wc2uNiKTlRKpogt7LTCcKjNVEWro');
    this.requestPermission();
    this.getToken(messaging);
    // Callback fired if Instance ID token is updated.
    messaging.onTokenRefresh(function () {
      messaging.getToken()
        .then(function (refreshedToken) {
          console.log('onTokenRefresh getToken Token refreshed.');
          console.log('onTokenRefresh getToken', refreshedToken);
        })
        .catch(function (err) {
          console.log('onTokenRefresh getToken Unable to retrieve refreshed token ', err);
        });
    });
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

  getToken(messaging) {
    messaging.getToken()
      .then(function (currentToken) {
        if (currentToken) {
          console.log("getToken", currentToken);
        } else {
          // Show permission request.
          console.log('getToken: No Instance ID token available. Request permission to generate one.');
        }
      })
      .catch(function (err) {
        console.log('getToken: An error occurred while retrieving token. ', err);
    });
  }
}

export default Firebase;
