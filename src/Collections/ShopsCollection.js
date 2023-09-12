import { useEffect, useState } from 'react'
import { db } from '../FireBase/firebase';
import { collection, getDocs, addDoc, updateDoc, setDoc, doc, deleteDoc,onSnapshot } from 'firebase/firestore';

const shopsRef = collection(db, "Shops");

export function GetShops() {

    const [shops, setShops] = useState([]);
    const [loading,setLoading] = useState(false);

    function getShops() {
        setLoading(true);
        onSnapshot(shopsRef, (snapshot) => {
            setShops(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        })
        setLoading(false);
    }

    useEffect(() => {
        getShops();
    },[])

    if(!loading){
        return shops;
    }
    
}

export async function AddShop (shop,uid){
    return await setDoc(doc(db, "Shops", uid), shop);
}

export async function UpdateShop (NewValue,uid){
    return await updateDoc(doc(db, "Shops", uid), NewValue)
}

export async function DeleteShop (uid){
    return await deleteDoc(doc(db, "Shops", uid))
}

export function CheckUserHasShop (shops,uid){
    let res = false;
    shops.map((shop) => {
        if(shop.id === uid){
            res = true;
        }
    })
    return res;
}

export function GetShopUser(shops,uid){
    let Name = '';
    shops.map((shop) => {
        if(shop.id === uid){
            Name = shop.Shop_Name;
        }
    })
    return Name;
}

export function CheckIfShopsEquals(Shops,shop) {
    let res = false;
    Shops.map((Shop) => {
        if(Shop.Shop_Disc === shop.Shop_Disc &&
            Shop.Shop_Img === shop.Shop_Img &&
            Shop.Shop_Kind === shop.Shop_Kind &&
            Shop.Shop_Location === shop.Shop_Location &&
            Shop.Shop_Name === shop.Shop_Name)
            {
            res = true;
        }
    })
    return res;
}

