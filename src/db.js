import firebase from "firebase/app";
import "firebase/firestore";

export const db = firebase
  .initializeApp({
    apiKey: "AIzaSyDKznTUfxMr2NYWyLCgYYzYaFDS7i2pyoU",
    authDomain: "hcin600-p2.firebaseapp.com",    
    projectId: "hcin600-p2",
    storageBucket: "hcin600-p2.appspot.com",
    messagingSenderId: "575687804336",
    appId: "1:575687804336:web:5ff96e6f2435e8095c0275"
  })
  .firestore();
