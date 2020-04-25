import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBikYybI933v_jwoDzM8snIlWQI1GPFHJE",
  authDomain: "auth-39cb9.firebaseapp.com",
  databaseURL: "https://auth-39cb9.firebaseio.com",
  projectId: "auth-39cb9",
  storageBucket: "auth-39cb9.appspot.com"
};

const firebaseApp = firebase.initializeApp(config);
export const firebaseAppAuth = firebaseApp.auth();
export const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});
  