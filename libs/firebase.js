import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const clientCredentials = {
  apiKey: "AIzaSyCUjVana-u2GU-Mn7-iIJ5Rq-5PTK0o4v0",
  authDomain: "moneyzoom-6bc8f.firebaseapp.com",
  databaseURL: "https://moneyzoom-6bc8f.firebaseio.com",
  projectId: "moneyzoom-6bc8f",
  storageBucket: "moneyzoom-6bc8f.appspot.com",
  messagingSenderId: "526485646518",
  appId: "1:526485646518:web:288ff3d1072a7b79308a17",
  measurementId: "G-VBP57XFB0Q"
};

if (typeof window !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION);
  window.firebase = firebase;
}

export const createUser = async (user) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .set(user)
    .then((res) => {      
      return true
    })
    .catch((error) => {      
      return error
    })
}

export const getUser = async (uid) => {
  return firebase
  .firestore()
  .collection('users')
  .doc(uid)
  .get()
  .then(snapshot=>{
    return snapshot.data()
  })
  .catch((error) => {      
    return error
  })

}

export const updateUser = async (user) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .set(user)
    .then(() => {
      console.log('update user success', user)
      return true
    })
    .catch((error) => {
      console.log('update user error', error)
      return false
    })
};

export const forgetPassword = email => {
  return firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      return true;
    })
    .catch(error => {
      console.log('forget password error', error)
      return error
    });
};

export default firebase;