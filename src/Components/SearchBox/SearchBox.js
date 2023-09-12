import React, { useEffect, useState } from 'react';
import { GetProducts } from '../../Collections/ProductsCollection';
import './SearchBox.css';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { GetShops } from '../../Collections/ShopsCollection';

export default function SearchBox(props) {

    const [searchInput, setSearchInput] = useState("");

    const products = GetProducts();
    const shops = GetShops();

    const [showCard, setShowCard] = useState(false);

    const getAllProductsProp = () => {
        let allprods = [];
        products.map((prods) => {
            prods.Products.map((prod) => {
                allprods.push({
                    Product_Name: prod.Product_Name,
                    Product_Price: prod.Product_Price,
                    Product_Img: prod.Product_Img,
                    Product_NewPrice: prod.Product_NewPrice,
                    Product_Kind: prod.Product_Kind,
                    Product_IsOffer: prod.Product_IsOffer
                })
            })
        })
        return allprods;
    }

    const getAllShopssProp = () => {
        let allshopss = [];
        shops.map((shop) => {
            allshopss.push({
                Shop_Name: shop.Shop_Name,
                Shop_Disc: shop.Shop_Disc,
                Shop_Img: shop.Shop_Img,
                Shop_Kind: shop.Shop_Kind,
                Shop_Location: shop.Shop_Location
            })
        })
        return allshopss;
    }

    const AllProductsNamesPrices = getAllProductsProp();

    const AllShopssNames = getAllShopssProp();

    const IfClickedOutSide = () => {
        window.addEventListener('click', function (e) {
            if (document.getElementById('search_box_Con')?.contains(e.target)) {
                setShowCard(true);
            }
            else {
                setShowCard(false);
            }
        });
    }

    const getShopName = (prod) => {
        let shopProduct = null
        console.log(prod);
        products.map((products) => {
            products.Products.map((prods) => {
                if (prods.Product_Name === prod.Product_Name &&
                    prods.Product_Price === prod.Product_Price &&
                    prods.Product_Img === prod.Product_Img &&
                    prods.Product_NewPrice === prod.Product_NewPrice &&
                    prods.Product_Kind === prod.Product_Kind &&
                    prods.Product_IsOffer === prod.Product_IsOffer) {

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

    useEffect(() => {
        IfClickedOutSide()
    }, [])

    return (
        <div className='search_box_Web_Poster'>

            <div id='search_box_Con' className="search_box text-primary">
                <div className='d-flex Box_Search'>
                    <div>
                        <input type="text"
                            className="searchTerm"
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput}
                            placeholder="Search..."
                        />
                    </div>
                    <div className="fa-solid fa-magnifying-glass Serach_Icon m-auto" />
                </div>

            </div>


            <div>
                {
                    searchInput && showCard && <Card className="Card_Search_Box_Active">
                        <Card.Body>
                            <div className='Card_Body_Search pe-3'>
                                {
                                    props.Kind_Search === 'Shops'
                                        ?
                                        <>
                                            <h5 className='mb-3'>Products</h5>
                                            {
                                                searchInput.length > 0 && AllShopssNames.map((shop, i) => {
                                                    if (shop.Shop_Name.includes(searchInput)) {
                                                        return <Link key={i} className='text-decoration-none' to={'/Shop/' + shop.Shop_Name}><div className="Nav_Drop_Downs_Items_Kinds Cursur_Products" key={i} ><div className="me-3">{i + 1}.</div>{shop.Shop_Name}</div></Link>
                                                    }
                                                })
                                            }
                                        </>
                                        :
                                        <>
                                            <h5 className='mb-3'>Shops</h5>
                                            {
                                                searchInput.length > 0 && AllProductsNamesPrices.map((prod, i) => {
                                                    if (prod.Product_Name.includes(searchInput)) {
                                                        return <Link key={i} className='text-decoration-none' to={'/Shop/' + getShopName(prod)}><div className="Nav_Drop_Downs_Items_Kinds Cursur_Products" key={i} ><div className="me-3">{i + 1}.</div>{prod.Product_Name}</div></Link>
                                                    }
                                                })
                                            }
                                        </>
                                }
                            </div>
                        </Card.Body>
                    </Card>
                }


            </div>
        </div>
    )
}