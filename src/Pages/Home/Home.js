import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import './Home.css';
import NavKinds from '../../Components/NavKinds/NavKinds';
import { GetProducts } from "../../Collections/ProductsCollection";
import { GetShops } from "../../Collections/ShopsCollection";
import { Link } from "react-router-dom";
import Product from "../../Components/Product/Product";
import Shop from "../../Components/Shop/Shop";
import { Button } from "react-bootstrap";


export default function Home(props) {

    const { currentUser } = useAuth();

    const Products = GetProducts();
    const Shops = GetShops();

    const OffersRef = useRef();
    const ProductsRef = useRef();
    const ShopsRef = useRef();

    const getShopName = (prod) => {
        let shopProduct = null
        Products.map((products) => {
            products.Products.map((prods, i) => {
                if (prods.Product_Img === prod.Product_Img &&
                    prods.Product_IsOffer === prod.Product_IsOffer &&
                    prods.Product_Kind === prod.Product_Kind &&
                    prods.Product_Name === prod.Product_Name &&
                    prods.Product_NewPrice === prod.Product_NewPrice &&
                    prods.Product_Price === prod.Product_Price) {

                    shopProduct = products.id;
                }
            })

        })
        let ShopName = null;
        Shops.map((shop) => {
            if (shop.id === shopProduct) {
                ShopName = shop.Shop_Name;
            }
        })
        return ShopName;
    }

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

    const getProductsRan = (IsInHirzontalBox) => {
        let AllProds = [];
        Products.map((Products) => {
            Products.Products.map((Product_Seller, i) => {
                let IsOffer = Product_Seller.Product_IsOffer ? true : false;
                AllProds.push(
                    <Link key={Product_Seller.Product_Name + i} className="text-decoration-none" onClick={() => window.scroll({ top: 0, left: 0, behavior: 'instant' })} to={'/Shop/' + getShopName(Product_Seller)}>
                        <Product
                            Product_IsOffer={IsOffer}
                            Product_NewPrice={Product_Seller.Product_NewPrice}
                            Product_Name={Product_Seller.Product_Name}
                            Product_Img={Product_Seller.Product_Img}
                            Product_Price={Product_Seller.Product_Price}
                            Product_Kind={Product_Seller.Product_Kind}
                        />
                    </Link>
                )
            })
        })

        let Shuffled = shuffle(AllProds);

        return IsInHirzontalBox
            ?
            Shuffled
            :
            <div key={'HirzontalProducts'} className="container_Products_Shops">
                {
                    Shuffled
                }
            </div>
    }

    const getShopsRan = (IsInHirzontalBox) => {
        let AllShops = [];
        Shops.map((shop) => {
            AllShops.push(
                <Link key={shop.id} onClick={() => window.scroll({ top: 0, left: 0, behavior: 'instant' })} className="text-decoration-none" to={'/Shop/' + shop.Shop_Name}>
                    <Shop Shop_Id={shop.id} Shop_Location={shop.Shop_Location} Shop_Name={shop.Shop_Name} Shop_Img={shop.Shop_Img} Shop_Desc={shop.Shop_Disc.slice(0, 20)} />
                </Link>
            )
        })

        let Shuffled = shuffle(AllShops);

        return IsInHirzontalBox
            ?
            Shuffled
            :
            <div key={'HirzontalShops'} className="container_Products_Shops">
                {
                    Shuffled
                }
            </div>
    }

    const getOffersRan = (IsInHirzontalBox) => {
        let AllOffers = [];
        props.Offers.map((offer, i) => {
            AllOffers.push(
                <Link key={offer.Product_Name + i} className="text-decoration-none" onClick={() => window.scroll({ top: 0, left: 0, behavior: 'instant' })} to={'/Shop/' + getShopName(offer)}>
                    <Product
                        Product_IsOffer
                        Product_NewPrice={offer.Product_NewPrice}
                        Product_Name={offer.Product_Name}
                        Product_Img={offer.Product_Img}
                        Product_Price={offer.Product_Price}
                        Product_Kind={offer.Product_Kind}
                    />
                </Link>
            )
        })

        let Shuffled = shuffle(AllOffers);

        return IsInHirzontalBox
            ?
            Shuffled
            :
            <div key={'HirzontalOffers'} className="container_Products_Shops">
                {
                    Shuffled
                }
            </div>
    }

    return (
        <div>
            <div id="Sticky_Bar_Home" className="d-flex justify-content-center">
                <div id="draw" className="d-flex justify-content-between w-100">
                    <Button className="bg-black m-auto" onClick={() => { window.scrollTo(0, 0) }}><i className="fa-solid fa-arrow-up-from-bracket"></i></Button>
                    <Button className="bg-black m-auto" onClick={() => { window.scrollTo({ top: OffersRef.current?.offsetTop - 200 }) }}>Offers</Button>
                    <Button className="bg-black m-auto" onClick={() => { window.scrollTo({ top: ProductsRef.current?.offsetTop - 200 }) }}>Products</Button>
                    <Button className="bg-black m-auto" onClick={() => { window.scrollTo({ top: ShopsRef.current?.offsetTop - 200 }) }}>Shops</Button>
                </div>
            </div>

            <div>
                <div ref={OffersRef}>
                    <NavKinds kind={'Offers'} />
                </div>
                <div key={'Offers'}>
                    <HorizontalScrolling Kind={'Offers'} Elements={getOffersRan(true)} />
                </div>
                <div>
                    {
                        getOffersRan()
                    }
                </div>
            </div>

            <div>
                <div ref={ProductsRef}>
                    <NavKinds kind={'Products'} />
                </div>
                <div className="pb-4">
                    <HorizontalScrolling Kind={'Products'} Elements={getProductsRan(true)} />
                </div>
                <div>
                    {
                        getProductsRan()
                    }
                </div>
            </div>

            <div>
                <div ref={ShopsRef}>
                    <NavKinds kind={'Shops'} />
                </div>
                <div className="pb-5">
                    <HorizontalScrolling Kind={'Shops'} Elements={getShopsRan(true)} />
                </div>
                <div>
                    {
                        getShopsRan()
                    }
                </div>
            </div>

        </div>
    )
}


