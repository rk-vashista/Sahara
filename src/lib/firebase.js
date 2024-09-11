import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { writable } from 'svelte/store';

const firebaseConfig = {
  apiKey: "AIzaSyBTcIs9-OyeAZBlOdfBr-mEcuw1x4aiqeY",
  authDomain: "sahara-f482f.firebaseapp.com",
  projectId: "sahara-f482f",
  storageBucket: "sahara-f482f.appspot.com",
  messagingSenderId: "825572256933",
  appId: "1:825572256933:web:5cca615f98498aa337f14c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const user = writable(null);

onAuthStateChanged(auth, (currentUser) => {
  user.set(currentUser);
});

export async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

export async function logIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

export async function logOut() {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
}