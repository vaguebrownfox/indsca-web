import firebase from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import "firebase/firestore";

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
