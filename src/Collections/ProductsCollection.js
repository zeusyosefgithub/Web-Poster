import { useEffect, useState } from 'react'
import { db } from '../FireBase/firebase';
import { collection, updateDoc, setDoc, doc, onSnapshot } from 'firebase/firestore';

const ProductssRef = collection(db, "Products");

export function GetProducts() {

    const [products, setProducts] = useState([]);
    const [loading,setLoading] = useState(false);

    function getProducts() {
        setLoading(true);
        onSnapshot(ProductssRef, (snapshot) => {
            setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        })
        setLoading(false);
    }

    useEffect(() => {
        getProducts();
    },[])

    if(!loading){
        return products
    }
}

export async function AddProducts(uid, Product, allProductsSeller) {

    let listWithNewProduct = [];
    allProductsSeller.map((prod) => {
        listWithNewProduct.push(prod)
    })
    listWithNewProduct.push(Product);
    return await setDoc(doc(db, "Products", uid), {
        Products: listWithNewProduct
    });
}

export async function UpdateProduct(uid, Product_Id, allProductsSeller, NewValue) {

    let listWithUpdated = [];
    allProductsSeller.map((prod,i) => {
        if (i === Product_Id) {
            listWithUpdated.push(NewValue);
        }
        else {
            listWithUpdated.push(prod);
        }
    })
    return await updateDoc(doc(db, "Products", uid), {
        Products: listWithUpdated
    })
}

export async function DeleteProduct(uid, Product_Id, allProductsSeller) {

    let listWithOutDeleted = [];
    allProductsSeller.map((prod,i) => {
        if (i !== Product_Id) {
            listWithOutDeleted.push(prod);
        }
    })
    return await updateDoc(doc(db, "Products", uid), {
        Products: listWithOutDeleted
    })
}

export async function UpdateInboxProducts(uid, allProductsSeller) {
    
    let CleardInboxesProducts = [];
    allProductsSeller.map((prods) => {
        prods.map((prod) => {
            const ClearInbox = {
                Product_Img: prod.Product_Img,
                Product_Inbox: [],
                Product_IsOffer: prod.Product_IsOffer,
                Product_Kind: prod.Product_Kind,
                Product_Name: prod.Product_Name,
                Product_NewPrice: prod.Product_NewPrice,
                Product_Price: prod.Product_Price
            }
            CleardInboxesProducts.push(ClearInbox);
        })
    })
    return await updateDoc(doc(db, "Products", uid), {
        Products: CleardInboxesProducts
    })
}

export async function DeleteAllProducts(uid) {
    let CleardInboxesProducts = [];
    return await updateDoc(doc(db, "Products", uid), {
        Products: CleardInboxesProducts
    })
}

export function GetProductsSellerId(products,uid) {
    let ProductsSeller = [];
    products.map((products) => {
        if(products.id === uid){
            ProductsSeller = products.Products;
        }
    })
    return ProductsSeller;
}

export function CheckIfProductsSelllerEquals(Products,product) {
    let res = false;
    Products.map((Product) => {
        if(Product.Product_IsOffer === product.Product_IsOffer &&
            Product.Product_Kind === product.Product_Kind &&
            Product.Product_Name === product.Product_Name &&
            Product.Product_NewPrice === product.Product_NewPrice &&
            Product.Product_Img === product.Product_Img &&
            Product.Product_Price === product.Product_Price)
            {
            res = true;
        }
    })
    return res;
}

export async function DeleteAllOffers(Products,uid) {
    let newProds = [];
    Products.map((Product) => {
        if(!Product.Product_IsOffer){
            newProds.push(Product);
        }
    })
    return await updateDoc(doc(db, "Products", uid), {
        Products: newProds
    })
}

export async function RemoveAllOffers(Products,uid) {
    let newProds = [];
    Products.map((Product) => {
        if(Product.Product_IsOffer){
            const NewValue = {
                Product_IsOffer: false,
                Product_Kind: Product.Product_Kind,
                Product_Name: Product.Product_Name,
                Product_NewPrice: Product.Product_NewPrice,
                Product_Img: Product.Product_Img,
                Product_Price: Product.Product_Price,
                Product_Inbox: Product.Product_Inbox
            }
            newProds.push(NewValue);
        }
        else{
            newProds.push(Product);
        }
    })
    return await updateDoc(doc(db, "Products", uid), {
        Products: newProds
    })
}
