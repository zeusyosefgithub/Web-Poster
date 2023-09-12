import React, { useRef } from "react";
import { Link } from 'react-router-dom';
import Shop from "../Shop/Shop";
import './ShowShops.css';
import NavKinds from "../NavKinds/NavKinds";
import { NavDropdown } from "react-bootstrap";
import { GetShopsProducts } from "../../Collections/ShopsProductsCollection";

export default function ShowShops(props) {

    const List_Shops_Kinds = GetShopsProducts()[0]?.Kinds;

    const locationsKindsRef = useRef([]);

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    function RenderShops(kind, loc) {
        let makeShuffel = [];
        let res = false;
        props.List.map((shop, i) => {
            if (kind == shop.Shop_Kind) {
                res = true;
                makeShuffel.push(<Link key={i} onClick={() => window.scroll({ top: 0, left: 0, behavior: 'instant' })} className="text-decoration-none" to={'/Shop/' + shop.Shop_Name}>
                    <Shop Shop_Id={shop.id} Shop_Location={shop.Shop_Location} Shop_Name={shop.Shop_Name} Shop_Img={shop.Shop_Img} Shop_Desc={shop.Shop_Disc.slice(0, 20)} />
                </Link>)
            }
        })
        const shuffeled = shuffle(makeShuffel);
        return res && (<div key={loc}>
            <NavKinds kind={kind} />
            <div ref={el => (locationsKindsRef.current[loc] = el)} className="container_Products_Shops">
                {
                    shuffeled
                }
            </div>
        </div>)
    }

    return (
        <div>

            {
                <div id='Sticky_NavBar' className="d-flex justify-content-between">
                    <div className="Scroll_To_Top"><i onClick={() => { window.scrollTo(0, 0) }} id='Button_To_Top' className="fa-solid fa-arrow-up-from-bracket"></i></div>
                    <div className="Scroll_Options_Kinds">
                        <NavDropdown align="end" title="Kinds" id="dropdown-basic">

                            <NavDropdown.Item className='No_hover_DropDown'>
                                <div className="Button_DropDown_List">
                                    {
                                        List_Shops_Kinds?.map((kind, loc) => {
                                            return <div className="Nav_Drop_Downs_Items_Kinds" key={loc} onClick={() => { window.scrollTo({ top: locationsKindsRef.current[loc]?.offsetTop - 300 }) }}><div className="me-3">{loc + 1}.</div>{kind}</div>
                                        })
                                    }
                                </div>
                            </NavDropdown.Item>

                        </NavDropdown>
                    </div>
                </div>
            }

            {
                List_Shops_Kinds?.map((kind, loc) =>
                    RenderShops(kind, loc)
                )
            }

        </div>
    )

}