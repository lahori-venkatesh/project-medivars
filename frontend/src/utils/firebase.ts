import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  signInWithPopup,
  UserCredential,
  browserPopupRedirectResolver
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDxS7V_Dw-hXBJ-DmYoUOXwLf7bLqXmyoU",
  authDomain: "medivars-dev.firebaseapp.com",
  projectId: "medivars-dev",
  storageBucket: "medivars-dev.appspot.com",
  messagingSenderId: "458791581888",
  appId: "1:458791581888:web:3a9f8e9e8e9e8e9e8e9e8e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Configure providers
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

facebookProvider.setCustomParameters({
  display: 'popup'
});

export const signInWithGoogle = async (): Promise<UserCredential> => {
  return signInWithPopup(auth, googleProvider, browserPopupRedirectResolver);
};

export const signInWithFacebook = async (): Promise<UserCredential> => {
  return signInWithPopup(auth, facebookProvider, browserPopupRedirectResolver);
};

export { auth };