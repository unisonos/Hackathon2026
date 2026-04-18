// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, startAt, endAt, doc, getDoc, addDoc} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGdzRBtWlab4zl9x2e2KHH1NnKgT9Yz6Y",
  authDomain: "musicboxstoredb.firebaseapp.com",
  projectId: "musicboxstoredb",
  storageBucket: "musicboxstoredb.firebasestorage.app",
  messagingSenderId: "465099257441",
  appId: "1:465099257441:web:b8529a1e52a26e80c61c20",
  measurementId: "G-4MW8YVQ2L3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();


export const getSongs = () => getDocs(collection(db, 'songs'));
export const getFilteredSongs = (text) => getDocs(query(collection(db, 'songs'), orderBy('song_name_lower'), startAt(text), endAt(text + '\uf8ff'))); 
export const getMusicBoxes = () => getDocs(collection(db, 'music_boxes'));
export const getProduct = (id) => getDoc(doc(db, 'music_boxes', id));
export const addPurchaseDetails = (purchaseDetails) => addDoc(collection(db, 'purchase_details'), purchaseDetails);
