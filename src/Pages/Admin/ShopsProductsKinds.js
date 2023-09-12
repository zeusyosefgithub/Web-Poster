import React, { useState,useRef } from 'react';
import { Button, Modal, CloseButton, Form } from 'react-bootstrap';
import { GetShopsProducts } from '../../Collections/ShopsProductsCollection';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';

export default function ShopsProductsKinds(props) {

    const shopsProducts = GetShopsProducts()[0]?.Kinds;
    const [showModal, setShowModal] = useState(false);
    const [modalKind, setModalKind] = useState('');
    const [currentKind, setCurrentKind] = useState('');
    const [loading, setLoading] = useState(false);

    const [newKind,setNewKind] = useState('');
    const newKindRef = useRef();

    const DeleteAddKind = async () => {
        let newvalue = [];
        shopsProducts.map((kind) => {
            if (kind !== currentKind) {
                newvalue.push(kind);
            }
        })
        setLoading(true);
        if (modalKind === 'Delete') {
            await fetch("/deleteShopsProductsKinds", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ NewValue: newvalue })
            })
                .then(res => res.json())
                .then((result) => {
                    console.log(result);
                },
                    (error) => {
                        console.log(error);
                    });
        }
        else if (modalKind === 'Add') {
            let newvalue = shopsProducts;
            newvalue.push(newKindRef.current.value);
            await fetch("/AddShopsProductsKinds", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ NewValue: newvalue })
            })
                .then(res => res.json())
                .then((result) => {
                    console.log(result);
                },
                    (error) => {
                        console.log(error);
                    });
        }
        setLoading(false);
    }

    return (
        <div className='List_Admins'>
            {loading && <LoadingSpinner />}
            <div className='d-flex justify-content-around mb-5 mt-1 Options_Sellers_List'>
                <Button onClick={() => { setShowModal(true); setModalKind('Add') }} className='Add_Kind_Admin_Panel'>Add Kind</Button>
                <div className='m-auto h5'>Totl Kinds : {shopsProducts?.length}</div>
            </div>
            {
                shopsProducts?.map((kind, i) => {
                    return <div key={i} className='Seller_Box_List ShopsProductsKinds_Box'>
                        <div className='d-flex Kind_Shops_Kinds'>{i + 1}.<div className='ms-4'>{kind}</div></div>
                        <div onClick={() => { setShowModal(true); setModalKind('Delete'); setCurrentKind(kind); }} className="fa-solid fa-trash Trash_Span_Shops_Products_Kinds mt-2" />
                    </div>
                })
            }
            <Modal className='bg-primary bg-opacity-10' show={showModal} onHide={() => { setShowModal(false) }}
                centered aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header className='text-center bg-black text-white'>
                    <Modal.Title className='w-100'>{modalKind === 'Delete' ? "Delete Kind " + currentKind : "Add Kind"}</Modal.Title>
                    <CloseButton variant="white" onClick={() => { setShowModal(false) }} />
                </Modal.Header>

                <Modal.Body>
                    {
                        modalKind === 'Delete'
                            ?
                            <p>are you shure that you want to delete {currentKind} kind from the shop!?</p>
                            :
                            modalKind === 'Add'
                                ?
                                <Form>
                                    <Form.Group className='d-flex mt-3'>
                                        <Form.Label className='m-auto w-50'>New kind :</Form.Label>
                                        <Form.Control className={'border-primary'}
                                            ref={newKindRef}
                                            value={newKind}
                                            placeholder='New Kind...'
                                            onChange={(e) => { setNewKind(e.target.value.slice(0, 20));}}
                                            type="text"
                                        />
                                    </Form.Group>
                                    <div className='d-flex mt-5'>
                                        <div className='text-danger'>Note : </div>&nbsp;the new kind after adding will be available in all the site.
                                    </div>
                                </Form>
                                :
                                null

                    }
                </Modal.Body>

                <Modal.Footer>
                    <Button className='border_All_Buttons_BS' variant="secondary" onClick={() => { setShowModal(false) }}>
                        Cancel
                    </Button>
                    <Button className='border_All_Buttons_BS' variant={modalKind === 'Delete' ? "danger" : modalKind === 'Add' ? "primary" : null} onClick={() => { DeleteAddKind(); setShowModal(false) }}>
                        {
                            modalKind
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}