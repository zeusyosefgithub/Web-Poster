import React, { useRef,useState } from 'react';
import { Modal, Button, Row, Col, Form, ModalTitle,CloseButton,Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { GetProducts,AddProducts } from '../../Collections/ProductsCollection';
import Product from '../Product/Product';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default function AddProduct(props) {

    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [Img,setImg] = useState('');

    const Product_NameRef = useRef();
    const Product_PricedRef = useRef();
    const Product_KindRef = useRef();
    const Product_ImgRef = useRef();

    const [error,setError] = useState('');
    const [errorStatus,setErrorStatus] = useState('');
    const [buttonStatus,setButtonStatus] = useState(true);

    const { currentUser } = useAuth();

    const products = GetProducts();

    const [loading,setLoading] = useState(false);

    function checkImage(url) {
        const img = new Image();
        img.src = url;
        if (img.complete) {
          setError('');
          setButtonStatus(false);
        }
        else if (url === '') {
          setError('');
        }
        else {
          img.onload = () => {
            setError('');
            setButtonStatus(false);
          };
          img.onerror = () => {
            setButtonStatus(true);
            setError('filed to load the image, try another one...');
          };
        }
    }

    const checkValues = () => {
        
        if(!Product_NameRef.current.value || !Product_PricedRef.current.value || !Product_ImgRef.current.value){       
            return setButtonStatus(true);
        }
        else{              
            return checkImage(Product_ImgRef.current.value) 
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        let allProductsSeller = [];
        products.map((prods) => {
            if(prods.id === currentUser.uid){
                allProductsSeller = prods.Products
            }
        })
        const Product = {
            Product_Name : Product_NameRef.current.value,
            Product_Price : Product_PricedRef.current.value,
            Product_Kind : Product_KindRef.current.value,
            Product_Img : Product_ImgRef.current.value,
            Product_Inbox : [],
            Product_IsOffer : false,
            Product_NewPrice: null
        } 
        AddProducts(currentUser.uid,Product,allProductsSeller);
        setName('');setPrice('');setImg('');
        setLoading(false);
        return props.onHide();

    }


    return (
        <div className="container">
            {loading && <LoadingSpinner/>}
            <Modal {...props} size='lg' aria-labelledby="contained-modal-title-center" className='bg-primary bg-opacity-10' centered>
                <Modal.Header id="madal_info" className='text-center bg-black text-white btn-white'>
                    <Modal.Title className='w-100'>
                        <h3>Add Product to {props.shop_name}</h3>
                    </Modal.Title>
                    <CloseButton onClick={() => {props.onHide();setName('');setPrice('');setImg('');}} variant='white' />
                </Modal.Header>
                <Modal.Body>
                    <Row >
                        <Col className='d-flex justify-content-center'>
                            {
                                
                            }
                        </Col>                      
                    </Row>
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
                                    <Form.Control className='border-primary' value={name} onChange={(e) => {checkValues();setName(e.target.value.slice(0,12))}} type="text" ref={Product_NameRef} placeholder="Name..." />
                                </Form.Group>

                                <Form.Group className='m-1'>
                                    <Form.Label id="madal_labels">Price</Form.Label>
                                    <Form.Control className='border-primary' value={price} onChange={(e) => {checkValues();setPrice(e.target.value.slice(0,5))}} type="number" ref={Product_PricedRef} placeholder="Price..." />
                                </Form.Group>

                                <Form.Group className='m-1'>
                                    <Form.Label id="madal_labels">Kind</Form.Label>
                                    <Form.Control className='border-primary' type="text" ref={Product_KindRef} required placeholder="Product Kind"
                                        disabled
                                        defaultValue={props.shop_kind} />
                                </Form.Group>

                                <Form.Group className='m-1'>
                                    <Form.Label id="madal_labels" >Image
                                        {!errorStatus && Img.length > 0
                                            ?
                                            <>
                                                <br />
                                                <span className='text-danger'>{error}</span>
                                            </>
                                            :
                                            null
                                        }
                                    </Form.Label>
                                    <Form.Control value={Img}  className={error ? 'border-danger' : 'border-primary'} onChange={(e) => { checkValues(); setImg(e.target.value);}} type="text" ref={Product_ImgRef} placeholder="Image..." />
                                </Form.Group>

                                <Form.Group className='d-flex justify-content-center'>
                                    <Button disabled={buttonStatus} className='border_All_Buttons_BS m-2 mt-3' variant="primary" type="submit">
                                        Add Product
                                    </Button>
                                </Form.Group>

                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='border_All_Buttons_BS' variant="secondary" onClick={() => {props.onHide();setName('');setPrice('');setImg('');}}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}