export function HorizontalScrolling(props) {

    const kind = props.Kind === 'Shops' ? 260 : 220;

    const timerLeftRef = useRef();

    function handelonClickLeft() {
        document.getElementById(props.Kind).scrollLeft -= kind;
        return;
    }

    function handelonMouseDownLeft() {
        startPressTimer('L');
    }

    function handelonMouseUpLeft() {
        clearTimeout(timerLeftRef.current);
    }

    function handelonTouchStartLeft() {
        startPressTimer('L');
    }

    function handelonTouchEndLeft() {
        clearTimeout(timerLeftRef.current);
    }

    function startPressTimer(kind) {

        if (kind === 'L') {
            timerLeftRef.current = setTimeout(() => {
                document.getElementById(props.Kind).scrollLeft = 0;
            }, 500)
        }
        else {
            timerRightRef.current = setTimeout(() => {
                document.getElementById(props.Kind).scrollLeft = 999999999;
            }, 500)
        }
    }

    const timerRightRef = useRef();

    function handelonClickRight() {
        document.getElementById(props.Kind).scrollLeft += kind;
        return;
    }

    function handelonMouseDownRight() {
        startPressTimer();
    }

    function handelonMouseUpRight() {
        clearTimeout(timerRightRef.current);
    }

    function handelonTouchStartRight() {
        startPressTimer();
    }

    function handelonTouchEndRight() {
        clearTimeout(timerRightRef.current);
    }

    const divvRef = useRef();
    const longJump = ((divvRef.current?.scrollWidth / 2) - 10);

    return (
        <div className="d-flex justify-content-between">

            {
                useEffect(() => {
                    divvRef.current.scrollLeft = longJump
                })
            }

            <div id='Arrows_Border_Hir_Box_Left' className="m-auto p-2">
                <i
                    id='Arrows_Left'
                    className="fa-sharp fa-solid fa-arrow-left"
                    onClick={handelonClickLeft}
                    onMouseDown={handelonMouseDownLeft}
                    onMouseUp={handelonMouseUpLeft}
                    onTouchStart={handelonTouchStartLeft}
                    onTouchEnd={handelonTouchEndLeft}
                ></i>
            </div>

            <div ref={divvRef} id={props.Kind} className="Hiraontal_Box_Scrolling">

                <div className="d-flex">
                    {
                        props.Elements.map((ele, i) => {
                            return <div key={i} className="p-3">{ele}</div>
                        })
                    }
                </div>

            </div>

            <div id='Arrows_Border_Hir_Box_Right' className="m-auto p-2">
                <i id='Arrows_Right'
                    className="fa-solid fa-arrow-right"
                    onClick={handelonClickRight}
                    onMouseDown={handelonMouseDownRight}
                    onMouseUp={handelonMouseUpRight}
                    onTouchStart={handelonTouchStartRight}
                    onTouchEnd={handelonTouchEndRight}
                ></i>
            </div>

        </div>
    )

}

