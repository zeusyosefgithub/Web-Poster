import React from "react";
import './Shop.css';
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

export default function Shop(props) {

    const {currentUser} = useAuth();

    const IsOwned = () => {
        return currentUser && currentUser.uid === props.Shop_Id
            ?
            'bg-primary'
            :
            null
    }

    return (

        <div id='Shop_Box_Style' className={IsOwned()}>
            <div id='All_Box_Details' className={"d-flex justify-content-between"}>

                <div>
                    <img className="Shop_Img" src={props.Shop_Img} />
                </div>

                <div className="Details_Shop_Page">
                    <p>Name: {props.Shop_Name.slice(0, 15)}</p>
                    <p>Location: {props.Shop_Location.slice(0, 10)}</p>
                    <p>Discription: {props.Shop_Desc.slice(0, 10)}</p>
                </div>

            </div>
        </div>
    )

}


