import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAXKngTUpO91T6ujhF4CbYoU6XSAzHRWAs",
    authDomain: "planify-b7864.firebaseapp.com",
    projectId: "planify-b7864",
    storageBucket: "planify-b7864.appspot.com",
    messagingSenderId: "771217012034",
    appId: "1:771217012034:web:906c1caba4b39423bb84db",
    measurementId: "G-2227P60HJF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export default app;