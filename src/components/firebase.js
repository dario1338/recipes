import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfO_pvGq20xHCI1iFoKa_CMGOvd54oStQ",
  authDomain: "recipesdb-48420.firebaseapp.com",
  databaseURL: "https://recipesdb-48420-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "recipesdb-48420",
  storageBucket: "recipesdb-48420.appspot.com",
  messagingSenderId: "675113857738",
  appId: "1:675113857738:web:5577e4fddbbc0c9fffba33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);