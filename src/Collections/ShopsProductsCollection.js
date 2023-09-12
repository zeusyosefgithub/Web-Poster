import { useEffect, useState } from 'react'
import { db } from '../FireBase/firebase';
import { collection, getDocs, addDoc, updateDoc, setDoc, doc, deleteDoc,onSnapshot } from 'firebase/firestore';

const shopsProductsRef = collection(db, "ShopsKinds");

export function GetShopsProducts() {

    const [shopsProducts, setShopsProducts] = useState([]);
    const [loading,setLoading] = useState(false);

    function getShopsProducts() {
        setLoading(true);
        onSnapshot(shopsProductsRef, (snapshot) => {
            setShopsProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        })
        setLoading(false);
    }

    useEffect(() => {
        getShopsProducts();
    },[])

    if(!loading){
        return shopsProducts;
    }
    
}