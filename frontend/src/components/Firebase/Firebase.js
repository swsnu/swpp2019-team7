import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCTwtNJzyKJg6vD1MMrpvKYeXpzBrv3e90',
  authDomain: 'fir-c769f.firebaseapp.com',
  databaseURL: 'https://fir-c769f.firebaseio.com',
  projectId: 'fir-c769f',
  storageBucket: 'fir-c769f.appspot.com',
  messagingSenderId: '907542495339',
  appId: '1:907542495339:web:d7c280ebb697d50f8fb12e',
  measurementId: 'G-PCGWM5N0RX',
};

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    this.messaging = firebase.messaging();
    this.messaging.usePublicVapidKey('BESeE4VQofG0e8ghA0Y80LVHrTNUTA81sHrdf6DYjb2rGZwGKTxRTkTcUQoc8dhmdoI9389yHloGV5_9dNs_2wQ');
    this.token = null;
  }

  requestPermission = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification request permitted.');
      } else {
        console.log('Unable to get permission to notify.');
      }
    });
  };

  async getToken() {
    this.requestPermission();
    let token = null;
    await this.messaging.getToken()
      .then((currentToken) => {
        if (currentToken) {
          token = currentToken;
        } else {
          // Show permission request.
          console.log('getToken: No Instance ID token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('getToken: An error occurred while retrieving token. ', err);
      });

    // Callback fired if Instance ID token is updated.
    this.messaging.onTokenRefresh(function () {
      this.messaging.getToken()
        .then((refreshedToken) => {
          token = refreshedToken;
          console.log('onTokenRefresh getToken Token refreshed.');
        })
        .catch((err) => {
          console.log('onTokenRefresh getToken Unable to retrieve refreshed token ', err);
        });
    });

    this.token = token;
    return token;
  }
}

export default Firebase;
