import app from 'firebase/app';
import * as firebase from "firebase";

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
    app.initializeApp(config);

    const messaging = firebase.messaging()
    messaging.usePublicVapidKey("BDw_yOOH_N4lbHNd6BAdt1UWdfeYAAShD4Obhzzhr-RNzlXLp4R5-7pkIE-wc2uNiKTlRKpogt7LTCcKjNVEWro")
  }
}

export default Firebase;