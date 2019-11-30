import firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/analytics';

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
/*
export function getOS() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;
  alert(platform)
  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  } else {
    os = 'Else';
  }
  alert(os)
  return os;
}*/
export function getOS() {
  var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
  alert(iOS)
  return iOS;
}


class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    if(!getOS()){
      alert('[constructor]this is NOT iOS')
      firebase.analytics();

      this.messaging = firebase.messaging();
      this.messaging.usePublicVapidKey('BESeE4VQofG0e8ghA0Y80LVHrTNUTA81sHrdf6DYjb2rGZwGKTxRTkTcUQoc8dhmdoI9389yHloGV5_9dNs_2wQ');
      this.token = null;
    } else {
      alert('[constructor]this is iOS')
    }
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
