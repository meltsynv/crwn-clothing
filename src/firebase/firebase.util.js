import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAeDD34EQHfWTcezUimFEADnprmDPX7hag",
  authDomain: "crwn-db-b4919.firebaseapp.com",
  databaseURL: "https://crwn-db-b4919.firebaseio.com",
  projectId: "crwn-db-b4919",
  storageBucket: "crwn-db-b4919.appspot.com",
  messagingSenderId: "1098930787512",
  appId: "1:1098930787512:web:b5a267d757f77afb84904d",
  measurementId: "G-NV9GPTB4H5"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef;
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;