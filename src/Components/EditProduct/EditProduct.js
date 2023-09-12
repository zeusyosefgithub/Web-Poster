import React, { useState,useRef, useEffect } from 'react';
import { Modal, Button, Row, Col, Form, CloseButton } from 'react-bootstrap';
import './EditProduct.css';
import { GetProducts } from '../../Collections/ProductsCollection';
import { UpdateProduct } from '../../Collections/ProductsCollection';
import { useAuth } from '../../contexts/AuthContext';
import Product from '../Product/Product';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default function EditProduct(props) {
    
    const [name,setName] = useState({...props.product_name});
    const [price,setPrice] = useState({...props.product_price});
    const [Img,setImg] = useState({...props.product_img});

    const Product_NameRef = useRef();
    const Product_PricedRef = useRef();
    const Product_KindRef = useRef();
    const Product_ImgRef = useRef();

    const [error,setError] = useState('');
    const [errorStatus,setErrorStatus] = useState(false);
    const [buttonStatus,setButtonStatus] = useState(false);

    const { currentUser } = useAuth();

    const products = GetProducts();

    const[loading,setLoading] = useState(false);

    useEffect(() => {
        setName(props.product_name);
        setPrice(props.product_price);
        setImg(props.product_img);
    },[props.product_name,props.product_price,props.product_img])

    function checkImage(url) {
        const img = new Image();
        img.src = url;
        if (img.complete) {
            setError('');
            setErrorStatus(true);
            setButtonStatus(false);
            return true;
        }
        else {
            img.onload = () => {
                setError('');
                setErrorStatus(true)
                setButtonStatus(false);
                return true;
            };
            img.onerror = () => {
                setErrorStatus(false);
                setButtonStatus(true);
                setError('filed to load the image, try another one...');
                return false;
            };
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        let allProductsSeller = [];
        products.map((prods) => {
            if (prods.id === currentUser.uid) {
                allProductsSeller = prods.Products
            }
        })
        const NewValue = {
            Product_Name: Product_NameRef.current.value,
            Product_Price: Product_PricedRef.current.value,
            Product_Kind: Product_KindRef.current.value,
            Product_Img: Product_ImgRef.current.value,
            Product_Inbox : props.product_inbox,
            Product_IsOffer : props.product_isoffer,
            Product_NewPrice : props.product_newprice

        }
        UpdateProduct(currentUser.uid, props.product_id, allProductsSeller, NewValue);
        setLoading(false);
        return props.onHide();
    }

    return (
        <div>
            <Modal {...props} size='lg' aria-labelledby="contained-modal-title-center" className='bg-primary bg-opacity-10' centered >
                <Modal.Header id="madal_info" className='text-center bg-black text-white btn-white'>
                    <Modal.Title className='w-100'>
                        <h3>Edit Product {props.product_name}</h3>
                    </Modal.Title>

                    <CloseButton onClick={() => {
                        props.onHide();
                        setName(props.product_name);
                        setPrice(props.product_price);
                        setImg(props.product_img);                      
                    }} variant='white' />

                </Modal.Header>
                {loading && <LoadingSpinner/>}
                <Modal.Body>
                    <Row>
                        <Col id="Product_Change_Details">
                            <Product
                                NoHover={true}
                                Product_Name={name}
                                Product_Img={Img}
                                Product_Price={price}
                            />
                        </Col>
                        <Col>
                            <Form onSubmit={handleSubmit} className="align-items-center">

                                <Form.Group className='m-1'>
                                    <Form.Label id="madal_labels">Name</Form.Label>
                                    <Form.Control className='border-primary' type="text"
                                        onChange={(e) => setName(e.target.value.slice(0,12))}
                                        value={name}
                                        ref={Product_NameRef}
                                        placeholder='Name...'
                                        required />
                                </Form.Group>

                                <Form.Group className='m-1'>
                                    <Form.Label id="madal_labels">Price</Form.Label>
                                    <Form.Control className='border-primary' type="number"
                                        onChange={(e) => setPrice(e.target.value.slice(0,5))}
                                        value={price}
                                        ref={Product_PricedRef}
                                        placeholder='Price...'
                                        required />
                                </Form.Group>

                                <Form.Group className='m-1'>
                                    <Form.Label id="madal_labels">Kind</Form.Label>
                                    <Form.Control className='border-primary' type="text"
                                        disabled
                                        defaultValue={props.product_kind}
                                        ref={Product_KindRef}
                                        required />
                                </Form.Group>

                                <Form.Group className='m-1'>
                                    <Form.Label id="madal_labels">Image
                                        {!errorStatus && Img?.length > 0
                                            ?
                                            <>
                                                <br />
                                                <span className='text-danger'>{error}</span>
                                            </>
                                            :
                                            null
                                        }
                                    </Form.Label>
                                    <Form.Control className={error ? 'border-danger w-75' : 'border-primary w-75'}
                                        type="text"
                                        onChange={(e) => checkImage(e.target.value)}
                                        defaultValue={props.product_img}
                                        ref={Product_ImgRef}
                                        placeholder='Image...'
                                        required />
                                </Form.Group>

                                <Form.Group className='d-flex justify-content-center'>
                                    <Button disabled={buttonStatus} className='border_All_Buttons_BS m-2 mt-3' variant="primary" type="submit">
                                        Update Product
                                    </Button>
                                </Form.Group>

                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>

                    <Button className='border_All_Buttons_BS' variant="secondary" onClick={() => {
                        setError('');
                        setErrorStatus(false);
                        props.onHide();
                        setName(props.product_name);
                        setPrice(props.product_price);
                        setImg(props.product_img);
                    }}>Close</Button>

                </Modal.Footer>
            </Modal>
        </div>
    )

}