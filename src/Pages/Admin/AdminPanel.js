import React from 'react';
import { useState,useEffect } from 'react';
import './AdminPanel.css';
import AdminsList from './AdminsList';
import SellersList from './SellersList';
import ShopsProductsKinds from './ShopsProductsKinds';

export default function AdminPanel(props) {

    const [showAdminsList, setShowAdminsList] = useState(true);
    const [showSellersList, setShowSellersList] = useState(false);
    const [showShopsProducts, setShowShopsProducts] = useState(false);

    const [users,setUsers] = useState([]);

    useEffect(() => {
        getUsersAdmins();
    },[])

    const getUsersAdmins = async() => {
        const respon = await fetch("/users");
        const data = await respon.json();
        setUsers(data);
    }

    return (
        <div className='mt-5'>
            <div className='Admin_Panel_Page'>
                <div className='d-flex justify-content-center'>
                    <h3>Admin Panel</h3><h3 className="fa-solid fa-user-tie ms-4"></h3>
                </div>
                <div className='d-flex justify-content-around m-5'>
                    <div onClick={() => {setShowAdminsList(true);setShowSellersList(false);setShowShopsProducts(false)}} id={showAdminsList ? "Admins_Options_After" : "Admins_Options"}>Admins list <div className="fa-solid fa-user-tie ms-2"/></div>
                    <div onClick={() => {setShowAdminsList(false);setShowSellersList(true);setShowShopsProducts(false)}} id={showSellersList ? "Admins_Options_After" : "Admins_Options"}>Sellers list <div className="fa-solid fa-user ms-2"/></div>
                    <div onClick={() => {setShowAdminsList(false);setShowSellersList(false);setShowShopsProducts(true)}} id={showShopsProducts ? "Admins_Options_After" : "Admins_Options"}>Shops & Products<div className="fa-solid fa-store ms-2"/></div>
                </div>
            </div>
            <div className='w-100'>
                {
                    showAdminsList
                        ?
                        <AdminsList users={users} shops={props.shops} sellers={props.sellers} Admins={props.Admins} />
                        :
                        showSellersList
                        ?
                        <SellersList products={props.products} users={users} shops={props.shops} sellers={props.sellers} Admins={props.Admins}/>
                        :
                        showShopsProducts
                        ?
                        <ShopsProductsKinds/>
                        :
                        null

                }
            </div>
        </div>
    )
}





