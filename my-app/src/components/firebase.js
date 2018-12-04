import firebase from 'firebase/app';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyCcvypPOfoIdECYkbhJhVRc6T1gA7aOkbU",
    authDomain: "mlrc-5a590.firebaseapp.com",
    databaseURL: "https://mlrc-5a590.firebaseio.com",
    projectId: "mlrc-5a590",
    storageBucket: "mlrc-5a590.appspot.com",
    messagingSenderId: "866673220218"
  };
  firebase.initializeApp(config);
  
const auth = firebase.auth();

/*
// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () =>
  auth.signOut();
*/
export {
    auth,
    firebase,
};
