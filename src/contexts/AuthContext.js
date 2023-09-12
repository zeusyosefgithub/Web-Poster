import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../FireBase/firebase';
import { db } from '../FireBase/firebase';
import { setDoc, doc, collection } from 'firebase/firestore';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    async function signup(email, password, seller) {
        auth.createUserWithEmailAndPassword(email, password)
            .then(
                async cred => {
                    return await fetch("/AddNewUser", {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify({ id: cred.user.uid, NewValue: seller })
                    })
                    .then(res => res.json())
                    .then((result) => {
                        console.log(result);
                    },
                    (error) => {
                        console.log(error);
                    });
                }
            )
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function UpdateEmail(email) {
        return auth.currentUser.updateEmail(email);
    }

    function logout() {
        return auth.signOut();
    }

    function UpdatePassword(password) {
        try {
            return auth.currentUser.updatePassword(password);
        }
        catch (err) {
            return console.log(err)
        }

    }

    function restPassword(email){
        return auth.sendPasswordResetEmail(email);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
    }, [])


    const value = {
        currentUser,
        login,
        signup,
        logout,
        UpdateEmail,
        UpdatePassword,
        restPassword
    }

    if (loading) {
        return <LoadingSpinner currentUser cuser={currentUser}/>
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
