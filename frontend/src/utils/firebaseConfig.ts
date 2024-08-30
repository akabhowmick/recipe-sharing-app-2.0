// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBv3FuL4vdrRDZmbz7ZiOTA4O35MLGBhg",
  authDomain: "recipe-sharing-app-6f66b.firebaseapp.com",
  projectId: "recipe-sharing-app-6f66b",
  storageBucket: "recipe-sharing-app-6f66b.appspot.com",
  messagingSenderId: "547739273078",
  appId: "1:547739273078:web:024d1d23fb0f865b241c57",
  measurementId: "G-VXL287812W",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
