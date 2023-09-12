import React, { useEffect, useRef, useState } from "react";
import Product from '../Product/Product';
import './ShowProducts.css';
import { Link } from 'react-router-dom';
import NavKinds from "../NavKinds/NavKinds";
import { GetShops } from '../../Collections/ShopsCollection';
import { GetProducts } from '../../Collections/ProductsCollection';
import { Button, Dropdown, NavDropdown } from "react-bootstrap";
import { GetShopsProducts } from "../../Collections/ShopsProductsCollection";
import SortProducts from "../SortProducts/SortProducts";

export default function ShowProducts(props) {

    const List_Shops_Kinds = GetShopsProducts()[0]?.Kinds;
    const locationsKindsRef = useRef([]);
    const products = GetProducts();
    const shops = GetShops();

    const [currentSort, setCurrentSort] = useState([]);

    const changeSortType = (index, newType) => {
        let newSort = [...currentSort];
        newSort[index] = newType;
        setCurrentSort(newSort);
    }

    useEffect(() => {
        setCurrentSort(props.kinds_to_sort);
    }, [props.kinds_to_sort])


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

    const getShopName = (prod) => {
        let shopProduct = null
        products.map((products) => {
            products.Products.map((prods) => {
                if (prods === prod) {
                    shopProduct = products.id;
                }
            })

        })
        let ShopName = null;
        shops.map((shop) => {
            if (shop.id === shopProduct) {
                ShopName = shop.Shop_Name;
            }
        })
        return ShopName;
    }

    const renderInListPage = (kind, loc) => {

        let productsSeller = [];
        products.map((products) => {
            products.Products.map((prods => {
                productsSeller.push(prods)
            }))
        })

        let res = false;
        let makeShuffel = [];
        productsSeller.map((prod) => {
            if (prod.Product_Kind === kind) {
                makeShuffel.push(prod);
                res = true;
            }
        })

        return res ? (<div key={loc} className='mt-3 mb-5'>
            <NavKinds noPadding kind={kind} />
            <div className="d-flex justify-content-center mb-3">
                <div className="Shop_Options">
                    <div className="d-flex">
                        <Dropdown className="w-100 Z_Index_Kind_Sort">                
                            <Dropdown.Toggle className="w-100 bg-black Z_Index_Kind_Sort1">
                                <div className="Sort_Nav_Products"><div>Sort Products</div> <div className="fa-solid fa-sort mt-1"/></div>
                            </Dropdown.Toggle>           
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => changeSortType(loc, 'Normal')} className='text-primary'><div className="fa-solid fa-sort m-auto pe-2" />Normal</Dropdown.Item>
                                <Dropdown.Item onClick={() => changeSortType(loc, 'Random')} className='text-primary' ><div className="fa-solid fa-sort m-auto pe-2" />Random</Dropdown.Item>
                                <Dropdown.Item onClick={() => changeSortType(loc, 'From lowest price to highest')} className='text-primary'><div className="fa-solid fa-sort m-auto pe-2" />From lowest price to highest</Dropdown.Item>
                                <Dropdown.Item onClick={() => changeSortType(loc, 'From highest price to lowest')} className='text-primary' ><div className="fa-solid fa-sort m-auto pe-2" />From highest price to lowest</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div key={loc} ref={el => (locationsKindsRef.current[loc] = el)} className="container_Products_Shops">
                <SortProducts List products={makeShuffel} Shop_Uid={props.Shop_Uid} sort_kind={currentSort[loc]} />
            </div>
        </div>)
            :
            null
    }

    const getPeoductsSeller = () => {
        let productsSeller = [];
        products.map((products) => {
            if (products.id === props.Shop_Uid) {
                productsSeller = products.Products;
            }
        })
        return productsSeller;
    }



    return (
        <>
            <div>
                {
                    props.IsInPage
                        ?
                        <SortProducts products={getPeoductsSeller()} Shop_Uid={props.Shop_Uid} sort_kind={props.sort_kind} />
                        :
                        <>
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
                                List_Shops_Kinds?.map((kind, loc) => {
                                    return renderInListPage(kind, loc);
                                })
                            }
                        </>
                }

            </div>
        </>
    )
}

