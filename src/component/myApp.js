
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import {useEffect} from 'react'

const firebaseConfig = {
  apiKey: "AIzaSyCZjfK2QrONlyGwqofK-wv1m1v8HSyVUcQ",
  authDomain: "group1-baa04.firebaseapp.com",
  projectId: "group1-baa04",
  storageBucket: "group1-baa04.appspot.com",
  messagingSenderId: "171067933252",
  appId: "1:171067933252:web:445d4e85bfc47eb0067211",
  measurementId: "G-5EX4KB0D0Z",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function MyApp(){

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Initialize Firebase

async function test(){
try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815,
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

console.log("ok");

}
  useEffect(() => {
    test();
  }, []);

return <div>myApp</div>
}

export default MyApp
