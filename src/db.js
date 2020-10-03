import firebase from "firebase/app";
import "firebase/firestore";

export const db = firebase
  .initializeApp({
    apiKey: "AIzaSyB_dytWhgdMlVYLpO14UxY3J0fj5l9AWSk",
    authDomain: "msc-3rd-evaluation.firebaseapp.com",
    databaseURL: "https://msc-3rd-evaluation.firebaseio.com",
    projectId: "msc-3rd-evaluation",
    storageBucket: "msc-3rd-evaluation.appspot.com",
    messagingSenderId: "935548380625",
    appId: "1:935548380625:web:bb4d175180be69d0f26cf0",
    measurementId: "G-M5YY821H8B",
  })
  .firestore();
