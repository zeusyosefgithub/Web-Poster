import { useEffect, useState } from 'react'
import { db } from '../FireBase/firebase';
import { auth } from '../FireBase/firebase';
import { collection, getDocs, addDoc, updateDoc, setDoc, doc, deleteDoc,onSnapshot } from 'firebase/firestore';

const admisRef = collection(db,"Admins");

export function GetAdmins() {

    const [admins, setAdmins] = useState([]);
    const [loading,setLoading] = useState(false);

    function getAdmins() {
        setLoading(true);
        onSnapshot(admisRef, (snapshot) => {
            setAdmins(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        })
        setLoading(false);
    }

    useEffect(() => {
        getAdmins();
    },[])

    if(!loading){
        return admins;
    }
    
}

export async function AddAdmin (uid){
    return await setDoc(doc(db, "Admins", uid),{});
}

export async function DeleteAdmin (uid){
    return await deleteDoc(doc(db, "Admins", uid))
}

export function CheckUserAdmin (admins,id){
    let res = false;
    admins.map((admin) => {
        if(admin === id){
            res = true;
        }
    })
    return res;
}

