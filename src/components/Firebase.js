import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/database"
import "firebase/storage"
import "firebase/functions"
const config = {
    apiKey: "AIzaSyBzq-HmsDERmuKCl6-bErS2iojGGA1BmTU",
    authDomain: "brewlliant-us.firebaseapp.com",
    databaseURL: "https://brewlliant-us.firebaseio.com",
    projectId: "brewlliant-us",
    storageBucket: "brewlliant-us.appspot.com",
    messagingSenderId: "793719200651",
    appId: "1:793719200651:web:a6c4cbc83e26128b"
};

firebase.initializeApp(config);
export default firebase;