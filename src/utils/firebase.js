// // Import the functions you need from the SDKs you need
// import { getAnalytics, isSupported } from "firebase/analytics";
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyBGkFWxj__ZTdIoSlYujN0krUK7xotE8KQ",
//   authDomain: "foodies-7731d.firebaseapp.com",
//   projectId: "foodies-7731d",
//   storageBucket: "foodies-7731d.appspot.com",
//   messagingSenderId: "198893075889",
//   appId: "1:198893075889:web:ac78f65d00114d016c1190",
//   measurementId: "G-T62TT8BT9J"
// };
// const app = initializeApp(firebaseConfig);
// isSupported().then(supported => {
//   if (supported) {
//     const analytics = getAnalytics(app);
//     // Analytics is initialized successfully
//   } else {
//     console.log('Firebase Analytics is not supported in this environment.');
//   }
// });
// const analytics = getAnalytics(app);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);



// export { auth, db, storage };


// Import the functions you need from the SDKs you need
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBGkFWxj__ZTdIoSlYujN0krUK7xotE8KQ",
  authDomain: "foodies-7731d.firebaseapp.com",
  projectId: "foodies-7731d",
  storageBucket: "foodies-7731d.appspot.com",
  messagingSenderId: "198893075889",
  appId: "1:198893075889:web:ac78f65d00114d016c1190",
  measurementId: "G-T62TT8BT9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics only if in the browser environment
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      const analytics = getAnalytics(app);
      // Analytics is initialized successfully
    } else {
      console.log('Firebase Analytics is not supported in this environment.');
    }
  });
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export Firebase services
export { auth, db, storage };
