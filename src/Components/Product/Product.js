import React, { useState } from "react";
import EditProduct from "../EditProduct/EditProduct";
import './Product.css';
import { DeleteProduct, GetProducts, UpdateProduct } from "../../Collections/ProductsCollection";
import { useAuth } from "../../contexts/AuthContext";
import { Modal, Button, Form , CloseButton } from "react-bootstrap";
import AddComment from "../AddComment/AddComment";
import { useRef } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Product(props) {

    const [editModalShow, setEditModalShow] = useState(false);
    const editModalClose = () => setEditModalShow(false);

    const [addModalShowComment, setAddModalShowComment] = useState(false);

    const { currentUser } = useAuth();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [kind, setKind] = useState('');
    const [img, setImg] = useState('');

    const products = GetProducts();

    const [loading,setLoading] = useState(false);



    const deleteProduct = () => {
        setLoading(true);
        let allProductsSeller = [];
        products.map((prods) => {
            if (prods.id === currentUser.uid) {
                allProductsSeller = prods.Products;
            }
        })
        DeleteProduct(currentUser.uid, props.Product_Id, allProductsSeller);
        return setLoading(false);
    }

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const [showMakeOffer, setShowMakeOffer] = useState(false);
    const handleCloseMakeOffer = () => setShowMakeOffer(false);
    const handleShowMakeOffer = () => setShowMakeOffer(true);

    const [makeOffer, setMakeOffer] = useState('');
    const [errorMakeOffer,setErrorMakeOffer] = useState('');
    const [biggestCurrentPrice,setBiggestCurrentPrice] = useState(false);
    const makeOfferRef = useRef();
    const [errrorMakeOfferButton, setErrrorMakeOfferButton] = useState(true);
    const [isRemoveOffer, setIsRemoveOffer] = useState(false);

    const CheckNewPriceValue = () => {
        if (!makeOfferRef.current.value) {
            setBiggestCurrentPrice(false);
            setErrorMakeOffer('');
            return setErrrorMakeOfferButton(true);
        }
        if(parseFloat(makeOfferRef.current.value) > parseFloat(props.Product_Price) - 1){
            setBiggestCurrentPrice(true);
            setErrorMakeOffer('you must type new price that biggest from the old one...');
            return setErrrorMakeOfferButton(true);
        }
        setBiggestCurrentPrice(false);
        setErrorMakeOffer('');
        return setErrrorMakeOfferButton(false);
    }

    const handelSubmitMakeOffer = (e) => {
        e.preventDefault();
        setLoading(true);
        let allProductsSeller = [];
        products.map((prods) => {
            if (prods.id === currentUser.uid) {
                allProductsSeller = prods.Products;
            }
        })
        const NewProduct = {
            Product_Name: props.Product_Name,
            Product_Price: props.Product_Price,
            Product_Kind: props.Product_Kind,
            Product_Img: props.Product_Img,
            Product_Inbox: props.Product_Inbox,
            Product_IsOffer: true,
            Product_NewPrice: makeOfferRef.current.value
        }
        UpdateProduct(currentUser.uid, props.Product_Id, allProductsSeller, NewProduct);
        setLoading(false);
        handleCloseMakeOffer(); setMakeOffer(''); setIsRemoveOffer(false);
    }

    const handelRemoveMakeOffer = (e) => {
        e.preventDefault();
        setLoading(true);
        let allProductsSeller = [];
        products.map((prods) => {
            if (prods.id === currentUser.uid) {
                allProductsSeller = prods.Products;
            }
        })
        const NewProduct = {
            Product_Name: props.Product_Name,
            Product_Price: props.Product_Price,
            Product_Kind: props.Product_Kind,
            Product_Img: props.Product_Img,
            Product_Inbox: props.Product_Inbox,
            Product_IsOffer: false,
            Product_NewPrice: null
        }
        UpdateProduct(currentUser.uid, props.Product_Id, allProductsSeller, NewProduct);
        setLoading(false);
        handleCloseMakeOffer(); setMakeOffer(''); setIsRemoveOffer(false);
    }

    const IsOwned = () => {
        let allProductsSeller = [];
        products.map((prods) => {
            if (currentUser && prods.id === currentUser.uid) {
                allProductsSeller = prods.Products;
            }
        })
        let res = false;
        allProductsSeller.map((prod) => {
            if (prod.Product_Name === props.Product_Name &&
                prod.Product_Price === props.Product_Price &&
                prod.Product_Kind === props.Product_Kind &&
                prod.Product_Img === props.Product_Img &&
                prod.Product_IsOffer === props.Product_IsOffer &&
                prod.Product_NewPrice === props.Product_NewPrice) {
                res = true;
            }
        })
        return !props.IsInPage && res 
        ?
        'Owned_Product'
        :
        null
    }

    return (
        <>
            {loading && <LoadingSpinner/>}
            <div className={props.NoHover ? 'ProductNoHover' : 'Product'}>

                <div>
                    <div id={IsOwned()} className="d-flex justify-content-between p-3">


                        <div >
                            {
                                props.IsInPage
                                    ?
                                    <>
                                        <span
                                            onClick={() => {
                                                setEditModalShow(true);
                                                setName(props.Product_Name);
                                                setPrice(props.Product_Price);
                                                setKind(props.Product_Kind);
                                                setImg(props.Product_Img);
                                            }}>
                                            <i id='Icons_Product_Edit' className="fas fa-edit"></i>
                                        </span>
                                        <EditProduct
                                            show={editModalShow}
                                            onHide={editModalClose}
                                            product_id={props.Product_Id}
                                            product_name={name}
                                            product_price={price}
                                            product_kind={kind}
                                            product_img={img}
                                            product_inbox={props.Product_Inbox}
                                            product_newprice={props.Product_NewPrice}
                                            product_isoffer={props.Product_IsOffer} />
                                    </>
                                    :
                                    null
                            }
                        </div>
                        <div className="d-flex">
                            <div><h5>{(props.Product_Name)?.slice(0, 8)}</h5></div>
                            {
                                props.Customer ?
                                    <div className="ps-5"><span onClick={() => setAddModalShowComment(true)} id='Span_Comment_Product' className="fas fa-comment" /></div>
                                    :
                                    null
                            }
                            <AddComment
                                show={addModalShowComment}
                                onHide={() => setAddModalShowComment(false)}
                                shop_uid={props.Shop_Uid}
                                product_id={props.Product_Id}
                                product_name={props.Product_Name}
                                product_inbox={props.Product_Inbox}
                                product_img={props.Product_Img}
                                product_kind={props.Product_Kind}
                                product_price={props.Product_Price}
                                product_newprice={props.Product_NewPrice}
                                product_isoffer={props.Product_IsOffer} />
                        </div>

                        <div>
                            {
                                props.IsInPage
                                    ?
                                    <>
                                        <span
                                            onClick={handleShowDelete}>
                                            <i id="Icons_Product_Trash" className="fa-solid fa-trash"></i>
                                        </span>
                                        <Modal className='bg-primary bg-opacity-10' show={showDelete} onHide={handleCloseDelete}
                                            centered aria-labelledby="contained-modal-title-vcenter">
                                            <Modal.Header className='text-center bg-black text-white'>
                                                <Modal.Title className='w-100'>Delete Product {props.Product_Name}</Modal.Title>
                                                <CloseButton variant="white" onClick={handleCloseDelete}/>
                                            </Modal.Header>
                                            {loading && <LoadingSpinner/>}
                                            <Modal.Body>are you shure that you want to delete {props.Product_Name} from the shop!?</Modal.Body>
                                            <Modal.Footer>
                                                <Button className='border_All_Buttons_BS' variant="secondary" onClick={handleCloseDelete}>
                                                    Cancel
                                                </Button>
                                                <Button className='border_All_Buttons_BS' variant="danger" onClick={() => { deleteProduct(); handleCloseDelete() }}>
                                                    Delete
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </>
                                    :
                                    null
                            }
                        </div>

                    </div>
                </div>

                <div id='MUltiple_Img_With_Offer' className="d-flex justify-content-center">
                    <img id='inner_image' className="Product_Img" src={props.Product_Img} />
                    {
                        props.Product_IsOffer && <img className="lady-image" src="http://cdn.onlinewebfonts.com/svg/img_553330.png" />
                    }
                    {
                        IsOwned() && <div className="lady-text">Owned</div>
                    }
                </div>



                <div id={IsOwned() + '_bottom'} className={`d-flex justify-content-${props.IsSellerInPage ? 'between' : 'center'} p-2`}>

                    {
                        props.IsInPage
                            ?
                            <>
                                <div>
                                    {
                                        props.Product_IsOffer
                                            ?
                                            <img onClick={() => { setIsRemoveOffer(true); handleShowMakeOffer() }} className="Icon_Offer_Remove" src="https://cdn.iconscout.com/icon/premium/png-256-thumb/special-offers-2667400-2212388.png" />
                                            :
                                            <img onClick={handleShowMakeOffer} className="Icon_Offer" src="https://cdn.iconscout.com/icon/premium/png-256-thumb/special-offers-2667400-2212388.png" />
                                    }

                                </div>
                                <Modal className='bg-primary bg-opacity-10' show={showMakeOffer} onHide={() => { setIsRemoveOffer(false); handleCloseMakeOffer(); setMakeOffer('') }}
                                    centered aria-labelledby="contained-modal-title-vcenter">
                                    <Modal.Header className='text-center bg-black text-white'>
                                        <Modal.Title className='w-100'>{isRemoveOffer ? 'Remove ' + props.Product_Name + ' from offer' : 'Make ' + props.Product_Name + ' in Offer'}</Modal.Title>
                                        <CloseButton variant="white" onClick={() => { setIsRemoveOffer(false); handleCloseMakeOffer(); setMakeOffer('')}}/>
                                    </Modal.Header>
                                    {loading && <LoadingSpinner/>}
                                    <Modal.Body>

                                        {
                                            isRemoveOffer
                                                ?
                                                <Form onSubmit={handelRemoveMakeOffer}>

                                                    <Form.Group className='d-flex justify-content-start p-4'>
                                                        <Form.Label>are you sure that you want to remove the offer for product {props.Product_Name} and return the price from {props.Product_NewPrice} to the old {props.Product_Price}</Form.Label>
                                                    </Form.Group>

                                                    <Form.Group className='d-flex justify-content-center p-4'>
                                                        <Button className='border_All_Buttons_BS' type='submit' variant="primary">
                                                            Remove Offer
                                                        </Button>
                                                    </Form.Group>

                                                </Form>

                                                :
                                                <Form onSubmit={handelSubmitMakeOffer}>

                                                    <Form.Label className={biggestCurrentPrice ? 'text-danger' : 'text-primary'}>Current Price : {props.Product_Price}</Form.Label>
                                                    <Form.Group className='d-flex justify-content-between p-4'>                     
                                                        <Form.Label className='w-25 m-auto'>New Price :</Form.Label>
                                                        <Form.Control ref={makeOfferRef} className='border-primary' type="number" value={makeOffer} onChange={(e) => { setMakeOffer(e.target.value.slice(0, 5)); CheckNewPriceValue() }} />
                                                    </Form.Group>

                                                    {
                                                        errorMakeOffer 
                                                        ?
                                                        <p className="text-danger">{errorMakeOffer}</p>
                                                        :
                                                        null 
                                                    }

                                                    <Form.Group className='d-flex justify-content-center p-4'>
                                                        <Button className='border_All_Buttons_BS' disabled={errrorMakeOfferButton} type='submit' variant="primary">
                                                            Make Offer
                                                        </Button>
                                                    </Form.Group>

                                                </Form>
                                        }



                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button className='border_All_Buttons_BS' variant="secondary" onClick={() => { setIsRemoveOffer(false); handleCloseMakeOffer(); setMakeOffer('') }}>
                                            Cancel
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </>

                            :
                            null
                    }

                    {
                        props.Product_IsOffer
                            ?
                            <div className="d-flex justify-content-around w-100">
                                <h6 id={IsOwned() && 'Collering_Owned_Products'} className="d-flex text-primary"><p className="New_Old_Price">New&nbsp;</p> ₪{props.Product_NewPrice}</h6>
                                <h6 id={IsOwned() && 'Collering_Owned_Products'} className='d-flex text-danger'><p className="New_Old_Price">Old&nbsp;</p>₪{props.Product_Price}</h6>
                            </div>
                            :
                            <h6>₪{props.Product_Price}</h6>
                    }

                </div>

            </div>
        </>
    )

}

