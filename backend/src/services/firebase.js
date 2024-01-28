import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAfZz8_b-E37iuEmwWZqs32FMyoOGp7o0w',
  authDomain: 'filmymind-apersonalproject.firebaseapp.com',
  projectId: 'filmymind-apersonalproject',
  storageBucket: 'filmymind-apersonalproject.appspot.com',
  messagingSenderId: '715076567206',
  appId: '1:715076567206:web:366f5a658b563a609b3467',
  measurementId: 'G-L5EWFNJXEV',
};

const firebaseApp = initializeApp(firebaseConfig);
// Storage variable allows to create references where we want to store the files
const firebaseStorage = getStorage(firebaseApp);

export { firebaseStorage };
