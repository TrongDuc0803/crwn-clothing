import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDIeZLHblSNrv8_G0Kz0VutJzQoQaQYnwc",
    authDomain: "crwn-clothing-db-47c89.firebaseapp.com",
    projectId: "crwn-clothing-db-47c89",
    storageBucket: "crwn-clothing-db-47c89.appspot.com",
    messagingSenderId: "995706749043",
    appId: "1:995706749043:web:f39255f38b8f3ab2ae2a06"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.getCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth();

  export const signInWithGooglePopup =  () => signInWithPopup(auth,provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db,'users',userAuth.uid);
    console.log(userDocRef);
    
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const { displayName,email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
  }