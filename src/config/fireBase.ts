import React from "react";
import { initializeApp } from "firebase/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyAQcL5wD1L8aB6q9vWb-Rw4ZKKgZCcqUcw",
  authDomain: "razistore-409ef.firebaseapp.com",
  projectId: "razistore-409ef",
  storageBucket: "razistore-409ef.appspot.com",
  messagingSenderId: "1064353186472",
  appId: "1:1064353186472:web:c26d1d74934be8099f789d",
  measurementId: "G-4H7KBZQP5Z",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage };
