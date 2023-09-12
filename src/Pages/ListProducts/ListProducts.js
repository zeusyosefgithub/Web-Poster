import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { GetProducts } from "../../Collections/ProductsCollection";
import { GetShopsProducts } from "../../Collections/ShopsProductsCollection";
import SearchBox from "../../Components/SearchBox/SearchBox";
import ShowProducts from "../../Components/ShowProducts/ShowProducts";
import './ListProducts.css';



export default function ListProducts(props) {

    const List_Shops_Kinds = GetShopsProducts()[0]?.Kinds;

    const getAllKindsToSort = () => {
        let array = [];
        List_Shops_Kinds?.map((kind) => {
            array.push('Normal');
        })
        return array;
    }

    return (
        <div>         
            <div className="SearchBox_List_Products_Shops">
                <div className="Titel_Search_Box">Products</div>
                <div className="m-auto"><SearchBox Kind_Search={'Products'}/></div>
            </div>
            <div>
                <ShowProducts kinds_to_sort={getAllKindsToSort()}/>
            </div>
        </div>
    )

}