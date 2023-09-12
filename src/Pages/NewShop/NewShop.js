import React, { useState, useRef } from 'react';
import './NewShop.css';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Card, Form, Row, Col, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AddShop, GetShops } from '../../Collections/ShopsCollection';
import './NewShop.css';
import { GetShopsProducts } from '../../Collections/ShopsProductsCollection';


export default function NewShop() {

    const AllShops = GetShops();

    const List_Shops_Kinds = GetShopsProducts()[0]?.Kinds;

    const Shop_NameRef = useRef();
    const Shop_LocationRef = useRef();
    const Shop_DiscRef = useRef();
    const Shop_ImgRef = useRef();

    const [name, setName] = useState('');
    const [kind, setKind] = useState('');
    const [location, setLocation] = useState('');
    const [disc, setDisc] = useState('');
    const [img, setImg] = useState('');

    const { currentUser } = useAuth();

    const history = useNavigate();

    const [errorImg, setErrorImg] = useState('');
    const [errorName, setErrorName] = useState('');
    const [errorDisc, setErrorDisc] = useState('');
    const [errorLoc, setErrorLoc] = useState('');

    const [errorImgStatus, setErrorImgStatus] = useState(false);
    const [errorNameStatus, setErrorNameStatus] = useState(false);
    const [errorDiscStatus, setErrorDiscStatus] = useState(false);
    const [errorLocStatus, setErrorLocStatus] = useState(false);

    const checkIfShopNameCurrent = () => {
        let res = false;
        AllShops.map((shop) => {
            if (shop.Shop_Name === Shop_NameRef.current.value.replace(' ', '')) {
                res = true;
            }
        })
        return res;
    }

    const checkValuesShopName = () => {
        if (!Shop_NameRef.current.value) {
            setErrorName('');
            setErrorNameStatus(false);
        }
        else if (Shop_NameRef.current.value.length < 6) {
            setErrorName('the name most be more than 5 latters');
            setErrorNameStatus(false);
        }
        else if (checkIfShopNameCurrent()) {
            setErrorName('the name already in use try another one.');
            setErrorNameStatus(false);
        }
        else {
            setErrorName('');
            setErrorNameStatus(true);
        }
    }

    const checkValuesShopDisc = () => {
        if (!Shop_DiscRef.current.value) {
            setErrorDisc('');
            setErrorDiscStatus(false);
        }
        else if (Shop_DiscRef.current.value.length < 15) {
            setErrorDisc('the discription most be more 15 latters');
            setErrorDiscStatus(false);
        }
        else {
            setErrorDisc('');
            setErrorDiscStatus(true);
        }
    }

    const checkValuesShopImg = () => {
        const img = new Image();
        img.src = Shop_ImgRef.current.value;
        if (img.complete) {
            setErrorImg('');
            setErrorImgStatus(false);
        }
        else if (Shop_ImgRef.current.value === '') {
            setErrorImg('');
            setErrorImgStatus(false);
        }
        else {
            img.onload = () => {
                setErrorImg('');
                setErrorImgStatus(true);
            };
            img.onerror = () => {
                setErrorImg('filed to load the image, try another one...');
                setErrorImgStatus(false);
            };
        }
    }

    const checkValuesShopLocation = () => {
        if (!Shop_LocationRef.current.value) {
            setErrorLoc('');
            setErrorLocStatus(false);
        }
        else if (Shop_LocationRef.current.value.length < 10) {
            setErrorLoc('the location most be more 10 latters');
            setErrorLocStatus(false);
        }
        else {
            setErrorLoc('');
            setErrorLocStatus(true);
        }
    }

    const setAllToDefault = () => {
        setName('');
        setKind('');
        setLocation('');
        setDisc('');
        setImg('');

        setErrorImg('');
        setErrorName('');
        setErrorDisc('');
        setErrorLoc('');

        setErrorImgStatus(false);
        setErrorNameStatus(false);
        setErrorDiscStatus(false);
        setErrorLocStatus(false);
    }

    const NewShop = () => {
        const shop = {
            Shop_Disc: Shop_DiscRef.current.value,
            Shop_Img: Shop_ImgRef.current.value,
            Shop_Kind: kind,
            Shop_Location: Shop_LocationRef.current.value,
            Shop_Name: Shop_NameRef.current.value.replace(" ", ""),
            Shop_Inbox: []
        };
        AddShop(shop, currentUser.uid);
        setAllToDefault();
        history('/');
    }

    return (
        <div className='d-flex align-items-center justify-content-center mt-4'>
            <Card id='NewShop_Page_Card' className='border border-primary'>
                <Card.Body>
                    <div className='text-primary p-1'><img src="https://e7.pngegg.com/pngimages/663/779/png-clipart-blue-w-letter-weebly-logo-icons-logos-emojis-tech-companies.png" className="Logo_Login_Page" />eb Poster</div>
                    <h2 className='text-center pb-1 text-primary'>Create Shop</h2>
                    <Form onSubmit={NewShop}>

                        <Row>
                            <Col>
                                <Form.Group className='d-flex justfiy-content-between m-3'>
                                    <Form.Label className='m-auto w-75'>Name : </Form.Label>
                                    <Form.Control onChange={(e) => { setName(e.target.value.slice(0, 12)); checkValuesShopName(); }} value={name} className={errorName ? 'border-danger' : 'border-primary'} type="text" ref={Shop_NameRef} placeholder='Shop Name...' />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className='d-flex justfiy-content-between m-3'>
                                    <Form.Label className='m-auto w-75'>Kind : </Form.Label>

                                    <div className='New_Shop_Kinds'>
                                        <NavDropdown className='Z_Index_Drop_Down w-100 h-100' align="start" title="Kinds" id="dropdown-basic">

                                            <NavDropdown.Item className='No_hover_DropDown_NewShop'>
                                                <div>
                                                    {
                                                        List_Shops_Kinds?.map((kind, loc) => {
                                                            return <div onClick={() => setKind(kind)} className="Nav_Drop_Downs_Items_Kinds" key={loc}><div className="me-3">{loc + 1}.</div>{kind}</div>
                                                        })
                                                    }
                                                </div>
                                            </NavDropdown.Item>

                                        </NavDropdown>
                                    </div>

                                </Form.Group>
                            </Col>
                            <div>
                                {errorName && <p className='text-danger'>{errorName}</p>}
                            </div>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className='d-flex justfiy-content-between m-3'>
                                    <Form.Label className='m-auto w-75'>Location : </Form.Label>
                                    <Form.Control onChange={(e) => { setLocation(e.target.value.slice(0, 12)); checkValuesShopLocation(); }} value={location} className={errorLoc ? 'border-danger' : 'border-primary'} type="text" ref={Shop_LocationRef} placeholder='Shop Location...' />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className='d-flex justfiy-content-between m-3'>
                                    <Form.Label className='m-auto w-75'>Discrption : </Form.Label>
                                    <Form.Control onChange={(e) => { setDisc(e.target.value); checkValuesShopDisc(); }} value={disc} className={errorDisc ? 'border-danger' : 'border-primary'} type="text" ref={Shop_DiscRef} placeholder='Shop Discrption...' />
                                </Form.Group>
                            </Col>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    {errorLoc && <p className='text-danger'>{errorLoc}</p>}
                                </div>
                                <div>
                                    {errorDisc && <p className='text-danger'>{errorDisc}</p>}
                                </div>
                            </div>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className='d-flex justfiy-content-between m-3'>
                                    <Form.Label className='m-auto w-25'>Image URL : </Form.Label>
                                    <Form.Control onChange={(e) => { setImg(e.target.value); checkValuesShopImg(); }} value={img} className={errorImg ? 'border-danger' : 'border-primary'} type="text" ref={Shop_ImgRef} placeholder='Shop Image...' />
                                </Form.Group>
                                <div className='d-flex justify-content-center'>
                                    {errorImg && <p className='text-danger'>{errorImg}</p>}
                                </div>
                            </Col>
                        </Row>
                        {
                            console.log(errorDiscStatus,1)
                        }
                        {
                            console.log(errorImgStatus,2)
                        }
                        {
                            console.log(errorLocStatus,3)
                        }
                        {
                            console.log(errorNameStatus,4)
                        }
                        {
                            console.log(kind,5)
                        }

                        <div className='d-flex justify-content-center m-4'>
                            <Button className='border_All_Buttons_BS' disabled={errorDiscStatus && errorImgStatus && errorLocStatus && errorNameStatus && kind ? false : true} variant="primary" type="submit">Create</Button>
                        </div>

                    </Form>

                </Card.Body>
            </Card>
        </div>
    )
}

