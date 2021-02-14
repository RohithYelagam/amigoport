import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD1yYKNWvh8ECww6olJKoCmszmx_rs-bSQ",
    authDomain: "amigoport.firebaseapp.com",
    projectId: "amigoport",
    storageBucket: "amigoport.appspot.com",
    messagingSenderId: "1092895900642",
    appId: "1:1092895900642:web:8fb7b480dc7aa468082fbb",
    measurementId: "G-09VVTS3284"
  };
  const firebaseapp = firebase.initializeApp(firebaseConfig);
  const db = firebaseapp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();


  export { auth, provider};
  export default db;