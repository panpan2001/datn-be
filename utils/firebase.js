// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqhb4dG-xGhUqo7JX5tiqYVehSG1-0nzw",
  authDomain: "my-first-project-23-11-2021.firebaseapp.com",
  projectId: "my-first-project-23-11-2021",
  storageBucket: "my-first-project-23-11-2021.appspot.com",
  messagingSenderId: "201287288444",
  appId: "1:201287288444:web:ae5a2e1927bde4426dabf9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
export default firebaseApp