import { useEffect, useState } from 'react'
import { db } from '../FireBase/firebase';
import { collection, updateDoc, setDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';

const SellersRef = collection(db, "Sellers");

export function GetSellers() {

    const [sellers, setSellers] = useState([]);
    const [loading,setLoading] = useState(false);

    function getSellers() {
        setLoading(true);
        onSnapshot(SellersRef, (snapshot) => {
            setSellers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        })
        setLoading(false);
    }

    useEffect(() => {
        getSellers();
    },[])
    
    if(!loading){
        return sellers;
    } 
}

export async function AddSeller(seller, uid) {
    return await setDoc(doc(db, "Sellers", uid), seller);
}

export async function UpdateSeller(NewValue, uid) {
    return await updateDoc(doc(db, "Sellers", uid), NewValue)
}

export async function DeleteSeller(uid) {
    console.log(1)
    return await deleteDoc(doc(db, "Sellers", uid))
}

export function GetSellerUser(sellers,uid) {
    let userSeller = {};
    sellers.map((user) => {
        if(user.id === uid){
            userSeller = user;
        }
    })
    return userSeller;
}

export function CheckIfSellersEquals(Sellers,seller) {
    let res = false;
    Sellers.map((Seller) => {
        if(Seller.Name === seller.Name &&
            Seller.BirthDate === seller.BirthDate &&
            Seller.Img === seller.Img &&
            Seller.Phone === seller.Phone)
            {
            res = true;
        }
    })
    return res;
}



