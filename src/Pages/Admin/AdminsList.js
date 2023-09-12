import React, { useEffect } from 'react';
import { useState } from 'react';
import './AdminPanel.css';
import { GetSellerUser } from '../../Collections/SellersCollection';
import { CheckUserHasShop } from '../../Collections/ShopsCollection';


export default function AdminsList(props) {

    const getCurrentEmail = (id) => {
        let currentEmail = '';
        props.users.map((user) => {
            if(user.uid === id){
                currentEmail = user.email;
            }
        })
        return currentEmail;
    }

    return (
        <div className='List_Admins'>
            <div className='d-flex justify-content-around mb-5 mt-1 Options_Sellers_List'>
                <div className='Icon_Edit_Admin_List'><div className="fa-solid fa-shop Edit_Span_Seller_Panel_Bar"/> : &nbsp;The admin has a store</div>
                <div className='Icon_Trash_Admin_List'><div className="fa-solid fa-shop-slash Trash_Span_Seller_Panel_Bar" /> : &nbsp;The admin does not have a store</div>
            </div>
            <div className='d-flex justify-content-around mb-5 mt-1 Options_Sellers_List'>
                <div className='m-auto h5'>Total Admins : {props.Admins?.length}</div>
            </div>
            {
                props.Admins.map((admin, i) => {
                    const user = GetSellerUser(props.sellers,admin);
                    return <div key={i} className='Seller_Box_List'>
                        <div className='Admin_Number'>{i + 1}.</div>
                        <div className='Admin_Email'>{getCurrentEmail(user.id)}</div>
                        <div className='Admin_Name'>{user.Name?.slice(0,10)}</div>
                        <div className='Admin_Phone'>{user.Phone?.slice(0,10)}</div>
                        <div className='Admin_BirthDate'>{user.BirthDate?.slice(0, 10)}</div>
                        {
                            CheckUserHasShop(props.shops,user.id)
                            ?
                            <div className="fa-solid fa-shop Have_Shop"/>
                            :
                            <div className="fa-solid fa-shop-slash Not_Have_Shop" />
                        }
                    </div>
                })
            }
        </div>
    )
}

