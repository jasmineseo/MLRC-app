import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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


export {
    auth,
    firebase,
};
