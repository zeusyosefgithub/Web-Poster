import React, { useState,useRef } from 'react';
import { Modal, Button, Row, Col, Form, CloseButton } from 'react-bootstrap';
import { UpdateShop } from '../../Collections/ShopsCollection';
import { GetProductsSellerId, UpdateProduct } from '../../Collections/ProductsCollection';
import { GetProducts } from '../../Collections/ProductsCollection';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default function AddComment(props) {   

    const [comment,setComment] = useState('');
    const commentRef = useRef();

    const [errorStatus, setErrorStatus] = useState(true);
    const [error,setError] = useState('');

    const Products = GetProducts();

    const [loading,setLoading] = useState(false);

    const checkComment = (value) => {
        if(value === ''){
            setError('');
            setErrorStatus(true);
        }
        else if(value.length <= 10){
            setError('the comment most be more than 10 letters ...');
            setErrorStatus(true);
        }
        else{
            setError('');
            setErrorStatus(false)
        }
    }

    const handleSubmitShop = async(event) => {
        event.preventDefault();     
        setLoading(true);
        let New_Inbox = props.shop_inbox;
        New_Inbox.push(commentRef.current.value);
        const newvalue = {
            Shop_Disc : props.shop_disc,
            Shop_Img : props.shop_img,
            Shop_Inbox : New_Inbox,
            Shop_Kind : props.shop_kind,
            Shop_Location : props.shop_location,
            Shop_Name : props.shop_name
        }
        await fetch("/AddCommentShop", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ id: props.shop_uid, NewValue: newvalue })
        })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
        },
        (error) => {
            console.log(error);
        });
        setLoading(false);
        setError('');
        setComment('');
        setErrorStatus(true);
        props.onHide();
    }

    const handleSubmitProduct = async(event) => {
        event.preventDefault();
        setLoading(true);
        let products = GetProductsSellerId(Products, props.shop_uid);
        let New_Inbox = props.product_inbox;
        New_Inbox.push(commentRef.current.value);
        const newvalue = {
            Product_Img : props.product_img,
            Product_Inbox : New_Inbox,
            Product_Kind : props.product_kind,
            Product_Name : props.product_name,
            Product_Price : props.product_price,
            Product_NewPrice : props.product_newprice,
            Product_IsOffer : props.product_isoffer
        }
        products[props.product_id] = newvalue;
        await fetch("/AddCommentProduct", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ id: props.shop_uid, NewValue: products })
        })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
        },
        (error) => {
            console.log(error);
        });
        setLoading(false);
        setError('');
        setComment('');
        setErrorStatus(true);
        props.onHide();
    }

    return (
        <div>
            <Modal {...props} size='lg' aria-labelledby="contained-modal-title-center" className='bg-primary bg-opacity-10' centered >
                <Modal.Header id="madal_info" className='text-center bg-black text-white btn-white'>
                    <Modal.Title className='w-100'>
                        <h3>Add Comment For {props.isinshop ? " Shop " + props.shop_name : " Product " + props.product_name}</h3>
                    </Modal.Title>

                    <CloseButton onClick={() => {
                        props.onHide();
                        setComment('');
                    }} variant='white' />

                </Modal.Header>
                {loading && <LoadingSpinner/>}
                <Modal.Body>
                    <Form onSubmit={props.isinshop ? handleSubmitShop : handleSubmitProduct} className="align-items-center">

                        <Form.Group className='d-flex justify-content-start p-3'>
                            <Form.Label className='w-25'>Comment : </Form.Label>
                            <textarea className={error ? 'border-danger w-100 h-100 pb-5' : 'border-primary w-100 h-100 pb-5'}
                                onChange={(e) => {checkComment(e.target.value);setComment(e.target.value)}}
                                value={comment}
                                ref={commentRef}
                                placeholder='Add Comment ...'
                            >
                            </textarea>
                        </Form.Group>

                        {
                            error && <p className='text-danger'>{error}</p>
                        }

                        <Form.Group className='d-flex justify-content-center'>
                            <Button disabled={errorStatus} className='border_All_Buttons_BS m-2' variant="primary" type="submit">
                                Add Comment
                            </Button>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="danger" className='border_All_Buttons_BS' onClick={() => {
                        setComment('');
                        setErrorStatus(false);
                        props.onHide();
                    }}>Close</Button>

                </Modal.Footer>
            </Modal>
        </div>
    )

}