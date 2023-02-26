import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
   apiKey: 'AIzaSyDSvxT2xQy_4TSFbwuj4EQmMjy71SjKWSs',
   authDomain: 'the-dojo-cbd3a.firebaseapp.com',
   projectId: 'the-dojo-cbd3a',
   storageBucket: 'the-dojo-cbd3a.appspot.com',
   messagingSenderId: '803828514618',
   appId: '1:803828514618:web:d8bbc4e7537aa554615a03',
};

firebase.initializeApp(firebaseConfig);

const firestoreDatabase = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

const timestamp = firebase.firestore.Timestamp;

export { firestoreDatabase, projectAuth, projectStorage, timestamp };
