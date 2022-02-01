import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';

const initFirebaseAuth = () => initializeApp(firebaseConfig);

export default initFirebaseAuth;
