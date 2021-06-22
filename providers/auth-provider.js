import React, { useState, useEffect, createContext } from 'react';
import Router from 'next/router';
import nookies from 'nookies';

import firebase from '../libs/firebase';
import { createUser, getUser } from '../libs/firebase';

export const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useFirebaseAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useFirebaseAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const formatUser = (user, userInfo={}) => {    
    return {
      uid: user.uid,
      firstName: userInfo.firstName??null,
      lastName: userInfo.lastName??null,
      email: user.email,
      provider: user.providerData?.[0].providerId,
      photo: user.photoURL??userInfo.photo??null
    };
  };

  const signin = (email, password, redirect=null) => {
    setLoading(true)
    setError(null)

    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (response) => {
        const user = await getUser(response.user.uid)        
        setUser(user)
        setLoading(false)

        if (redirect) {
          Router.push(redirect);
        }
      })
      .catch((error)=>{
        console.log('signin error', error)
        setError(error.message)
        setLoading(false)
      })
  };

  const signup = (userinfo, redirect=null) => {
    setLoading(true)
    setError(null)

    return firebase
      .auth()
      .createUserWithEmailAndPassword(userinfo.email, userinfo.password)
      .then(async(response) => {
        const user = formatUser(response.user, userinfo)
        await createUser(user)
        setUser(user)
        setLoading(false)

        if (redirect) {
          Router.push(redirect);
        }
      })
      .catch((error)=>{
        console.log('signup error', error)
        setError(error.message)
        setLoading(false)
      })
  }

  const signout = (redirect=null) => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null)

        if (redirect) {
          Router.push(redirect)
        }
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null)
        nookies.set(undefined, 'token', '', { path: '/' })
      } else {
        const token = await user.getIdToken()
        nookies.set(undefined, 'token', token, { path: '/' })
        
        const storeUser = await getUser(user.uid)
        setUser(storeUser);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    error,
    setUser,
    setError,
    signin,
    signup,
    signout,
  };
}

