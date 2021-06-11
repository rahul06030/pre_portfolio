import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAP2X0xP7NlMVwL_uRsgLfGXYrZuqMqKFA",
    authDomain: "portfolio-65d0d.firebaseapp.com",
    projectId: "portfolio-65d0d",
    databaseURL:'gs://portfolio-65d0d.appspot.com',
    storageBucket: "portfolio-65d0d.appspot.com",
    messagingSenderId: "979627188032",
    appId: "1:979627188032:web:f4051e544d76edeb72e4a5"
  };



    
  firebase.initializeApp(firebaseConfig);

// const storage = firebase.storage();
export default firebase;