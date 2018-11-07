// import * as firebase from "firebase";
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

export {
  auth,
};
// --- in handleSubmit // note change this to date/language/name
// firebase.database().ref(this.state.date + "/" + this.state.name).set({
//       gradYear: this.state.gradYear,
//       service: this.state.service,
//       language: this.state.language,
//       school: this.state.school
//     });