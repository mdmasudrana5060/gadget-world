import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../Firebase/Firebase.config';



export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    // creating user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };
    // login user
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    };
    // google SIgnIn
    const googleSignIn=()=>{
        return signInWithPopup(auth,googleProvider)
    }
    // update user
    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo)
    }
    // logout
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {

            setUser(currentUser);

            setLoading(false);
        });
        return () => unsubscribe();
    }, [])
    const authInfo = {
        createUser,
        signIn,
        logOut,
        user,
        updateUser,
        loading,
        googleSignIn

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;