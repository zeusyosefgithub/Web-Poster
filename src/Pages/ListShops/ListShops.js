import React from "react";
import ShowShops from "../../Components/ShowShops/ShowShops";
import './ListShops.css';
import { GetShops } from "../../Collections/ShopsCollection";
import SearchBox from "../../Components/SearchBox/SearchBox";

export default function ListShops() {

    const shops = GetShops();


    return (
        <div>
            <div className="SearchBox_List_Products_Shops">
                <div className="Titel_Search_Box">Shops</div>
                <div className="m-auto"><SearchBox Kind_Search={'Shops'}/></div>
            </div>
            <div>
                <ShowShops List={shops} />
            </div>
        </div>
    )

}