// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set} from 'firebase/database';
import { useState, useEffect } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwp2VEqu9IFnO16oXl4aB5LLRMfOMnQqY",
  authDomain: "scheduler-a5d2c.firebaseapp.com",
  databaseURL: "https://scheduler-a5d2c-default-rtdb.firebaseio.com",
  projectId: "scheduler-a5d2c",
  storageBucket: "scheduler-a5d2c.appspot.com",
  messagingSenderId: "242769623904",
  appId: "1:242769623904:web:629ec1dc77774571f1fc05",
  measurementId: "G-KFXHWL1QX2"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);


export const setData = (path, value) => (
  set(ref(database, path), value)
);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };