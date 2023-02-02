// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAcgewsIs21AmKor_ixuAD7BJ5S5pNh8hU',
  authDomain: 'food-order-react-8be84.firebaseapp.com',
  databaseURL: 'https://food-order-react-8be84-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'food-order-react-8be84',
  storageBucket: 'food-order-react-8be84.appspot.com',
  messagingSenderId: '162558646156',
  appId: '1:162558646156:web:a26da344f51048b51228a9'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);