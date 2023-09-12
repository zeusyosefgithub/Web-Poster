import React, { useRef, useState } from "react";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ShowProducts from "../../Components/ShowProducts/ShowProducts";
import './ShopPages.css';
import { useAuth } from "../../contexts/AuthContext";
import { Dropdown, DropdownButton, Form, NavDropdown } from "react-bootstrap";
import AddComment from "../../Components/AddComment/AddComment";
import NavKinds from "../../Components/NavKinds/NavKinds";
import { DeleteAllOffers, DeleteAllProducts, GetProducts, RemoveAllOffers } from "../../Collections/ProductsCollection";
import { Modal, CloseButton, Button } from "react-bootstrap";
import Product from "../../Components/Product/Product";
import { Link } from "react-router-dom";
import { DeleteShop } from "../../Collections/ShopsCollection";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import SortProducts from "../../Components/SortProducts/SortProducts";

export default function ShopPages(props) {

    const [addModalShowComment, setAddModalShowComment] = useState(false);
    const [addModalShow, setAddModalShow] = useState(false);

    const { currentUser } = useAuth();

    const [showDeleteAll, setShowDeleteAll] = useState(false);
    const handleCloseDeleteAll = () => setShowDeleteAll(false);
    const handleShowDeleteAll = () => setShowDeleteAll(true);
    const [showDeleteAllKind, setShowDeleteAllKind] = useState('');

    const [sortKind, setSortKind] = useState('Normal');
    const [sortKindOffers, setSortKindOffers] = useState('Normal');

    const [loading, setLoading] = useState(false);
    const scrrollingPlaces = useRef([]);

    const deleteAllProducts = () => {
        setLoading(true);
        if (showDeleteAllKind === 'Remove All Offers') {
            RemoveAllOffers(props.shop_products_seller, currentUser.uid);
        }
        else if (showDeleteAllKind === 'Delete My Shop') {
            DeleteShop(currentUser.uid);
            DeleteAllProducts(currentUser.uid);
        }
        else if (showDeleteAllKind === 'Delete All Offers') {
            DeleteAllOffers(props.shop_products_seller, currentUser.uid);
        }
        else if (showDeleteAllKind === 'Delete All Products') {
            DeleteAllProducts(currentUser.uid);
        }
        setLoading(false);
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
                return productsA.Products_Price - productB.Products_Price;
            }
        )
        return makeLowestHighest;
    }

    function makeHighestLowest(arrayProducts) {
        let makeHighestLowest = arrayProducts?.sort(
            (productsA, productB) => {
                return productB.Products_Price - productsA.Products_Price;
            }
        )
        return makeHighestLowest;
    }

    const renderOffersSellerProducts = () => {
        let makeOffersShuffel = [];
        props.Shop_Offers.map((prod, i) => {
            makeOffersShuffel.push(<div key={i}>{currentUser && currentUser.uid === props.Shop_Uid ?
                <Product
                    IsInPage
                    Product_Id={props.Shop_Numbers_Offers[i]}
                    IsSellerInPage
                    Product_NewPrice={prod.Product_NewPrice}
                    Product_IsOffer={prod.Product_IsOffer}
                    Product_Name={prod.Product_Name}
                    Product_Img={prod.Product_Img}
                    Product_Kind={prod.Product_Kind}
                    Product_Price={prod.Product_Price}
                    Product_Inbox={prod.Product_Inbox} />
                :
                currentUser && currentUser.uid !== props.Shop_Uid ?
                    <Product
                        Product_NewPrice={prod.Product_NewPrice}
                        Product_IsOffer={prod.Product_IsOffer}
                        Product_Name={prod.Product_Name}
                        Product_Img={prod.Product_Img}
                        Product_Kind={prod.Product_Kind}
                        Product_Price={prod.Product_Price} />
                    :

                    <Product
                        Product_NewPrice={prod.Product_NewPrice}
                        Product_IsOffer={prod.Product_IsOffer}
                        Shop_Uid={props.Shop_Uid}
                        Product_Inbox={prod.Product_Inbox}
                        Product_Id={props.Shop_Numbers_Offers[i]}
                        Customer={true}
                        Product_Name={prod.Product_Name}
                        Product_Img={prod.Product_Img}
                        Product_Kind={prod.Product_Kind}
                        Product_Price={prod.Product_Price} />

            }</div>)
        })
        const shuffeld = makeOffersShuffel;
        const lowestHighest = makeOffersShuffel;
        const highestLowest = makeOffersShuffel;

        const shuffeld1 = shuffle(shuffeld);
        const lowestHighest1 = makeLowestHighest(lowestHighest);
        const highestLowest1 = makeHighestLowest(highestLowest);
        // const shuffeld = makeOffersShuffel shuffle(makeOffersShuffel);
        // const lowestHighest = makeOffersShuffel makeLowestHighest(makeOffersShuffel);
        // const highestLowest = makeOffersShuffel makeHighestLowest(makeOffersShuffel);

        if (sortKindOffers === 'Random') {
            console.log('Random 1')
            return shuffeld1;
        }
        else if (sortKindOffers === 'From lowest price to highest') {
            console.log('From lowest price to highest 1')
            return lowestHighest1;
        }
        else if (sortKindOffers === 'From highest price to lowest') {
            console.log('From highest price to lowest 1')
            return highestLowest1;
        }
        else if (sortKindOffers === 'Normal') {
            console.log('Normal 1')
            return makeOffersShuffel;
        }
    }

    return (
        <div id="Shop_page" className="mt-5">
            {loading && <LoadingSpinner />}

            {
                <div id='Sticky_NavBar' className="d-flex justify-content-between">
                    <div className="Scroll_To_Top"><i onClick={() => { window.scrollTo(0, 0) }} id='Button_To_Top' className="fa-solid fa-arrow-up-from-bracket"></i></div>
                    <div className="Scroll_Options_Kinds">
                        <NavDropdown align="end" title="Shop" id="dropdown-basic">

                            <NavDropdown.Item className='No_hover_DropDown Nav_Kinds_Shop_Page'>
                                <div className="Button_DropDown_List">
                                    <div className="Nav_Drop_Downs_Items_Kinds" onClick={() => { window.scrollTo({ top: scrrollingPlaces.current[0]?.offsetTop - 170 }) }}><div className="me-3">1.</div>Shop</div>
                                    <div className="Nav_Drop_Downs_Items_Kinds" onClick={() => { window.scrollTo({ top: scrrollingPlaces.current[1]?.offsetTop - 170 }) }}><div className="me-3">2.</div>Offers</div>
                                    <div className="Nav_Drop_Downs_Items_Kinds" onClick={() => { window.scrollTo({ top: scrrollingPlaces.current[2]?.offsetTop - 170 }) }}><div className="me-3">3.</div>Products</div>
                                </div>
                            </NavDropdown.Item>

                        </NavDropdown>
                    </div>
                </div>
            }

            {
                !currentUser
                    ?

                    <div>
                        <DropdownButton
                            className="Drop_Down_Cus_Opt mt-4"
                            id='dropdown-button-drop-end'
                            drop='end'
                            variant="primary"
                            title='Customer Options'
                        >
                            <Dropdown.Item eventKey="1" onClick={() => setAddModalShowComment(true)}>Add Comment <i className="fas fa-comment"></i></Dropdown.Item>
                        </DropdownButton>
                        <AddComment
                            isinshop={true}
                            show={addModalShowComment}
                            onHide={() => setAddModalShowComment(false)}
                            shop_uid={props.Shop_Uid}
                            shop_name={props.Shop_Name}
                            shop_img={props.Shop_Img}
                            shop_kind={props.Shop_Kind}
                            shop_disc={props.Shop_Disc}
                            shop_location={props.Shop_Location}
                            shop_inbox={props.Shop_Inbox} />
                    </div>

                    :

                    null

            }

            <div ref={el => (scrrollingPlaces.current[0] = el)}>
                <NavKinds noPadding kind={props.Shop_Name} />
            </div>

            {
                currentUser && currentUser.uid === props.Shop_Uid &&

                <div className="d-flex justify-content-center pb-5">
                    <div className="Shop_Options">
                        <div>
                            <table className="w-100">
                                <tbody>
                                    <tr className="w-100 bg-black Z_Index_Kind_Sort1 Sort_Nav_Products mt-3 mb-3" onClick={() => { handleShowDeleteAll(); setShowDeleteAllKind('Delete My Shop'); }}>
                                        <td className="w-100">Delete My Shop</td>
                                        <td><i className="fa-solid fa-shop-slash m-auto"></i></td>
                                    </tr>
                                    <Link onClick={() => window.scrollTo(0, 0)} to={'/Inbox/Shops/' + props.Shop_Name} className='text-decoration-none'><tr className="w-100 bg-black Z_Index_Kind_Sort1 Sort_Nav_Products mt-3 mb-3">
                                        <td className="w-100">See Inbox Shop</td>
                                        <td><i className="fa-solid fa-inbox m-auto"></i></td>
                                    </tr></Link>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            }

            <div className={`Shop_First_Window d-flex justify-content-between ${!currentUser || currentUser && currentUser.uid !== props.Shop_Uid && ' mt-5'}`}>
                <div className="Shop_Proprties w-50 p-4">
                    <div><div className="fa-solid fa-address-card Icons_Shop_Page_Info" /> Name : {props.Shop_Name}</div>
                    <div><div className="fa-sharp fa-solid fa-shop Icons_Shop_Page_Info" /> Kind : {props.Shop_Kind}</div>
                    <div><div className="fa-solid fa-location-dot Icons_Shop_Page_Info" /> Location : {props.Shop_Location}</div>
                    <div className="Discrption_Shop_Page w-100"><div className="fa-solid fa-info Icons_Shop_Page_Info" /> Discrption : {props.Shop_Disc?.slice(0, 500)}</div>
                </div>

                <div className="w-50 h-25">
                    <img id='Image_Shop_Page' className="w-100 h-25" src={props.Shop_Img} />
                </div>

            </div>
            {
                console.log(sortKindOffers)
            }

            <div className="mt-5">

                {
                    props.Shop_Offers.length
                        ?
                        <>
                            <div ref={el => (scrrollingPlaces.current[1] = el)}>
                                <NavKinds noPadding kind={'Offers'} />
                            </div>

                            {


                                <div className="d-flex justify-content-center">
                                    <div className="Shop_Options">
                                        {
                                            currentUser && currentUser.uid === props.Shop_Uid &&
                                            <div>
                                                <table className="w-100">
                                                    <tbody>
                                                        <tr className="w-100 bg-black Z_Index_Kind_Sort1 Sort_Nav_Products mt-3 mb-3" onClick={() => { handleShowDeleteAll(); setShowDeleteAllKind('Remove All Offers'); }}>
                                                            <td className="w-100">Remove All Offers</td>
                                                            <td><i className="fa-solid fa-minus m-auto"></i></td>
                                                        </tr>
                                                        <tr className="w-100 bg-black Z_Index_Kind_Sort1 Sort_Nav_Products mt-3 mb-3" onClick={() => { handleShowDeleteAll(); setShowDeleteAllKind('Delete All Offers'); }}>
                                                            <td className="w-100">Delete All Offers</td>
                                                            <td><i className="fa-solid fa-trash m-auto"></i></td>
                                                        </tr>
                                                        <Link onClick={() => window.scrollTo(0, 0)} to={'/Inbox/Products/' + props.Shop_Name} className='text-decoration-none'><tr className="w-100 bg-black Z_Index_Kind_Sort1 Sort_Nav_Products mt-3 mb-3">
                                                            <td className="w-100">See Inbox Products</td>
                                                            <td><i className="fa-solid fa-inbox m-auto"></i></td>
                                                        </tr></Link>
                                                    </tbody>
                                                </table>
                                            </div>
                                        }
                                        <div className="d-flex">
                                            <Dropdown className="w-100 Z_Index_Kind_Sort">
                                                <Dropdown.Toggle className="w-100 bg-black Z_Index_Kind_Sort1">
                                                    <div className="Sort_Nav_Products"><div>Sort Products</div> <div className="fa-solid fa-sort mt-1" /></div>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => setSortKindOffers('Normal')} className='text-primary'><div className="fa-solid fa-sort m-auto pe-2" />Normal</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setSortKindOffers('Random')} className='text-primary' ><div className="fa-solid fa-sort m-auto pe-2" />Random</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setSortKindOffers('From lowest price to highest')} className='text-primary'><div className="fa-solid fa-sort m-auto pe-2" />From lowest price to highest</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setSortKindOffers('From highest price to lowest')} className='text-primary' ><div className="fa-solid fa-sort m-auto pe-2" />From highest price to lowest</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>

                            }

                            <div className="container_Products_Shops mt-3">
                                <SortProducts ids_prods={props.Shop_Numbers_Offers} products={props.Shop_Offers} Shop_Uid={props.Shop_Uid} sort_kind={sortKindOffers} />
                            </div>
                        </>
                        :
                        null
                }


            </div>

            <div className="Shop_Products mt-3">
                <div ref={el => (scrrollingPlaces.current[2] = el)}>
                    <NavKinds noPadding kind={'Products'} />
                </div>

                <div className="d-flex justify-content-center">
                    <div className="Shop_Options">
                        {
                            currentUser && currentUser.uid === props.Shop_Uid &&
                            <div>
                                <table className="w-100">
                                    <tbody>
                                        <tr className="w-100 bg-black Z_Index_Kind_Sort1 Sort_Nav_Products mt-3 mb-3" onClick={() => setAddModalShow(true)}>
                                            <td className="w-100">Add Product </td>
                                            <td><i className="fa-solid fa-plus m-auto"></i></td>
                                        </tr>
                                        <tr className="w-100 bg-black Z_Index_Kind_Sort1 Sort_Nav_Products mt-3 mb-3" onClick={() => { handleShowDeleteAll(); setShowDeleteAllKind('Delete All Products'); }}>
                                            <td className="w-100">Delete All Products</td>
                                            <td><i className="fa-solid fa-trash m-auto"></i></td>
                                        </tr>
                                        <Link onClick={() => window.scrollTo(0, 0)} to={'/Inbox/Products/' + props.Shop_Name} className='text-decoration-none'><tr className="w-100 bg-black Z_Index_Kind_Sort1 Sort_Nav_Products mt-3 mb-3">
                                            <td className="w-100">See Inbox</td>
                                            <td><i className="fa-solid fa-inbox m-auto"></i></td>
                                        </tr></Link>
                                    </tbody>
                                </table>
                            </div>
                        }
                        <div className="d-flex">
                            <Dropdown className="w-100 Z_Index_Kind_Sort">
                                <Dropdown.Toggle className="w-100 bg-black Z_Index_Kind_Sort1">
                                    <div className="Sort_Nav_Products"><div>Sort Products</div> <div className="fa-solid fa-sort mt-1" /></div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setSortKind('Normal')} className='text-primary'><div className="fa-solid fa-sort m-auto pe-2" />Normal</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSortKind('Random')} className='text-primary' ><div className="fa-solid fa-sort m-auto pe-2" />Random</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSortKind('From lowest price to highest')} className='text-primary'><div className="fa-solid fa-sort m-auto pe-2" />From lowest price to highest</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSortKind('From highest price to lowest')} className='text-primary' ><div className="fa-solid fa-sort m-auto pe-2" />From highest price to lowest</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                    </div>
                </div>

                <Modal className='bg-primary bg-opacity-10' show={showDeleteAll} onHide={handleCloseDeleteAll}
                    centered aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header className='text-center bg-black text-white'>
                        <Modal.Title className='w-100'>{showDeleteAllKind}</Modal.Title>
                        <CloseButton variant="white" onClick={handleCloseDeleteAll} />
                    </Modal.Header>

                    <Modal.Body>
                        {
                            showDeleteAllKind === 'Delete All Products'
                                ?
                                <p>are you shure that you want to delete All the Products from the shop!?</p>
                                :
                                showDeleteAllKind === 'Delete All Offers'
                                    ?
                                    <p>are you shure that you want to delete All the Offers of the products from the shop!?</p>
                                    :
                                    showDeleteAllKind === 'Remove All Offers'
                                        ?
                                        <p>are you shure that you want to remove All the Offers of the products!?</p>
                                        :
                                        <p>Are you shure that you want to delete your shop!? <br />Thats mean your shop and products will be delete from the site.</p>
                        }
                    </Modal.Body>

                    <Modal.Footer>
                        <Button className='border_All_Buttons_BS' variant="secondary" onClick={handleCloseDeleteAll}>
                            Cancel
                        </Button>
                        <Button className='border_All_Buttons_BS' variant="danger" onClick={() => { deleteAllProducts(); handleCloseDeleteAll() }}>
                            {
                                showDeleteAllKind === 'Remove All Offers' ?
                                    <>Remove</>
                                    :
                                    <>Delete</>
                            }
                        </Button>
                    </Modal.Footer>
                </Modal>

                <AddProduct shop_name={props.Shop_Name} shop_kind={props.Shop_Kind} show={addModalShow} onHide={() => setAddModalShow(false)} />

                <div>
                    {
                        props.shop_products_seller?.length && !currentUser || currentUser && currentUser.uid !== props.shop_uid ? <ShowProducts sort_kind={sortKind} Shop_Name={props.Shop_Name} Shop_Uid={props.Shop_Uid} IsInPage={true} />
                            :
                            <div>Sorry the shop does not have any products right now come back as soon!.</div>
                    }
                </div>
            </div>

        </div>
    )
}






