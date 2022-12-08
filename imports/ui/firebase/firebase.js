import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBA6um5oRxzd9MB_UdkhocjTEjgjbra71A",
  authDomain: "test-uploading-file.firebaseapp.com",
  projectId: "test-uploading-file",
  storageBucket: "test-uploading-file.appspot.com",
  messagingSenderId: "816053536912",
  appId: "1:816053536912:web:93708efaebc7056f6a7015"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)