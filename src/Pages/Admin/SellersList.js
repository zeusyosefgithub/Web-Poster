import React, { useState, useRef } from 'react';
import { Modal, Form, CloseButton, Button, FormGroup } from 'react-bootstrap';
import { CheckUserHasShop, GetShopUser, GetShops, CheckIfShopsEquals } from '../../Collections/ShopsCollection';
import { GetProductsSellerId, UpdateProduct, GetProducts, DeleteProduct, CheckIfProductsSelllerEquals } from '../../Collections/ProductsCollection';
import { CheckUserAdmin, AddAdmin } from '../../Collections/AdminsCollection';
import { Link } from 'react-router-dom';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../FireBase/firebase';
import Product from '../../Components/Product/Product';
import { Inbox } from '../../Components/Inbox/InboxProducts';
import { InboxShopss } from '../../Components/Inbox/InboxShops';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { CheckIfSellersEquals } from '../../Collections/SellersCollection';
import AddProduct from '../../Components/AddProduct/AddProduct';


export default function SellersList(props) {

    const [loading, setLoading] = useState(false);
    const AllShops = GetShops();
    const AllProducts = GetProducts();

    const [addModalShowAddProduct, setAddModalShowAddProduct] = useState(false);

    const [showEditeAdmin, setShowEditeAdmin] = useState(false);
    const [kindEdit, setKindEdit] = useState('');

    const [idSeller, setIdSeller] = useState('');

    //------------------------------------------- Seller Info
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [sellerSuccessfully, setSellerSuccessfully] = useState('');

    const nameRef = useRef();
    const imgRef = useRef();
    const phoneRef = useRef();
    const birthDateRef = useRef();

    //------------------------------------------- Shop Info
    const [shopName, setShopName] = useState('');
    const [shopImg, setShopImg] = useState('');
    const [shopKind, setShopKind] = useState('');
    const [shopLocation, setShopLocation] = useState('');
    const [shopDisc, setShopDisc] = useState('');
    const [shopInbox, setShopInbox] = useState([]);
    const [shopSuccessfully, setShopSuccessfully] = useState('');

    const shopNameRef = useRef();
    const shopImgRef = useRef();
    const shopLocationRef = useRef();
    const shopDiscRef = useRef();

    //------------------------------------------- Products Info
    const [products, setProducts] = useState([]);
    const [prodName, setProdName] = useState('');
    const [prodPrice, setProdPrice] = useState('');
    const [prodImg, setProdImg] = useState('');
    const [prodKind, setProdKind] = useState('');
    const [prodInbox, setProdInbox] = useState([]);
    const [prodNewPrice, setProdNewPrice] = useState('');
    const [prodIsOffer, setProdIsOffer] = useState('');
    const [prodIdInProducts, setProdIdInProducts] = useState('');

    const prodNameRef = useRef();
    const prodPriceRef = useRef();
    const prodImgRef = useRef();
    const prodNewPriceRef = useRef();

    const scrollSellerRef = useRef();
    const scrollShopRef = useRef();
    const scrollProductsrRef = useRef();

    const [modalShowProduct, setModalShowProduct] = useState(false);

    const [modalFuncs, setModalFuncs] = useState(false);
    const [modalFuncsKind, setModalFuncsKind] = useState('');

    const [inboxShopModal, setInboxShopModal] = useState(false);

    const getTotalProducts = () => {
        let totalProducts = 0;
        let totalOffers = 0;
        let total = {};
        AllProducts.map((prods) => {
            prods.Products.map((prod) => {
                if (prod.Product_IsOffer) {
                    totalOffers++;
                }
                totalProducts++;
            })
        })
        total = {
            Products: totalProducts,
            Offers: totalOffers
        }
        return total;
    }

    const getTotalOffersSeller = () => {
        let totalOffers = 0;
        products.map((prod) => {
            if (prod.Product_IsOffer) {
                totalOffers++;
            }
        })
        return totalOffers;
    }

    const handelModalFuncs = async () => {
        setLoading(true);
        if (modalFuncsKind === 'updateSeller') {
            const newvalue = {
                Name: nameRef.current.value,
                Img: imgRef.current.value,
                BirthDate: birthDateRef.current.value,
                Phone: phoneRef.current.value
            }
            await fetch("/UpdateSeller", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ id: idSeller, NewValue: newvalue })
            })
                .then(res => res.json())
                .then((result) => {
                    console.log(result);
                },
                    (error) => {
                        console.log(error);
                    });
            setSellerSuccessfully('Seller Updated Successfully.');
        }
        else if (modalFuncsKind === 'updateShop') {
            const newvalue = {
                Shop_Disc: shopDiscRef.current.value,
                Shop_Img: shopImgRef.current.value,
                Shop_Inbox: shopInbox,
                Shop_Kind: shopKind,
                Shop_Location: shopLocationRef.current.value,
                Shop_Name: shopNameRef.current.value
            }
            await fetch("/UpdateShop", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ id: idSeller, NewValue: newvalue })
            })
                .then(res => res.json())
                .then((result) => {
                    console.log(result);
                },
                    (error) => {
                        console.log(error);
                    });
            setShopSuccessfully('Shop Updated Successfully.');
        }
        else if (modalFuncsKind === 'DeleteProductSeller') {
            const newProds = [];
            products.map((prod, i) => {
                if (prodIdInProducts !== i) {
                    newProds.push(prod);
                }
            })
            await fetch("/deleteProduct", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ id: idSeller, NewValue: newProds })
            })
                .then(res => res.json())
                .then((result) => {
                    console.log(result);
                },
                    (error) => {
                        console.log(error);
                    });
            setProducts(newProds);
            setModalShowProduct(false);
            SetSeeProductNull();
        }
        else if (modalFuncsKind === 'UpdateProductSeller') {
            const NewValue = prodIsOffer
                ? {
                    Product_Img: prodImgRef.current.value,
                    Product_Inbox: prodInbox,
                    Product_IsOffer: prodIsOffer,
                    Product_Kind: prodKind,
                    Product_Name: prodNameRef.current.value,
                    Product_NewPrice: prodNewPriceRef.current.value,
                    Product_Price: prodPriceRef.current.value
                }
                : {
                    Product_Img: prodImgRef.current.value,
                    Product_Inbox: prodInbox,
                    Product_IsOffer: prodIsOffer,
                    Product_Kind: prodKind,
                    Product_Name: prodNameRef.current.value,
                    Product_NewPrice: prodNewPrice,
                    Product_Price: prodPriceRef.current.value
                }
            products[prodIdInProducts] = NewValue;
            await fetch("/UpdateProduct", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ id: idSeller, NewValue: products })
            })
                .then(res => res.json())
                .then((result) => {
                    console.log(result);
                },
                    (error) => {
                        console.log(error);
                    });
            setModalShowProduct(false); SetSeeProductNull(); setErrorsProductNull();
        }
        else if (modalFuncsKind === 'DeleteShopAndProductsSeller') {
            await fetch("/DeleteShopAndProducts", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ id: idSeller })
            })
                .then(res => res.json())
                .then((result) => {
                    console.log(result);
                },
                    (error) => {
                        console.log(error);
                    });
        }
        setLoading(false);

    }

    const deleteUser = async () => {
        setLoading(true);
        await fetch("/deleteUser", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ id: idSeller })
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
            },
                (error) => {
                    console.log(error);
                });

        setIdSeller(''); setName(''); setImg(''); setPhone(''); setBirthDate('');
        setLoading(false);
        setShowEditeAdmin(false);
    }

    const getCurrentEmail = (id) => {
        let currentEmail = '';
        props.users.map((user) => {
            if (user.uid === id) {
                currentEmail = user.email;
            }
        })
        return currentEmail;
    }

    const makeAdmin = async() => {
        setLoading(true);
        await fetch("/AddAdmin", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ id: idSeller,NewValue:{} })
        })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
        },
        (error) => {
            console.log(error);
        });
        setLoading(false);
        setIdSeller(''); setName(''); setImg(''); setPhone(''); setBirthDate('');
        setShowEditeAdmin(false);
    }

    let countAll = 1;

    let countProducts = 1;

    const getAllInfoUser = (user) => {

        setName(user.Name);
        setBirthDate(user.BirthDate);
        setPhone(user.Phone);
        setImg(user.Img)
        setIdSeller(user.id);

        let Shop = {};
        let Products = GetProductsSellerId(props.products, user.id);

        props.shops.map((shop) => {
            if (shop.id === user.id) {
                Shop = {
                    Name: shop.Shop_Name,
                    Disc: shop.Shop_Disc,
                    Inbox: shop.Shop_Inbox,
                    Kind: shop.Shop_Kind,
                    Location: shop.Shop_Location,
                    Img: shop.Shop_Img
                }
            }
        })

        setShopDisc(Shop.Disc);
        setShopImg(Shop.Img);
        setShopKind(Shop.Kind);
        setShopLocation(Shop.Location);
        setShopName(Shop.Name);
        setShopInbox(Shop.Inbox);
        setProducts(Products);


    }

    const SetSeeProduct = (prod) => {
        setProdImg(prod.Product_Img);
        setProdInbox(prod.Product_Inbox);
        setProdKind(prod.Product_Kind);
        setProdName(prod.Product_Name);
        setProdPrice(prod.Product_Price);
        setProdIsOffer(prod.Product_IsOffer);
        setProdNewPrice(prod.Product_NewPrice);
    }

    const SetSeeProductNull = () => {
        setProdImg('');
        setProdInbox([]);
        setProdKind('');
        setProdName('');
        setProdPrice('');
        setProdIsOffer('');
        setProdNewPrice('');
    }

    const RemoveOffer = () => {
        const NewValue = {
            Product_Img: prodImg,
            Product_Inbox: prodInbox,
            Product_IsOffer: false,
            Product_Kind: prodKind,
            Product_Name: prodName,
            Product_NewPrice: prodNewPrice,
            Product_Price: prodPrice
        }
        setProdIsOffer(false);
        products[prodIdInProducts] = NewValue;
        UpdateProduct(idSeller, prodIdInProducts, products, NewValue);
    }

    //------------------------------------- inputs Errors seller
    const [errorSellerName, setErrorSellerName] = useState('');
    const [errorSellerPhone, setErrorSellerPhone] = useState('');
    const [errorSellerImg, setErrorSellerImg] = useState('');
    const [errorSellerBirthDate, setErrorSellerBirthDate] = useState(false);

    const setErrorsSellerNull = () => {
        setErrorSellerName('');
        setErrorSellerPhone('');
        setErrorSellerImg('');
        setErrorSellerBirthDate(false);
        setSellerSuccessfully('');
    }

    //------------------------------------- inputs Errors shop
    const [errorShopName, setErrorShopName] = useState('');
    const [errorShopImg, setErrorShopImg] = useState('');
    const [errorShopDisc, setErrorShopDisc] = useState('');
    const [errorShopLocation, setErrorShopLocation] = useState('');

    const setErrorsShopNull = () => {
        setErrorShopName('');
        setErrorShopImg('');
        setErrorShopDisc('');
        setErrorShopLocation('');
        setShopSuccessfully('');
    }

    //------------------------------------- inputs Errors product
    const [errorProductName, setErrorProductName] = useState('');
    const [errorProductPrice, setErrorProductPrice] = useState('');
    const [errorProductNewPrice, setErrorProductNewPrice] = useState('');
    const [errorProductImg, setErrorProductImg] = useState('');

    const setErrorsProductNull = () => {
        setErrorProductName('');
        setErrorProductPrice('');
        setErrorProductNewPrice('');
        setErrorProductImg('');
    }

    //------------------------------------- cheack inputs seller
    const checkValuesSellerImage = () => {
        const img = new Image();
        img.src = imgRef.current.value;
        if (img.complete) {
            setErrorSellerImg('');
        }
        else if (imgRef.current.value === '') {
            setErrorSellerImg('');
        }
        else {
            img.onload = () => {
                setErrorSellerImg('');
            };
            img.onerror = () => {
                setErrorSellerImg('filed to load the image, try another one...');
            };
        }
    }

    const checkValuesSellerName = () => {
        setSellerSuccessfully('');
        if (!nameRef.current.value) {
            setErrorSellerName('');
        }
        else if (nameRef.current.value.length < 6) {
            setErrorSellerName('the name most be more than 5 latters');
        }
        else {
            setErrorSellerName('');
        }
    }

    const checkValuesSellerPhone = () => {
        setSellerSuccessfully('');
        if (!phoneRef.current.value) {
            setErrorSellerPhone('');
        }
        else if (phoneRef.current.value.length < 10) {
            setErrorSellerPhone('the number most be more 10 latters');
        }
        else {
            setErrorSellerPhone('');
        }
    }

    const checkValuesSellerBirthDate = () => {
        setSellerSuccessfully('');
        if (!birthDateRef.current.value) {
            setErrorSellerBirthDate(true);
        }
        else {
            setErrorSellerBirthDate(false);
        }
    }

    const CheckAllValuesSellerInput = () => {
        const newvalue = {
            Name: name,
            Img: img,
            BirthDate: birthDate,
            Phone: phone
        }
        if (!CheckIfSellersEquals(props.sellers, newvalue) && !errorSellerBirthDate && !errorSellerImg && !errorSellerName && !errorSellerPhone) {
            return false;
        }
        else {
            return true;
        }
    }

    //------------------------------------- cheack inputs shop
    const checkIfShopNameCurrent = () => {
        let res = false;
        AllShops.map((shop) => {
            if (shop.Shop_Name === shopNameRef.current.value.replace(' ', '') && shop.id !== idSeller) {
                res = true;
            }
        })
        return res;
    }

    const checkValuesShopName = () => {
        setShopSuccessfully('');
        if (!shopNameRef.current.value) {
            setErrorShopName('');
        }
        else if (shopNameRef.current.value.length < 6) {
            setErrorShopName('the name most be more than 5 latters');
        }
        else if (checkIfShopNameCurrent()) {
            setErrorShopName('the name already in use try another.');
        }
        else {
            setErrorShopName('');
        }
    }

    const checkValuesShopDisc = () => {
        setShopSuccessfully('');
        if (!shopDiscRef.current.value) {
            setErrorShopDisc('');
        }
        else if (shopDiscRef.current.value.length < 15) {
            setErrorShopDisc('the discription most be more 15 latters');
        }
        else {
            setErrorShopDisc('');
        }
    }

    const checkValuesShopImg = () => {
        setShopSuccessfully('');
        const img = new Image();
        img.src = shopImgRef.current.value;
        if (img.complete) {
            setErrorShopImg('');
        }
        else if (shopImgRef.current.value === '') {
            setErrorShopImg('');
        }
        else {
            img.onload = () => {
                setErrorShopImg('');
            };
            img.onerror = () => {
                setErrorShopImg('filed to load the image, try another one...');
            };
        }
    }

    const checkValuesShopLocation = () => {
        setShopSuccessfully('');
        if (!shopLocationRef.current.value) {
            setErrorShopLocation('');
        }
        else if (shopLocationRef.current.value.length < 10) {
            setErrorShopLocation('the location most be more 10 latters');
        }
        else {
            setErrorShopLocation('');
        }
    }

    const CheckAllValuesShopInput = () => {
        const newvalue = {
            Shop_Disc: shopDisc,
            Shop_Img: shopImg,
            Shop_Inbox: shopInbox,
            Shop_Kind: shopKind,
            Shop_Location: shopLocation,
            Shop_Name: shopName
        }
        if (!CheckIfShopsEquals(props.shops, newvalue) && !errorShopDisc && !errorShopImg && !errorShopLocation && !errorShopName) {
            return false;
        }
        else {
            return true;
        }
    }

    //------------------------------------- cheack inputs product
    const checkValuesProductName = () => {
        if (!prodNameRef.current.value) {
            setErrorProductName('');
        }
        else if (prodNameRef.current.value.length < 5) {
            setErrorProductName('the name most be more than 5 latters');
        }
        else {
            setErrorProductName('');
        }
    }

    const checkValuesProductPrice = () => {
        if (!prodPriceRef.current.value) {
            setErrorProductPrice('false');
        }
        else {
            setErrorProductPrice('');
        }
    }

    const checkValuesProductNewPrice = () => {
        if (!prodNewPriceRef.current.value) {
            setErrorProductNewPrice('');
        }
        else if (parseFloat(prodNewPriceRef.current.value) > parseFloat(prodPrice)) {
            setErrorProductNewPrice('the new price most be littel from the old one.');
        }
        else {
            setErrorProductNewPrice('true');
        }
    }

    const checkValuesProductImg = () => {
        const img = new Image();
        img.src = prodImgRef.current.value;
        if (img.complete) {
            setErrorProductImg('');
        }
        else if (prodImgRef.current.value === '') {
            setErrorProductImg('');
        }
        else {
            img.onload = () => {
                setErrorProductImg('');
            };
            img.onerror = () => {
                setErrorProductImg('filed to load the image, try another one...');
            };
        }
    }

    const updateInboxProductSeller = async () => {
        const NewValue = {
            Product_Img: prodImg,
            Product_Inbox: [],
            Product_IsOffer: prodIsOffer,
            Product_Kind: prodKind,
            Product_Name: prodName,
            Product_NewPrice: prodNewPrice,
            Product_Price: prodPrice
        }
        products[prodIdInProducts] = NewValue;
        setProdInbox([]);
        return await updateDoc(doc(db, "Products", idSeller), {
            Products: products
        })
    }

    const CheckAllValuesProductInput = () => {
        const NewValue = {
            Product_Img: prodImg,
            Product_Inbox: prodInbox,
            Product_IsOffer: prodIsOffer,
            Product_Kind: prodKind,
            Product_Name: prodName,
            Product_NewPrice: prodNewPrice,
            Product_Price: prodPrice
        }
        if (!prodIsOffer && !CheckIfProductsSelllerEquals(products, NewValue) && !errorProductName && !errorProductImg && !errorProductPrice && !errorProductNewPrice) {
            return false;
        }
        else if (prodIsOffer && !CheckIfProductsSelllerEquals(products, NewValue) && !errorProductName && !errorProductImg && !errorProductPrice && errorProductNewPrice === 'true') {
            return false;
        }
        else {
            return true;
        }
    }

    return (
        <div>
            <div className='List_Admins'>
                <div className='d-flex justify-content-around mb-5 mt-1 Options_Sellers_List'>
                    <div className='Icon_Trash_Admin_List'><div className="fa-solid fa-user-plus Edit_Span_Seller_Panel_Bar" /> : &nbsp;Make admin</div>
                    <div className='Icon_Edit_Admin_List'><div className="fas fa-edit Edit_Span_Seller_Panel_Bar" /> : &nbsp;Edit</div>
                    <div className='Icon_Edit_Admin_List'><div className="fa-solid fa-shop Edit_Span_Seller_Panel_Bar" /> : &nbsp;See shop</div>
                    <div className='Icon_Trash_Admin_List'><div className="fa-solid fa-shop-slash Trash_Span_Seller_Panel_Bar" /> : &nbsp;Seller does't have shop</div>
                    <div className='Icon_Trash_Admin_List'><div className="fa-solid fa-trash Trash_Span_Seller_Panel_Bar" /> : &nbsp;Delete everything related</div>
                </div>
                <div className='d-flex justify-content-around mb-5 mt-1 Options_Sellers_List'>
                    <div className='m-auto h5'>Total Shops : {props.sellers?.length - props.Admins?.length}</div>
                    <div className='m-auto h5'>Total Products : {getTotalProducts().Products}</div>
                    <div className='m-auto h5'>Total Offers : {getTotalProducts().Offers}</div>
                </div>

                {
                    props.sellers.map((user, i) => {
                        return !CheckUserAdmin(props.Admins, user.id) ? countAll++ && <div key={i} className='d-flex justify-content-between Seller_Box_List'>
                            <div className='Admin_Number'>{countAll - 1}.</div>
                            <div className='Admin_Email'>{getCurrentEmail(user.id)}</div>
                            <div className='Admin_Name'>{user.Name?.slice(0, 10)}</div>
                            <div className='Admin_Phone'>{user.Phone?.slice(0, 10)}</div>
                            <div className='Admin_BirthDate'>{user.BirthDate?.slice(0, 10)}</div>

                            <div className='d-flex'>
                                <div onClick={() => { setKindEdit('MakeAdmin'); setShowEditeAdmin(true); setIdSeller(user.id); setName(user.Name); }} className="fa-solid fa-user-plus Edit_Span_Admin_Panel" />
                                <div onClick={() => { setKindEdit('Edit'); setShowEditeAdmin(true); getAllInfoUser(user); }} className="fas fa-edit Edit_Span_Admin_Panel" />

                                {
                                    CheckUserHasShop(props.shops, user.id)
                                        ?
                                        <Link onClick={() => window.scrollTo(0, 0)} to={'/Shop/' + GetShopUser(props.shops, user.id)}><div className="fa-solid fa-shop Edit_Span_Admin_Panel" /></Link>
                                        :
                                        <div className="fa-solid fa-shop-slash No_Shop_Span" />

                                }

                                <div onClick={() => { setKindEdit('Delete'); setShowEditeAdmin(true); setIdSeller(user.id); setName(user.Name); }} className="fa-solid fa-trash Trash_Span_Admin_Panel" />
                            </div>


                        </div>

                            :
                            null
                    })
                }

                <Modal className='bg-primary bg-opacity-10 modal-lg' show={showEditeAdmin} onHide={() => setShowEditeAdmin(false)}
                    centered aria-labelledby="contained-modal-title-vcenter">

                    {
                        kindEdit === 'Edit'
                            ?
                            <>
                                <Modal.Header className='text-center bg-black text-white'>
                                    <Modal.Title className='w-100'>Edit Seller {name}</Modal.Title>
                                    <CloseButton variant="white" onClick={() => { setShowEditeAdmin(false); setErrorsSellerNull(); setErrorsShopNull(); }} />
                                </Modal.Header>

                                <Modal.Body className='Modal_Body_Edit_Seller'>

                                    {
                                        loading && <LoadingSpinner />
                                    }

                                    <div id='Box_All_Info' className='Box_All_Info_Seller_Admin_Panel p-4'>
                                        <Form ref={scrollSellerRef} className='Boxes_Info'>
                                            <div className='d-flex justify-content-center m-2 text-primary h4'>Seller Info <div className="fa-solid fa-user ms-3" /></div>
                                            <div className='Two_Sides_List_Sellers_Admin_Panel'>
                                                <div className='m-auto'>

                                                    <FormGroup className='d-flex'>
                                                        <Form.Label className='m-auto w-50'>Name :</Form.Label>
                                                        <Form.Control className={errorSellerName ? 'border-danger w-75' : 'border-primary w-75'}
                                                            ref={nameRef}
                                                            value={name}
                                                            placeholder='Seller Name...'
                                                            onChange={(e) => { setName(e.target.value.slice(0, 10)); checkValuesSellerName(); }}
                                                            type="text"
                                                        />
                                                    </FormGroup>

                                                    {errorSellerName && <p className='text-danger'>{errorSellerName}</p>}

                                                    <FormGroup className='d-flex mt-3'>
                                                        <Form.Label className='m-auto w-50'>Phone :</Form.Label>
                                                        <Form.Control className={errorSellerPhone ? 'border-danger w-75' : 'border-primary w-75'}
                                                            ref={phoneRef}
                                                            value={phone}
                                                            placeholder='Phone...'
                                                            onChange={(e) => { setPhone(e.target.value.slice(0, 10)); checkValuesSellerPhone(); }}
                                                            type="number"
                                                        />
                                                    </FormGroup>

                                                    {errorSellerPhone && <p className='text-danger'>{errorSellerPhone}</p>}

                                                    <FormGroup className='d-flex mt-3'>
                                                        <Form.Label className='m-auto w-50'>BDate :</Form.Label>
                                                        <Form.Control className='border-primary w-75'
                                                            ref={birthDateRef}
                                                            value={birthDate}
                                                            placeholder='BirthDate...'
                                                            onChange={(e) => { setBirthDate(e.target.value); checkValuesSellerBirthDate(); }}
                                                            type="date"
                                                        />
                                                    </FormGroup>

                                                </div>
                                                <div className='m-auto'>

                                                    <FormGroup className='d-flex m-3'>
                                                        <Form.Label className='m-auto w-50'>Image :</Form.Label>
                                                        <Form.Control className={errorSellerImg ? 'border-danger w-75' : 'border-primary w-75'}
                                                            ref={imgRef}
                                                            value={img}
                                                            placeholder='Seller Image...'
                                                            onChange={(e) => { setImg(e.target.value); checkValuesSellerImage(); }}
                                                            type="text"
                                                        />
                                                    </FormGroup>

                                                    {errorSellerImg && <p className='text-danger'>{errorSellerImg}</p>}

                                                    <div className='d-flex justify-content-center'>
                                                        <img className='m-3 Shop_Seller_Img_Admin_Panel' src={img} />
                                                    </div>

                                                </div>
                                            </div>

                                            <FormGroup className='d-flex m-3 justify-content-evenly'>
                                                {
                                                    sellerSuccessfully && <div className='text-success'>{sellerSuccessfully}</div>
                                                }
                                                <Button onClick={() => { setModalFuncs(true); setModalFuncsKind('updateSeller') }} disabled={CheckAllValuesSellerInput()} className='border_All_Buttons_BS' variant="primary">Update Seller</Button>
                                            </FormGroup>

                                        </Form>
                                        {
                                            shopName && <Form ref={scrollShopRef} className='Boxes_Info'>
                                                <div className='d-flex justify-content-center m-2 text-primary h4'>Shop Info <div className="fa-solid fa-cart-shopping ms-3" /></div>
                                                <div className='Two_Sides_List_Sellers_Admin_Panel'>
                                                    <div className='m-auto'>

                                                        <FormGroup className='d-flex'>
                                                            <Form.Label className='m-auto w-50'>Name :</Form.Label>
                                                            <Form.Control className={errorShopName ? 'border-danger w-75' : 'border-primary w-75'}
                                                                ref={shopNameRef}
                                                                value={shopName}
                                                                placeholder='Shop Name...'
                                                                onChange={(e) => { setShopName(e.target.value.slice(0, 10)); checkValuesShopName(); }}
                                                                type="text"
                                                            />
                                                        </FormGroup>

                                                        {errorShopName && <p className='text-danger'>{errorShopName}</p>}

                                                        <FormGroup className='d-flex mt-3'>
                                                            <Form.Label className='m-auto w-50'>Kind :</Form.Label>
                                                            <Form.Control className='border-primary w-75'
                                                                defaultValue={shopKind}
                                                                disabled
                                                            />
                                                        </FormGroup>

                                                        <FormGroup className='d-flex mt-3'>
                                                            <Form.Label className='m-auto w-50'>Loca :</Form.Label>
                                                            <Form.Control className={errorShopLocation ? 'border-danger w-75' : 'border-primary w-75'}
                                                                ref={shopLocationRef}
                                                                value={shopLocation}
                                                                placeholder='Location...'
                                                                onChange={(e) => { setShopLocation(e.target.value.slice(0, 10)); checkValuesShopLocation(); }}
                                                                type="text"
                                                            />
                                                        </FormGroup>

                                                        {errorShopLocation && <p className='text-danger'>{errorShopLocation}</p>}

                                                        <FormGroup className='d-flex mt-3'>
                                                            <Form.Label className='m-auto w-50'>Disc :</Form.Label>
                                                            <Form.Control className={errorShopDisc ? 'border-danger w-75' : 'border-primary w-75'}
                                                                ref={shopDiscRef}
                                                                value={shopDisc}
                                                                placeholder='Discription...'
                                                                onChange={(e) => { setShopDisc(e.target.value.slice(0, 15)); checkValuesShopDisc(); }}
                                                                type="text"
                                                            />
                                                        </FormGroup>

                                                        {errorShopDisc && <p className='text-danger'>{errorShopDisc}</p>}

                                                    </div>
                                                    <div className='m-auto'>

                                                        <FormGroup className='d-flex m-3'>
                                                            <Form.Label className='m-auto w-50'>Image :</Form.Label>
                                                            <Form.Control className={errorShopImg ? 'border-danger w-75' : 'border-primary w-75'}
                                                                ref={shopImgRef}
                                                                value={shopImg}
                                                                placeholder='Shop Image...'
                                                                onChange={(e) => { setShopImg(e.target.value); checkValuesShopImg(); }}
                                                                type="text"
                                                            />
                                                        </FormGroup>

                                                        {errorShopImg && <p className='text-danger'>{errorShopImg}</p>}

                                                        <div className='d-flex justify-content-center'>
                                                            <img className='m-3 Shop_Seller_Img_Admin_Panel' src={shopImg} />
                                                        </div>

                                                    </div>

                                                </div>

                                                <FormGroup className='d-flex m-3 justify-content-evenly'>
                                                    {
                                                        shopSuccessfully && <div className='text-success'>{shopSuccessfully}</div>
                                                    }
                                                    <Button onClick={() => { setModalFuncs(true); setModalFuncsKind('updateShop') }} disabled={CheckAllValuesShopInput()} className='border_All_Buttons_BS' variant="primary">Update Shop</Button>
                                                </FormGroup>

                                                <div onClick={() => setInboxShopModal(true)} className='m-3 text-primary h6 Cursor_Inbox_Shop_Admin'>
                                                    Inbox Shop
                                                </div>

                                            </Form>
                                        }

                                        {
                                            products[0]?.Product_Name && <div ref={scrollProductsrRef} className='Boxes_Info'>
                                                <div className='d-flex justify-content-center m-2 text-primary h4'>Products Info <div className="fa fa-shopping-bag ms-3" /></div>
                                                <div className='text-primary h6 m-3'>Kind Products : {shopKind}</div>
                                                <div className='text-primary h6 m-3'>Total Products : {products.length}</div>
                                                <div className='text-primary h6 m-3'>Total Offers : {getTotalOffersSeller()}</div>
                                                <div className="Add_Product w-25 m-2" onClick={() => setAddModalShowAddProduct(true)}>
                                                    <div className="w-100">Add Product </div>
                                                    <div><i className="fa-solid fa-plus m-auto"></i></div>
                                                </div>
                                                <div className='p-4'>
                                                    {
                                                        products.map((prod, i) => {
                                                            return countProducts++ && <div key={i} className='List_Product_Seller_Admin_Panel'>
                                                                <div className='Product_Name_Admin_Panel d-flex'><div className='text-primary'>{countProducts - 1}.</div>&nbsp;&nbsp;{prod.Product_Name}</div>
                                                                {
                                                                    prod.Product_IsOffer
                                                                        ?
                                                                        <>
                                                                            <img className='Offer_Icon_List_Sellers' src='https://www.iconpacks.net/icons/3/free-offer-icon-9678-thumb.png' />
                                                                            <div className='Old_New_Price_Sellers_List text-danger'>Old Price : {prod.Product_Price}</div>
                                                                            <div className='Old_New_Price_Sellers_List text-primary'>New Price : {prod.Product_NewPrice}</div>
                                                                        </>
                                                                        :
                                                                        <div className='Product_Price_Admin_Panel'>₪{prod.Product_Price}</div>
                                                                }
                                                                <div onClick={() => {
                                                                    setModalShowProduct(true);
                                                                    SetSeeProduct(prod);
                                                                    setProdIdInProducts(i);
                                                                }} className='Product_See_Admin_Panel'>Options</div>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        }
                                    </div>

                                </Modal.Body>

                                <Modal.Footer className='d-flex justify-content-between'>

                                    <div>
                                        <Button className='border_All_Buttons_BS me-3' variant="secondary" onClick={() => { setShowEditeAdmin(false); setErrorsSellerNull(); setErrorsShopNull(); }}>
                                            Cancel
                                        </Button>

                                        {
                                            products[0]?.Product_Name && shopName &&
                                            <Button className='border_All_Buttons_BS me-3' variant="danger" onClick={() => { setModalFuncs(true); setModalFuncsKind('DeleteShopAndProductsSeller') }}>
                                                Delete Shop & Products
                                            </Button>
                                        }

                                    </div>

                                    <div>
                                        {
                                            products[0]?.Product_Name && shopName &&
                                            <>
                                                <Button onClick={() => document.getElementById('Box_All_Info').scrollTo(0, scrollSellerRef.current.offsetTop - 20)} className='border_All_Buttons_BS me-3'>Seller</Button>
                                                <Button onClick={() => document.getElementById('Box_All_Info').scrollTo(0, scrollShopRef.current.offsetTop - 20)} className='border_All_Buttons_BS me-3'>Shop</Button>
                                                <Button onClick={() => document.getElementById('Box_All_Info').scrollTo(0, scrollProductsrRef.current.offsetTop - 20)} className='border_All_Buttons_BS'>Products</Button>
                                            </>

                                        }

                                    </div>



                                </Modal.Footer>
                            </>
                            :
                            kindEdit === 'MakeAdmin'
                                ?
                                <>
                                    <Modal.Header className='text-center bg-black text-white'>
                                        <Modal.Title className='w-100'>Make {name} Admin</Modal.Title>
                                        <CloseButton variant="white" onClick={() => setShowEditeAdmin(false)} />
                                    </Modal.Header>

                                    <Modal.Body>
                                        are you shure that you want to make {name} admin on the site!?
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button className='border_All_Buttons_BS' variant="secondary" onClick={() => setShowEditeAdmin(false)}>
                                            Cancel
                                        </Button>
                                        <Button className='border_All_Buttons_BS' variant="primary" onClick={() => { makeAdmin(); }}>
                                            Submit
                                        </Button>
                                    </Modal.Footer>
                                </>
                                :
                                <>
                                    <Modal.Header className='text-center bg-black text-white'>
                                        <Modal.Title className='w-100'>Delete Seller {name}</Modal.Title>
                                        <CloseButton variant="white" onClick={() => setShowEditeAdmin(false)} />
                                    </Modal.Header>

                                    <Modal.Body>
                                        are you shure that you want to delete everything related to seller {name} from the site!?
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button className='border_All_Buttons_BS' variant="secondary" onClick={() => setShowEditeAdmin(false)}>
                                            Cancel
                                        </Button>
                                        <Button className='border_All_Buttons_BS' variant="danger" onClick={deleteUser}>
                                            Delete
                                        </Button>
                                    </Modal.Footer>
                                </>

                    }

                </Modal>
                <Modal className='bg-primary bg-opacity-10' show={modalShowProduct} onHide={() => { setModalShowProduct(false); SetSeeProductNull(); }}
                    centered aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header className='text-center bg-black text-white'>
                        <Modal.Title className='w-100'>Edite Product {prodName}</Modal.Title>
                        <CloseButton variant="white" onClick={() => { setModalShowProduct(false); SetSeeProductNull(); setErrorsProductNull(); }} />
                    </Modal.Header>

                    <Modal.Body className='Modal_Body_Edit_Seller Box_All_Info_Seller_Admin_Panel'>
                        <div>
                            <div className='Two_Sides_List_Sellers_Admin_Panel'>
                                <div className='m-auto'>
                                    <Product
                                        NoHover={true}
                                        Product_Name={prodName}
                                        Product_Img={prodImg}
                                        Product_Price={prodPrice}
                                    />
                                </div>
                                <Form className='m-auto ms-4 mt-4'>
                                    <Form.Group className='d-flex mb-4'>
                                        <Form.Label className='m-auto w-50'>Name :</Form.Label>
                                        <Form.Control className={errorProductName ? 'border-danger' : 'border-primary'}
                                            ref={prodNameRef}
                                            value={prodName}
                                            placeholder='Name...'
                                            onChange={(e) => { setProdName(e.target.value); checkValuesProductName(); }}
                                            type="text"
                                        />
                                    </Form.Group>

                                    {errorProductName && <p className='text-danger'>{errorProductName}</p>}

                                    {
                                        prodIsOffer
                                            ?
                                            <div className='Border_New_Old_Price_Sellers_List'>
                                                <div onClick={RemoveOffer} className='bg-danger Remove_Add_Offer_Sellers_List'>Remove The Offer</div>
                                                <Form.Group className='d-flex mb-4'>
                                                    <Form.Label className='m-auto w-50'>Price :</Form.Label>
                                                    <Form.Control className='border-primary'
                                                        defaultValue={prodPrice}
                                                        disabled
                                                        type="number"
                                                    />
                                                </Form.Group>
                                                <Form.Group className='d-flex mb-3'>
                                                    <Form.Label className='m-auto w-50'>NewPrice :</Form.Label>
                                                    <Form.Control className={errorProductNewPrice ? 'border-danger' : 'border-primary'}
                                                        ref={prodNewPriceRef}
                                                        value={prodNewPrice}
                                                        placeholder='New Price...'
                                                        onChange={(e) => { setProdNewPrice(e.target.value.slice(0, 5)); checkValuesProductNewPrice(); }}
                                                        type="number"
                                                    />
                                                </Form.Group>

                                                {errorProductNewPrice !== 'true' && <p className='text-danger'>{errorProductNewPrice}</p>}
                                            </div>

                                            :
                                            <div className='Border_New_Old_Price_Sellers_List'>
                                                <div onClick={() => setProdIsOffer(true)} className='bg-primary Remove_Add_Offer_Sellers_List'>Add Offer</div>
                                                <Form.Group className='d-flex mb-4'>
                                                    <Form.Label className='m-auto w-50'>Price :</Form.Label>
                                                    <Form.Control className='border-primary'
                                                        ref={prodPriceRef}
                                                        value={prodPrice}
                                                        placeholder='Price...'
                                                        onChange={(e) => { setProdPrice(e.target.value.slice(0, 5)); checkValuesProductPrice(); }}
                                                        type="number"
                                                    />
                                                </Form.Group>
                                            </div>
                                    }

                                    <Form.Group className='d-flex mb-4'>
                                        <Form.Label className='m-auto w-50'>Kind :</Form.Label>
                                        <Form.Control className='border-primary'
                                            defaultValue={prodKind}
                                            disabled
                                        />
                                    </Form.Group>

                                    <Form.Group className='d-flex'>
                                        <Form.Label className='m-auto w-50'>Image :</Form.Label>
                                        <Form.Control className={errorProductImg ? 'border-danger' : 'border-primary'}
                                            ref={prodImgRef}
                                            value={prodImg}
                                            placeholder='Image...'
                                            onChange={(e) => { setProdImg(e.target.value); checkValuesProductImg(); }}
                                            type="text"
                                        />
                                    </Form.Group>

                                    {errorProductImg && <p className='text-danger'>{errorProductImg}</p>}

                                </Form>
                            </div>

                            <div className='mt-5'>
                                <div className='d-flex justify-content-center text-primary h4'>Inbox Products {prodName}</div>
                                {
                                    prodInbox.length
                                        ?
                                        <>
                                            <div onClick={updateInboxProductSeller} className='d-flex ClearInbox_Product_Sellers_List'><div class="fa-solid fa-arrow-right m-auto" /><div className='ms-2'>Clear Inbox </div></div>
                                            <div className='p-4'>
                                                {
                                                    prodInbox.map((inbox, i) => {
                                                        return <div key={i}><Inbox
                                                            Product_Id={i}
                                                            Product_Inbox={prodInbox}
                                                            Product_Kind={prodKind}
                                                            Product_Name={prodName}
                                                            Product_Img={prodImg}
                                                            Product_Price={prodPrice}
                                                            Inbox={inbox} /></div>
                                                    })
                                                }
                                            </div>
                                        </>
                                        :
                                        <div>there are no any messages in inbox product {prodName}.</div>
                                }
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer className='d-flex justify-content-between'>


                        <Button className='border_All_Buttons_BS' variant="secondary" onClick={() => { setModalShowProduct(false); SetSeeProductNull(); setErrorsProductNull(); }}>
                            Cancel
                        </Button>

                        <div>
                            <Button className='border_All_Buttons_BS' variant="danger" onClick={() => { setModalFuncs(true); setModalFuncsKind('DeleteProductSeller'); }}>
                                Delete
                            </Button>
                            <Button disabled={CheckAllValuesProductInput()} className='border_All_Buttons_BS ms-3' variant="primary" onClick={() => { setModalFuncs(true); setModalFuncsKind('UpdateProductSeller'); }}>
                                Update
                            </Button>
                        </div>

                    </Modal.Footer>
                </Modal>

                <Modal className='bg-primary bg-opacity-10' show={modalFuncs} onHide={() => { setModalFuncs(false); }}
                    centered aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header className='text-center bg-black text-white'>
                        <Modal.Title className='w-100'>Delete Product { }</Modal.Title>
                        <CloseButton variant="white" onClick={() => { setModalFuncs(false); }} />
                    </Modal.Header>

                    {
                        loading && <LoadingSpinner />
                    }

                    <Modal.Body>
                        {
                            modalFuncsKind === 'updateSeller' ?
                                <p>Are you shure that you want to update seller {name} ?</p>
                                :
                                modalFuncsKind === 'updateShop' ?
                                    <p>Are you shure that you want to update shop {shopName} ?</p>
                                    :
                                    modalFuncsKind === 'DeleteProductSeller' ?
                                        <p>Are you shure that you want to delete product {prodName} ?</p>
                                        :
                                        modalFuncsKind === 'UpdateProductSeller' ?
                                            <p>Are you shure that you want to update product {prodName} ?</p>
                                            :
                                            modalFuncsKind === 'DeleteShopAndProductsSeller' ?
                                                <p>Are you shure that you want to delete shop {shopName} and all there products ?</p>
                                                :
                                                null
                        }

                    </Modal.Body>

                    <Modal.Footer>
                        <Button className='border_All_Buttons_BS' variant="secondary" onClick={() => { setModalFuncs(false); }}>
                            Cancel
                        </Button>
                        <Button className='border_All_Buttons_BS' variant={modalFuncsKind === 'UpdateProductSeller' || modalFuncsKind === 'updateSeller' || modalFuncsKind === 'updateShop' ? "primary" : "danger"} onClick={() => { handelModalFuncs(); setModalFuncs(false); }}>
                            {
                                modalFuncsKind === 'updateSeller' ?
                                    <>Update Seller</>
                                    :
                                    modalFuncsKind === 'updateShop' ?
                                        <>Update Shop</>
                                        :
                                        modalFuncsKind === 'DeleteProductSeller' ?
                                            <>Delete Product</>
                                            :
                                            modalFuncsKind === 'UpdateProductSeller' ?
                                                <>Update Product</>
                                                :
                                                modalFuncsKind === 'DeleteShopAndProductsSeller' ?
                                                    <>Delete Shop</>
                                                    :
                                                    null
                            }
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal className='bg-primary bg-opacity-10' show={inboxShopModal} onHide={() => { setInboxShopModal(false); }}
                    centered aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header className='text-center bg-black text-white'>
                        <Modal.Title className='w-100'>Inbox Shop {shopName}</Modal.Title>
                        <CloseButton variant="white" onClick={() => { setInboxShopModal(false); }} />
                    </Modal.Header>

                    <Modal.Body>

                        {
                            shopInbox.length
                                ?
                                <>
                                    <div className='p-4'>
                                        {
                                            shopInbox.map((inbox, i) => {
                                                return <div key={i}><InboxShopss
                                                    Product_Id={i}
                                                    Product_Inbox={prodInbox}
                                                    Product_Kind={prodKind}
                                                    Product_Name={prodName}
                                                    Product_Img={prodImg}
                                                    Product_Price={prodPrice}
                                                    Inbox={inbox} /></div>
                                            })
                                        }
                                    </div>
                                </>
                                :
                                <div>there are no any messages in inbox Shop {shopName}.</div>
                        }


                    </Modal.Body>

                    <Modal.Footer>
                        <Button className='border_All_Buttons_BS' variant="secondary" onClick={() => { setInboxShopModal(false); }}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>

                <AddProduct shop_name={shopName} shop_kind={prodKind} show={addModalShowAddProduct} onHide={() => setAddModalShowAddProduct(false)} />
            </div>
        </div>
    )
}



