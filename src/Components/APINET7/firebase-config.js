// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBq7OAIKvHlRS3Y_sc_9eiQG7rplga7jKM",
  authDomain: "reactjs-firebase-auth-8595d.firebaseapp.com",
  projectId: "reactjs-firebase-auth-8595d",
  storageBucket: "reactjs-firebase-auth-8595d.appspot.com",
  messagingSenderId: "806754874436",
  appId: "1:806754874436:web:c91bcac84df3bba509f811",
  measurementId: "G-KCQQWW81PP",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// const provider = new GoogleAuthProvider();

// export const signInWithGoogle = () => {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       const displayName = result.user.displayName;
//       const email = result.user.email;
//       const photoURL = result.user.photoURL;
//       localStorage.setItem("name", displayName);
//       localStorage.setItem("email", email);
//       localStorage.setItem("photo", photoURL);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
