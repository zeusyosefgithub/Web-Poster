import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
import { GetShops } from '../../Collections/ShopsCollection';
import { GetProducts } from '../../Collections/ProductsCollection';

export default function SortProducts(props) {

    const { currentUser } = useAuth();

    const shops = GetShops();
    const products = GetProducts();

    const AllProdsToSort = () => {
        let productsSeller = props.products;
        let arrayProducts = [];
        productsSeller.map((prod, i) => {
            arrayProducts.push({
                Price: prod.Product_Price,
                Element: {
                    Product_Name: prod.Product_Name,
                    Product_Id: props.ids_prods?.length ? props.ids_prods[i] : i,
                    Product_Kind: prod.Product_Kind,
                    Product_Img: prod.Product_Img,
                    Product_Price: prod.Product_Price,
                    Product_NewPrice: prod.Product_NewPrice,
                    Product_IsOffer: prod.Product_IsOffer,
                    Product_Inbox: prod.Product_Inbox
                }
            })
        })
        return arrayProducts;
    }

    const AllProdsToSort1 = () => {
        let productsSeller = props.products;
        let arrayProducts = [];
        productsSeller.map((prod, i) => {
            arrayProducts.push({
                Price: prod.Product_Price,
                Element: {
                    Product_Name: prod.Product_Name,
                    Product_Id: props.ids_prods?.length ? props.ids_prods[i] : i,
                    Product_Kind: prod.Product_Kind,
                    Product_Img: prod.Product_Img,
                    Product_Price: prod.Product_Price,
                    Product_NewPrice: prod.Product_NewPrice,
                    Product_IsOffer: prod.Product_IsOffer,
                    Product_Inbox: prod.Product_Inbox
                }
            })
        })
        return arrayProducts;
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

    function makeLowestHighest(arrayProducts) {
        let makeLowestHighest = arrayProducts?.sort(
            (productsA, productB) => {
                return productsA.Price - productB.Price;
            }
        )
        return makeLowestHighest;
    }

    function makeHighestLowest(arrayProducts) {
        let makeHighestLowest = arrayProducts?.sort(
            (productsA, productB) => {
                return productB.Price - productsA.Price;
            }
        )
        return makeHighestLowest;
    }

    const allProdsToSort = AllProdsToSort();
    const allProdsToSort1 = AllProdsToSort1();

    const renderProducts = () => {
        const makeHighestLowestNewArray = makeHighestLowest(allProdsToSort);
        const makeLowestHighestArray = makeLowestHighest(allProdsToSort1);
        let forShuffel = [];
        let makeHighestLowestNew = [];
        let makeLowestHighestNew = [];
        makeHighestLowestNewArray.map((prod, i) => {
            if (currentUser && currentUser.uid === props.Shop_Uid) {
                makeHighestLowestNew.push(<div key={props.ids_prods?.length ? props.ids_prods[i] : i}><Product
                    IsInPage
                    Product_Id={props.ids_prods?.length ? props.ids_prods[i] : i}
                    IsSellerInPage
                    Product_NewPrice={prod.Element.Product_NewPrice}
                    Product_IsOffer={prod.Element.Product_IsOffer}
                    Product_Name={prod.Element.Product_Name}
                    Product_Img={prod.Element.Product_Img}
                    Product_Kind={prod.Element.Product_Kind}
                    Product_Price={prod.Element.Product_Price}
                    Product_Inbox={prod.Element.Product_Inbox}
                /></div>)
            }
            else if (currentUser && currentUser.uid !== props.Shop_Uid) {
                makeHighestLowestNew.push(<div key={i}><Product
                    Product_NewPrice={prod.Element.Product_NewPrice}
                    Product_IsOffer={prod.Element.Product_IsOffer}
                    Product_Name={prod.Element.Product_Name}
                    Product_Img={prod.Element.Product_Img}
                    Product_Kind={prod.Element.Product_Kind}
                    Product_Price={prod.Element.Product_Price}
                /></div>)
            }
            else {
                makeHighestLowestNew.push(<div key={props.ids_prods?.length ? props.ids_prods[i] : i}><Product
                    Product_NewPrice={prod.Element.Product_NewPrice}
                    Product_IsOffer={prod.Element.Product_IsOffer}
                    Shop_Uid={props.Shop_Uid}
                    Product_Inbox={prod.Element.Product_Inbox}
                    Product_Id={props.ids_prods?.length ? props.ids_prods[i] : i}
                    Customer={true}
                    Product_Name={prod.Element.Product_Name}
                    Product_Img={prod.Element.Product_Img}
                    Product_Kind={prod.Element.Product_Kind}
                    Product_Price={prod.Element.Product_Price}
                /></div>)
            }
        })
        makeLowestHighestArray.map((prod, i) => {
            if (currentUser && currentUser.uid === props.Shop_Uid) {
                makeLowestHighestNew.push(<div key={props.ids_prods?.length ? props.ids_prods[i] : i}><Product
                    IsInPage
                    Product_Id={props.ids_prods?.length ? props.ids_prods[i] : i}
                    IsSellerInPage
                    Product_NewPrice={prod.Element.Product_NewPrice}
                    Product_IsOffer={prod.Element.Product_IsOffer}
                    Product_Name={prod.Element.Product_Name}
                    Product_Img={prod.Element.Product_Img}
                    Product_Kind={prod.Element.Product_Kind}
                    Product_Price={prod.Element.Product_Price}
                    Product_Inbox={prod.Element.Product_Inbox}
                /></div>)
            }
            else if (currentUser && currentUser.uid !== props.Shop_Uid) {
                makeLowestHighestNew.push(<div key={i}><Product
                    Product_NewPrice={prod.Element.Product_NewPrice}
                    Product_IsOffer={prod.Element.Product_IsOffer}
                    Product_Name={prod.Element.Product_Name}
                    Product_Img={prod.Element.Product_Img}
                    Product_Kind={prod.Element.Product_Kind}
                    Product_Price={prod.Element.Product_Price}
                /></div>)
            }
            else {
                makeLowestHighestNew.push(<div key={props.ids_prods?.length ? props.ids_prods[i] : i}><Product
                    Product_NewPrice={prod.Element.Product_NewPrice}
                    Product_IsOffer={prod.Element.Product_IsOffer}
                    Shop_Uid={props.Shop_Uid}
                    Product_Inbox={prod.Element.Product_Inbox}
                    Product_Id={props.ids_prods?.length ? props.ids_prods[i] : i}
                    Customer={true}
                    Product_Name={prod.Element.Product_Name}
                    Product_Img={prod.Element.Product_Img}
                    Product_Kind={prod.Element.Product_Kind}
                    Product_Price={prod.Element.Product_Price}
                /></div>)
            }
        })
        let productsSeller = props.products;
        productsSeller.map((prod, i) => {
            if (currentUser && currentUser.uid === props.Shop_Uid) {
                forShuffel.push(<div key={props.ids_prods?.length ? props.ids_prods[i] : i}><Product
                    IsInPage
                    Product_Id={props.ids_prods?.length ? props.ids_prods[i] : i}
                    IsSellerInPage
                    Product_NewPrice={prod.Product_NewPrice}
                    Product_IsOffer={prod.Product_IsOffer}
                    Product_Name={prod.Product_Name}
                    Product_Img={prod.Product_Img}
                    Product_Kind={prod.Product_Kind}
                    Product_Price={prod.Product_Price}
                    Product_Inbox={prod.Product_Inbox}
                /></div>)
            }
            else if (currentUser && currentUser.uid !== props.Shop_Uid) {
                forShuffel.push(<div key={props.ids_prods?.length ? props.ids_prods[i] : i}><Product
                    Product_NewPrice={prod.Product_NewPrice}
                    Product_IsOffer={prod.Product_IsOffer}
                    Product_Name={prod.Product_Name}
                    Product_Img={prod.Product_Img}
                    Product_Kind={prod.Product_Kind}
                    Product_Price={prod.Product_Price}
                /></div>)
            }
            else {
                forShuffel.push(<div key={props.ids_prods?.length ? props.ids_prods[i] : i}><Product
                    Product_NewPrice={prod.Product_NewPrice}
                    Product_IsOffer={prod.Product_IsOffer}
                    Shop_Uid={props.Shop_Uid}
                    Product_Inbox={prod.Product_Inbox}
                    Product_Id={props.ids_prods?.length ? props.ids_prods[i] : i}
                    Customer={true}
                    Product_Name={prod.Product_Name}
                    Product_Img={prod.Product_Img}
                    Product_Kind={prod.Product_Kind}
                    Product_Price={prod.Product_Price}
                /></div>)
            }
        })
        const shuffeld = shuffle(forShuffel);
        return props.sort_kind === 'From highest price to lowest' ?
            <div key={"From highest price to lowest"} className="container_Products_Shops">
                {
                    makeHighestLowestNew
                }
            </div>
            :
            props.sort_kind === 'From lowest price to highest' ?
                <div key={"From lowest price to highest"} className="container_Products_Shops">
                    {
                        makeLowestHighestNew
                    }
                </div>
                :
                props.sort_kind === 'Random' ?
                    <div key={"Random"} className="container_Products_Shops">
                        {
                            shuffeld
                        }
                    </div>
                    :
                    <div key={"Normal"} className="container_Products_Shops">
                        {
                            productsSeller.map((prod, i) => {
                                if (currentUser && currentUser.uid === props.Shop_Uid) {
                                    return <div key={props.ids_prods?.length ? props.ids_prods[i] : i}><Product
                                        IsInPage
                                        Product_Id={props.ids_prods?.length ? props.ids_prods[i] : i}
                                        IsSellerInPage
                                        Product_NewPrice={prod.Product_NewPrice}
                                        Product_IsOffer={prod.Product_IsOffer}
                                        Product_Name={prod.Product_Name}
                                        Product_Img={prod.Product_Img}
                                        Product_Kind={prod.Product_Kind}
                                        Product_Price={prod.Product_Price}
                                        Product_Inbox={prod.Product_Inbox}
                                    /></div>
                                }
                                else if (currentUser && currentUser.uid !== props.Shop_Uid) {
                                    return <div key={props.ids_prods?.length ? props.ids_prods[i] : i}><Product
                                        Product_NewPrice={prod.Product_NewPrice}
                                        Product_IsOffer={prod.Product_IsOffer}
                                        Product_Name={prod.Product_Name}
                                        Product_Img={prod.Product_Img}
                                        Product_Kind={prod.Product_Kind}
                                        Product_Price={prod.Product_Price}
                                    /></div>
                                }
                                else {
                                    return <div key={props.ids_prods?.length ? props.ids_prods[i] : i}><Product
                                        Product_NewPrice={prod.Product_NewPrice}
                                        Product_IsOffer={prod.Product_IsOffer}
                                        Shop_Uid={props.Shop_Uid}
                                        Product_Inbox={prod.Product_Inbox}
                                        Product_Id={props.ids_prods?.length ? props.ids_prods[i] : i}
                                        Customer={true}
                                        Product_Name={prod.Product_Name}
                                        Product_Img={prod.Product_Img}
                                        Product_Kind={prod.Product_Kind}
                                        Product_Price={prod.Product_Price}
                                    /></div>
                                }
                            })
                        }
                    </div>

    }

    const allProdsToSortList = AllProdsToSort();
    const allProdsToSortList1 = AllProdsToSort1();

    const getShopName = (prod) => {
        let shopProduct = null
        products.map((products) => {
            products.Products.map((prods) => {
                if (prods.Product_Name === prod.Product_Name &&
                    prods.Product_NewPrice === prod.Product_NewPrice &&
                    prods.Product_IsOffer === prod.Product_IsOffer &&
                    prods.Product_Img === prod.Product_Img &&
                    prods.Product_Price === prod.Product_Price &&
                    prods.Product_Kind === prod.Product_Kind) {

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

    const checkIfNull = (prod) => {
        if(prod === null){
            return '';
        }
        else{
            return prod;
        }
    } 


    const renderProductsInListPages = () => {


        const makeHighestLowestNewArray = makeHighestLowest(allProdsToSortList);
        const makeLowestHighestArray = makeLowestHighest(allProdsToSortList1);
        let forShuffel = [];
        let makeHighestLowestNew = [];
        let makeLowestHighestNew = [];
        makeHighestLowestNewArray.map((prod, i) => {
            makeHighestLowestNew.push(<Link key={i} onClick={() => window.scroll({ top: 0, left: 0, behavior: 'instant' })} className="text-decoration-none" to={'/Shop/' + getShopName(prod.Element)}>
                <Product
                    Product_NewPrice={prod.Element.Product_NewPrice}
                    Product_IsOffer={prod.Element.Product_IsOffer}
                    Product_Name={prod.Element.Product_Name}
                    Product_Img={prod.Element.Product_Img}
                    Product_Price={prod.Element.Product_Price}
                    Product_Kind={prod.Element.Product_Kind}
                />
            </Link>)
        })
        makeLowestHighestArray.map((prod, i) => {
            makeLowestHighestNew.push(<Link key={i} onClick={() => window.scroll({ top: 0, left: 0, behavior: 'instant' })} className="text-decoration-none" to={'/Shop/' + getShopName(prod.Element)}>
                <Product
                    Product_NewPrice={prod.Element.Product_NewPrice}
                    Product_IsOffer={prod.Element.Product_IsOffer}
                    Product_Name={prod.Element.Product_Name}
                    Product_Img={prod.Element.Product_Img}
                    Product_Price={prod.Element.Product_Price}
                    Product_Kind={prod.Element.Product_Kind}
                />
            </Link>)
        })
        let productsSeller = props.products;
        productsSeller.map((prod, i) => {

            console.log(prod)

            forShuffel.push(<Link key={i} onClick={() => window.scroll({ top: 0, left: 0, behavior: 'instant' })} className="text-decoration-none" to={'/Shop/' + getShopName(prod)}>
                <Product
                    Product_NewPrice={prod.Product_NewPrice}
                    Product_IsOffer={prod.Product_IsOffer}
                    Product_Name={prod.Product_Name}
                    Product_Img={prod.Product_Img}
                    Product_Price={prod.Product_Price}
                    Product_Kind={prod.Product_Kind}
                />
            </Link>)
        })
        const shuffeld = shuffle(forShuffel);
        return makeHighestLowestNew && props.sort_kind === 'From highest price to lowest' ?
            <div key={"From highest price to lowest"} className="container_Products_Shops">
                {
                    makeHighestLowestNew
                }
            </div>
            :
            props.sort_kind === 'From lowest price to highest' ?
                <div key={"From lowest price to highest"} className="container_Products_Shops">
                    {
                        makeLowestHighestNew
                    }
                </div>
                :
                props.sort_kind === 'Random' ?
                    <div key={"Random"} className="container_Products_Shops">
                        {
                            shuffeld
                        }
                    </div>
                    :
                    <div key={"Normal"} className="container_Products_Shops">
                        
                        {
                            productsSeller.map((prod, i) => {
                                return (<Link key={i} onClick={() => window.scroll({ top: 0, left: 0, behavior: 'instant' })} className="text-decoration-none" to={'/Shop/' + getShopName(prod)}>
                                    <Product
                                        Product_NewPrice={prod.Product_NewPrice}
                                        Product_IsOffer={prod.Product_IsOffer}
                                        Product_Name={prod.Product_Name}
                                        Product_Img={prod.Product_Img}
                                        Product_Price={prod.Product_Price}
                                        Product_Kind={prod.Product_Kind}
                                    />
                                </Link>)
                            })
                        }
                    </div>
    }

    return props.List ? renderProductsInListPages() : renderProducts();
}

