import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDbHuN_OaLVO_2a7am9azK8R1yOnm2wIUc',
  authDomain: 'rect-practice-b01ba.firebaseapp.com',
  databaseURL: 'https://rect-practice-b01ba-default-rtdb.firebaseio.com',
  projectId: 'rect-practice-b01ba',
  storageBucket: 'rect-practice-b01ba.appspot.com',
  messagingSenderId: '965503486556',
  appId: '1:965503486556:web:09a755098a332afdc07499',
  measurementId: 'G-W5FXYLBMD8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
