import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_apiKey,
//   authDomain: import.meta.env.VITE_authDomain,
//   projectId: import.meta.env.VITE_projectId,
//   storageBucket: import.meta.env.VITE_storageBucket,
//   messagingSenderId: import.meta.env.VITE_messagingSenderId,
//   appId: import.meta.env.VITE_appId,
// };

const firebaseConfig = {
  apiKey: "AIzaSyA66b-zWmJ2fvsJNUC69Bhjx_beg_8038c",
  authDomain: "tech-hunter-536c9.firebaseapp.com",
  projectId: "tech-hunter-536c9",
  storageBucket: "tech-hunter-536c9.appspot.com",
  messagingSenderId: "549232930937",
  appId: "1:549232930937:web:27ed842ed86fb0628124a8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);


