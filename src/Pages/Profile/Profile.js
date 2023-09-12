import React, { useEffect, useRef, useState } from 'react';
import './Profile.css';
import { useAuth } from '../../contexts/AuthContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button, Form, CloseButton, NavDropdown } from 'react-bootstrap';
import { GetSellers, UpdateSeller } from '../../Collections/SellersCollection';
import { CheckIfShopsEquals, DeleteShop, GetShops, UpdateShop } from '../../Collections/ShopsCollection';
import { CheckIfSellersEquals } from '../../Collections/SellersCollection';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { DeleteAllProducts, GetProducts } from '../../Collections/ProductsCollection';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../FireBase/firebase';

export default function Profile(props) {

  //------------------------------------------------------------------------Seller
  const AllShops = GetShops();
  const AllSellers = GetSellers();

  const [sellerName, setSellerName] = useState({ ...props.Seller.Name });
  const [phone, setPhone] = useState({ ...props.Seller.Phone });
  const [birthDate, setBirthDate] = useState({ ...props.Seller.BirthDate });
  const [sellerImg, setSellerImg] = useState({ ...props.Seller.Img });

  const sellerNameRef = useRef();
  const sellerPhoneRef = useRef();
  const sellerImgRef = useRef();
  const sellerBirthDateRef = useRef();

  const [errorSellerName, setErrorSellerName] = useState('');
  const [errorSellerPhone, setErrorSellerPhone] = useState('');
  const [errorSellerImg, setErrorSellerImg] = useState('');
  const [errorSellerBirthDate, setErrorSellerBirthDate] = useState(false);

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPasswords, setErrorPasswords] = useState('');

  const [email, setEmail] = useState({ ...props.email });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailSellerRef = useRef();
  const PasswordRef = useRef();
  const ConfirmPasswordRef = useRef();
  //------------------------------------------------------------------------Shop
  const [shopName, setShopName] = useState({ ...props.Shop.Name });
  const [kindShop, setKindShop] = useState({ ...props.Shop.Kind });
  const [shopLocation, setShopLocation] = useState({ ...props.Shop.Location });
  const [shopImg, setShopImg] = useState({ ...props.Shop.Img });
  const [shopDisc, setShopDisc] = useState({ ...props.Shop.Disc });
  const [shopInbox, setShopInbox] = useState({ ...props.Shop.Inbox });

  const [errorShopName, setErrorShopName] = useState('');
  const [errorShopImg, setErrorShopImg] = useState('');
  const [errorShopDisc, setErrorShopDisc] = useState('');
  const [errorShopLocation, setErrorShopLocation] = useState('');

  const shopNameRef = useRef();
  const shopLocationRef = useRef();
  const shopImgRef = useRef();
  const shopDiscRef = useRef();

  const kkkkkkkkkdk = true;
  //------------------------------------------------------------------------

  const { currentUser, UpdateEmail, UpdatePassword } = useAuth();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showStatus, setShowStatus] = useState('');

  const [showDelete, setShowDelete] = useState(false);
  const [showDeleteKind, setShowDeleteKind] = useState('');

  const history = useNavigate();

  const [loading, setLoading] = useState(false);

  const scrrollingPlaces = useRef([]);

  useEffect(() => {
    setSellerName(props.Seller.Name);
    setEmail(props.email);
    setShopName(props.Shop.Name);
    setKindShop(props.Shop.Kind);
    setShopLocation(props.Shop.Location);
    setPhone(props.Seller.Phone);
    setShopImg(props.Shop.Img);
    setSellerImg(props.Seller.Img);
    setBirthDate(props.Seller.BirthDate);
    setShopDisc(props.Shop.Disc);
    setShopInbox(props.Shop.Inbox);
  }, [props.Seller.Name,
  props.email,
  props.Shop.Name,
  props.Shop.Kind,
  props.Shop.Location,
  props.Seller.phone,
  props.Shop.Img,
  props.Seller.Img,
  props.Seller.BirthDate,
  props.Shop.Disc,
  props.Shop.Inbox
  ])


  const checkPasswords = () => {
    if (!PasswordRef.current.value && !ConfirmPasswordRef.current.value) {
      setErrorPasswords('empty');
    }
    else if (PasswordRef.current.value !== ConfirmPasswordRef.current.value) {
      setErrorPasswords('the two Passwords are Diffrent, Try to Put the Same...');
    }
    else if (PasswordRef.current.value.length < 9 || ConfirmPasswordRef.current.value.length < 9) {
      setErrorPasswords('Passwrds most be More than 8 letters...');
    }
    else {
      setErrorPasswords('');
    }
  }

  const handelSubmitEditProfile = (event) => {
    event.preventDefault();
    if (showStatus === 'Email') {
      UpdateEmail(email);
    }
    else if (showStatus === 'Seller Name' || showStatus === 'Seller Phone' || showStatus === 'Profile Image') {
      const seller = {
        BirthDate: props.Seller.BirthDate,
        Img: sellerImg,
        Name: sellerName,
        Phone: phone
      }
      UpdateSeller(seller, currentUser.uid);
    }
    else if (showStatus === 'Shop Name' || showStatus === 'Shop Kind' || showStatus === 'Shop Location' || showStatus === 'Shop Image') {
      const shop = {
        Shop_Name: shopName,
        Shop_Location: shopLocation,
        Shop_Kind: kindShop,
        Shop_Disc: props.Shop.Disc,
        Shop_Img: shopImg,
        Shop_Inbox: props.Shop.Inbox
      }
      UpdateShop(shop, currentUser.uid);
    }
    else if (showStatus === 'Password') {
      UpdatePassword(PasswordRef.current.value);
    }
    returnAllValuesToDefault();
    handleClose();


  }

  const returnAllValuesToDefault = () => {
    setShowStatus('');
    handleClose();
    setSellerName(props.Seller.Name);
    setEmail(props.email);
    setShopName(props.Shop.Name);
    setKindShop(props.Shop.Kind);
    setShopLocation(props.Shop.Location);
    setPhone(props.Seller.Phone);
    setPassword('');
    setConfirmPassword('');
    setErrorPasswords('');
    setSellerImg(props.Seller.Img);
    setShopImg(props.Shop.Img);
    setBirthDate(props.Seller.BirthDate);
    setShopDisc(props.Shop.Disc);
    setShopInbox(props.Shop.Inbox);
  }

  //------------------------------------------------------------------ Seller Inputs
  const checkValuesSellerEmail = () => {
    if (!emailSellerRef.current.value) {
      setErrorEmail('');
    }
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailSellerRef.current.value)) {
      setErrorEmail('Enter an vaild email.');
    }
    else {
      setErrorEmail('');
    }
  }

  const checkValuesSellerImage = () => {
    const img = new Image();
    img.src = sellerImgRef.current.value;
    if (img.complete) {
      setErrorSellerImg('');
    }
    else if (sellerImgRef.current.value === '') {
      setErrorSellerImg('');
    }
    else {
      img.onload = () => {
        setErrorSellerImg('');
      };
      img.onerror = () => {
        setErrorSellerImg('filed to load the image, try another one...');
      };
    }
  }

  const checkValuesSellerName = () => {
    if (!sellerNameRef.current.value) {
      setErrorSellerName('');
    }
    else if (sellerNameRef.current.value.length < 6) {
      setErrorSellerName('the name most be more than 5 latters');
    }
    else {
      setErrorSellerName('');
    }
  }

  const checkValuesSellerPhone = () => {
    if (!sellerPhoneRef.current.value) {
      setErrorSellerPhone('');
    }
    else if (sellerPhoneRef.current.value.length < 10) {
      setErrorSellerPhone('the number most be more 10 latters');
    }
    else {
      setErrorSellerPhone('');
    }
  }

  const checkValuesSellerBirthDate = () => {
    if (!sellerBirthDateRef.current.value) {
      setErrorSellerBirthDate(true);
    }
    else {
      setErrorSellerBirthDate(false);
    }
  }

  const CheckAllValuesSellerInput = () => {
    const newvalue = {
      Name: sellerName,
      Img: sellerImg,
      BirthDate: birthDate,
      Phone: phone
    }
    if (!CheckIfSellersEquals(AllSellers, newvalue) && !errorSellerBirthDate && !errorSellerImg && !errorSellerName && !errorSellerPhone) {
      return false;
    }
    else {
      return true;
    }
  }


  //------------------------------------------------------------------ Shop Inputs
  const checkIfShopNameCurrent = () => {
    let res = false;
    AllShops.map((shop) => {
      if (shop.Shop_Name === shopNameRef.current.value.replace(' ', '') && shop.id !== currentUser.uid) {
        res = true;
      }
    })
    return res;
  }

  const checkValuesShopName = () => {
    if (!shopNameRef.current.value) {
      setErrorShopName('');
    }
    else if (shopNameRef.current.value.length < 6) {
      setErrorShopName('the name most be more than 5 latters');
    }
    else if (checkIfShopNameCurrent()) {
      setErrorShopName('the name already in use try another.');
    }
    else {
      setErrorShopName('');
    }
  }

  const checkValuesShopDisc = () => {
    if (!shopDiscRef.current.value) {
      setErrorShopDisc('');
    }
    else if (shopDiscRef.current.value.length < 15) {
      setErrorShopDisc('the discription most be more 15 latters');
    }
    else {
      setErrorShopDisc('');
    }
  }

  const checkValuesShopLocation = () => {
    if (!shopLocationRef.current.value) {
      setErrorShopLocation('');
    }
    else if (shopLocationRef.current.value.length < 10) {
      setErrorShopLocation('the location most be more 10 latters');
    }
    else {
      setErrorShopLocation('');
    }
  }

  const checkValuesShopImg = () => {
    const img = new Image();
    img.src = shopImgRef.current.value;
    if (img.complete) {
      setErrorShopImg('');
    }
    else if (shopImgRef.current.value === '') {
      setErrorShopImg('');
    }
    else {
      img.onload = () => {
        setErrorShopImg('');
      };
      img.onerror = () => {
        setErrorShopImg('filed to load the image, try another one...');
      };
    }
  }

  const CheckAllValuesShopInput = () => {
    const newvalue = {
      Shop_Disc: shopDisc,
      Shop_Img: shopImg,
      Shop_Inbox: shopInbox,
      Shop_Kind: kindShop,
      Shop_Location: shopLocation,
      Shop_Name: shopName
    }
    if (!CheckIfShopsEquals(AllShops, newvalue) && !errorShopDisc && !errorShopImg && !errorShopLocation && !errorShopName) {
      return false;
    }
    else {
      return true;
    }
  }

  const Alllproducts = GetProducts();

  const getProductsSeller = () =>{
    let res = false;
    Alllproducts.map((prods) => {
      if(prods.id === currentUser.uid){
        prods.Products.map((prods) => {
          res = true;
        })
      }
    })
    return res;
  }


  const handelDeleteFuncs = async () => {
    setLoading(true);
    if (showDeleteKind === 'Delete my user') {
      await fetch("/deleteUser", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ id: currentUser.uid })
      })
        .then(res => res.json())
        .then((result) => {
          console.log(result);
        },
          (error) => {
            console.log(error);
          });
      setShowDelete(false);
      history('/');
      window.location.reload();
    }
    else if (showDeleteKind === 'Delete my shop') {
      DeleteShop(currentUser.uid);
      DeleteAllProducts(currentUser.uid);
      setShowDelete(false);
    }
    else if (showDeleteKind === 'Delete my products') {
      DeleteAllProducts(currentUser.uid);
      setShowDelete(false);
    }
    setLoading(false);
  }

  return (
    <>
      {
        <div id='Sticky_NavBar' className="d-flex justify-content-between">
          <div className="Scroll_To_Top"><i onClick={() => { window.scrollTo(0, 0) }} id='Button_To_Top' className="fa-solid fa-arrow-up-from-bracket"></i></div>
          <div className="Scroll_Options_Kinds">
            <NavDropdown align="end" title="Profile" id="dropdown-basic">

              <NavDropdown.Item className='No_hover_DropDown Nav_Kinds_Shop_Page'>
                <div className="Button_DropDown_List">
                  <div className="Nav_Drop_Downs_Items_Kinds" onClick={() => { window.scrollTo({ top: scrrollingPlaces.current[0]?.offsetTop - 170 }) }}><div className="me-3">1.</div>Seller Info</div>
                  <div className="Nav_Drop_Downs_Items_Kinds" onClick={() => { window.scrollTo({ top: scrrollingPlaces.current[1]?.offsetTop - 170 }) }}><div className="me-3">2.</div>Edit Profile</div>
                  <div className="Nav_Drop_Downs_Items_Kinds" onClick={() => { window.scrollTo({ top: scrrollingPlaces.current[2]?.offsetTop - 170 }) }}><div className="me-3">3.</div>Inbox</div>
                  <div className="Nav_Drop_Downs_Items_Kinds" onClick={() => { window.scrollTo({ top: scrrollingPlaces.current[3]?.offsetTop - 170 }) }}><div className="me-3">3.</div>Settings</div>
                </div>
              </NavDropdown.Item>

            </NavDropdown>
          </div>
        </div>
      }
      <div id='Profile_Page' className='d-flex justify-content-between mt-5'>
        {loading && <LoadingSpinner />}

        <div ref={el => (scrrollingPlaces.current[0] = el)} className='w-100'>
          <div className='Header_Rigth_Profile'>
            <div className='d-flex justify-content-center p-4'>
              <h4 id="All_Impo_Titels">Hello {props.Seller.Name} <i className='fa-solid fa-house'></i></h4>
            </div>
            <div className='d-flex justify-content-around First_Window_profile'>
              <div className='Options_Right_ShopImg_Profile mb-5'>
                <h3 className='text-center text-primary pb-4'>Options <i className="fa-solid fa-user-gear"></i></h3>
                <div className='w-100 d-flex justify-content-center'>
                  <div className='Options_Seller_Profile_Page'>
                    {
                      props.Shop.Name
                        ?
                        <>
                          <Link onClick={() => window.scrollTo(0, 0)} className='text-decoration-none' to={"/Shop/" + props.Shop.Name}><div><i id='Profile_Left_Icons_Options' className="fa-solid fa-store m-2"></i>My Shop</div></Link>
                          <Link onClick={() => window.scrollTo(0, 0)} className='text-decoration-none' to={'/Profile/Products/' + props.Shop.Name}><div><i id='Profile_Left_Icons_Options' className="fa-solid fa-bag-shopping m-2"></i>My Products</div></Link>
                          <div className='' onClick={() => { setShowStatus('Shop Image'); handleShow(); window.scrollTo(0, 0); }}><i id='Profile_Left_Icons_Options' className="fa-regular fa-image m-2"></i>Change Shop Image</div>
                        </>

                        :
                        null
                    }
                    <div onClick={() => { setShowStatus('Profile Image'); handleShow(); window.scrollTo(0, 0); }}><i id='Profile_Left_Icons_Options' className="fa-solid fa-image-portrait m-2"></i>Change Profile Image</div>
                  </div>
                </div>
              </div>

              {
                props.Shop.Name
                  ?
                  <div className='container_Profile_Img m-auto'>
                    <img id='Image_Shop_Profile' className='img-fluid me-2' src={props.Shop.Img} />
                    <div className='Profile_Details'>
                      <div>
                        <img className='Image_Profile' src={props.Seller.Img} />
                      </div>
                      <div className='Seller_Details'>
                        <p>{props.Seller.Name}</p>
                        <p>{props.Seller.BirthDate}</p>
                        <p>{props.Seller.Phone}</p>
                      </div>
                    </div>
                  </div>
                  :
                  <div>
                    <div>
                      <img className='Image_Profile' src={props.Seller.Img} />
                    </div>
                    <div className='Seller_Details'>
                      <p>{props.Seller.Name}</p>
                      <p>{props.Seller.BirthDate}</p>
                      <p>{props.Seller.Phone}</p>
                    </div>
                  </div>
              }

            </div>

          </div>
          <Container ref={el => (scrrollingPlaces.current[1] = el)} className='Options_Right_Profile'>
            <div className='d-flex justify-content-center'>
              <h4 id="All_Impo_Titels">Edit profile <i className="fa-solid fa-circle-info"></i></h4>
            </div>

            <div className='Detials_Prodile_Edite_Profile'>
              <div className='Detials_Prodile_Edite_Options'><div>Email : {currentUser.email}</div><i onClick={() => { setShowStatus('Email'); handleShow() }} id='Edite_Profile_Details' className="fas fa-edit"></i></div>
              <div className='Detials_Prodile_Edite_Options'><div>Password : *******</div><i onClick={() => { setShowStatus('Password'); handleShow() }} id='Edite_Profile_Details' className="fas fa-edit"></i></div>
            </div>

            <div className='Detials_Prodile_Edite_Profile'>
              <div className='Detials_Prodile_Edite_Options'><div>Name : {props.Seller.Name}</div><i onClick={() => { setShowStatus('Seller Name'); handleShow() }} id='Edite_Profile_Details' className="fas fa-edit"></i></div>
              <div className='Detials_Prodile_Edite_Options'><div>Phone : {props.Seller.Phone}</div><i onClick={() => { setShowStatus('Seller Phone'); handleShow() }} id='Edite_Profile_Details' className="fas fa-edit"></i></div>

            </div>


            {
              props.Shop.Name ?
                <>
                  <div className='Detials_Prodile_Edite_Profile'>
                    <div className='Detials_Prodile_Edite_Options'><div>Kind Shop : {props.Shop.Kind}</div><i onClick={() => { setShowStatus('Shop Kind'); handleShow() }} id='Edite_Profile_Details' className="fas fa-edit"></i></div>
                    <div className='Detials_Prodile_Edite_Options'><div>Shop Location : {props.Shop.Location}</div><i onClick={() => { setShowStatus('Shop Location'); handleShow() }} id='Edite_Profile_Details' className="fas fa-edit"></i></div>
                  </div>

                  <div className='Detials_Prodile_Edite_Profile'>
                    <div className='Detials_Prodile_Edite_Options'><div>Shop Name : {props.Shop.Name}</div><i onClick={() => { setShowStatus('Shop Name'); handleShow() }} id='Edite_Profile_Details' className="fas fa-edit"></i></div>
                    <div className='Detials_Prodile_Edite_Options'><div>Shop Discription : {props.Shop?.Disc.slice(0, 10)}..</div><i onClick={() => { setShowStatus('Shop Disc'); handleShow() }} id='Edite_Profile_Details' className="fas fa-edit"></i></div>
                  </div>

                </>
                :
                null
            }


            {

              <Modal className='bg-primary bg-opacity-10' show={show} onHide={handleClose}
                centered aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header className='text-center bg-black text-white'>
                  <Modal.Title className='w-100'>Edit {showStatus}</Modal.Title>
                  <CloseButton variant='white' onClick={returnAllValuesToDefault} />
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handelSubmitEditProfile}>

                    {
                      showStatus === 'Profile Image'
                        ?
                        <>
                          <Form.Group className='Profile_Group_Edit'>
                            <Form.Label className='Lable_Group_Edit'>{showStatus} URL :</Form.Label>
                            <Form.Control placeholder='Seller Image...' className={errorSellerImg ? 'border-danger' : 'border-primary'} ref={sellerImgRef} onChange={(e) => { checkValuesSellerImage(); setSellerImg(e.target.value) }} type='text' />
                          </Form.Group>

                          {errorSellerImg && <p className='text-danger'>{errorSellerImg}</p>}

                          <Form.Group className='d-flex justify-content-center p-3'>
                            <Button className='border_All_Buttons_BS' disabled={CheckAllValuesSellerInput()} variant="primary" type='submit'>
                              Edit {showStatus}
                            </Button>
                          </Form.Group>
                        </>
                        :
                        showStatus === 'Shop Image'
                          ?
                          <>
                            <Form.Group className='Profile_Group_Edit'>
                              <Form.Label className='Lable_Group_Edit'>{showStatus} URL :</Form.Label>
                              <Form.Control placeholder='Shop Image...' className={errorShopImg ? 'border-danger' : 'border-primary'} ref={shopImgRef} onChange={(e) => { checkValuesShopImg(); setShopImg(e.target.value) }} type='text' />
                            </Form.Group>

                            {errorShopImg && <p className='text-danger'>{errorShopImg}</p>}

                            <Form.Group className='d-flex justify-content-center p-3'>
                              <Button className='border_All_Buttons_BS' disabled={CheckAllValuesShopInput()} variant="primary" type='submit'>
                                Edit {showStatus}
                              </Button>
                            </Form.Group>
                          </>
                          :
                          showStatus === 'Email'
                            ?
                            <>
                              <Form.Group className='Profile_Group_Edit'>
                                <Form.Label className='Lable_Group_Edit'>{showStatus} :</Form.Label>
                                <Form.Control placeholder='Email...' className={errorEmail ? 'border-danger' : 'border-primary'} ref={emailSellerRef} onChange={(e) => { checkValuesSellerEmail(); setEmail(e.target.value.slice(0, 30)) }} type='email' value={email} />
                              </Form.Group>

                              {errorEmail && <p className='text-danger'>{errorEmail}</p>}

                              <Form.Group className='d-flex justify-content-center p-3'>
                                <Button className='border_All_Buttons_BS' disabled={kkkkkkkkkdk} variant="primary" type='submit'>
                                  Edit
                                </Button>
                              </Form.Group>
                            </>
                            :
                            showStatus === 'Seller Name'
                              ?
                              <>
                                <Form.Group className='Profile_Group_Edit'>
                                  <Form.Label className='Lable_Group_Edit'>{showStatus} :</Form.Label>
                                  <Form.Control placeholder='Seller Name...' className={errorSellerName ? 'border-danger' : 'border-primary'} ref={sellerNameRef} onChange={(e) => { checkValuesSellerName(); setSellerName(e.target.value.slice(0, 12)) }} type='text' value={sellerName} />
                                </Form.Group>

                                {errorSellerName && <p className='text-danger'>{errorSellerName}</p>}

                                <Form.Group className='d-flex justify-content-center p-3'>
                                  <Button className='border_All_Buttons_BS' disabled={CheckAllValuesSellerInput()} variant="primary" type='submit'>
                                    Edit {showStatus}
                                  </Button>
                                </Form.Group>
                              </>
                              :
                              showStatus === 'Shop Name'
                                ?
                                <>
                                  <Form.Group className='Profile_Group_Edit'>
                                    <Form.Label className='Lable_Group_Edit'>{showStatus} :</Form.Label>
                                    <Form.Control placeholder='Shop Name...' className={errorShopName ? 'border-danger' : 'border-primary'} ref={shopNameRef} onChange={(e) => { checkValuesShopName(); setShopName(e.target.value.slice(0, 12)) }} type='text' value={shopName} />
                                  </Form.Group>

                                  {errorShopName && <p className='text-danger'>{errorShopName}</p>}

                                  <Form.Group className='d-flex justify-content-center p-3'>
                                    <Button className='border_All_Buttons_BS' disabled={CheckAllValuesShopInput()} variant="primary" type='submit'>
                                      Edit {showStatus}
                                    </Button>
                                  </Form.Group>
                                </>
                                :
                                showStatus === 'Shop Disc'
                                  ?
                                  <>
                                    <Form.Group className='Profile_Group_Edit'>
                                      <Form.Label className='Lable_Group_Edit'>{showStatus} :</Form.Label>
                                      <Form.Control placeholder='Discription...' className={errorShopDisc ? 'border-danger' : 'border-primary'} ref={shopDiscRef} onChange={(e) => { checkValuesShopDisc(); setShopDisc(e.target.value) }} type='text' value={shopDisc} />
                                    </Form.Group>

                                    {errorShopDisc && <p className='text-danger'>{errorShopDisc}</p>}

                                    <Form.Group className='d-flex justify-content-center p-3'>
                                      <Button className='border_All_Buttons_BS' disabled={CheckAllValuesShopInput()} variant="primary" type='submit'>
                                        Edit {showStatus}
                                      </Button>
                                    </Form.Group>
                                  </>
                                  :
                                  showStatus === 'Shop Kind'
                                    ?
                                    <>
                                      <Form.Group className='Profile_Group_Edit'>
                                        <Form.Label className='Lable_Group_Edit'>{showStatus} :</Form.Label>
                                        <Form.Control placeholder='Shop Kind...' className='border-primary' onChange={(e) => { setKindShop(e.target.value) }} type='text' value={kindShop} />
                                      </Form.Group>

                                      <Form.Group className='d-flex justify-content-center p-3'>
                                        <Button className='border_All_Buttons_BS' disabled={kkkkkkkkkdk} variant="primary" type='submit'>
                                          Edit {showStatus}
                                        </Button>
                                      </Form.Group>
                                    </>
                                    :
                                    showStatus === 'Shop Location'
                                      ?
                                      <>
                                        <Form.Group className='Profile_Group_Edit'>
                                          <Form.Label className='Lable_Group_Edit'>{showStatus} :</Form.Label>
                                          <Form.Control placeholder='Shop Location...' className={errorShopLocation ? 'border-danger' : 'border-primary'} ref={shopLocationRef} onChange={(e) => { checkValuesShopLocation(); setShopLocation(e.target.value.slice(0, 20)) }} type='text' value={shopLocation} />
                                        </Form.Group>

                                        {errorShopLocation && <p className='text-danger'>{errorShopLocation}</p>}

                                        <Form.Group className='d-flex justify-content-center p-3'>
                                          <Button className='border_All_Buttons_BS' disabled={CheckAllValuesShopInput()} variant="primary" type='submit'>
                                            Edit {showStatus}
                                          </Button>
                                        </Form.Group>
                                      </>
                                      :
                                      showStatus === 'Seller Phone'
                                        ?
                                        <>
                                          <Form.Group className='Profile_Group_Edit'>
                                            <Form.Label className='Lable_Group_Edit'>{showStatus} :</Form.Label>
                                            <Form.Control placeholder='Phone...' className={errorSellerPhone ? 'border-danger' : 'border-primary'} ref={sellerPhoneRef} onChange={(e) => { checkValuesSellerPhone(); setPhone(e.target.value.slice(0, 10)) }} type='number' value={phone} />
                                          </Form.Group>

                                          {errorSellerPhone && <p className='text-danger'>{errorSellerPhone}</p>}

                                          <Form.Group className='d-flex justify-content-center p-3'>
                                            <Button className='border_All_Buttons_BS' disabled={CheckAllValuesSellerInput()} variant="primary" type='submit'>
                                              Edit {showStatus}
                                            </Button>
                                          </Form.Group>
                                        </>
                                        :
                                        showStatus === 'Password'
                                          ?
                                          <>
                                            <Form.Group className='Profile_Group_Edit'>
                                              <Form.Label className='Lable_Group_Edit_Password'>{showStatus} :</Form.Label>
                                              <Form.Control placeholder='Password...' className={errorPasswords ? 'border-danger' : 'border-primary'} ref={PasswordRef} value={password} onChange={(e) => { checkPasswords(); setPassword(e.target.value.slice(0, 20)) }} type='password' />
                                            </Form.Group>

                                            <Form.Group className='Profile_Group_Edit'>
                                              <Form.Label className='Lable_Group_Edit_Password'>Confirm {showStatus} :</Form.Label>
                                              <Form.Control placeholder='Confirm Password...' className={errorPasswords ? 'border-danger' : 'border-primary'} ref={ConfirmPasswordRef} value={confirmPassword} onChange={(e) => { checkPasswords(); setConfirmPassword(e.target.value.slice(0, 20)) }} type='password' />
                                            </Form.Group>

                                            {errorPasswords !== 'empty' && <><br /><span className='text-danger'>{errorPasswords}</span></>}

                                            <Form.Group className='d-flex justify-content-center p-3'>
                                              <Button className='border_All_Buttons_BS' disabled={!errorPasswords ? false : true} variant="primary" type='submit'>
                                                Edit {showStatus}
                                              </Button>
                                            </Form.Group>
                                          </>
                                          :
                                          null
                    }

                  </Form>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-start'>
                  <Button className='border_All_Buttons_BS' variant="secondary" onClick={returnAllValuesToDefault}>
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>

            }
          </Container>


          {
            props.Shop.Name ?
              <>
                <Container ref={el => (scrrollingPlaces.current[2] = el)} className='Options_Right_Profile'>
                  <div className='d-flex justify-content-center'>
                    <h4 id="All_Impo_Titels">Inbox <i className="fa-solid fa-inbox"></i></h4>
                  </div>
                  <div className='Detials_Prodile_Edite_Profile'>
                    <div className='Inbox_Buttons_To_Pages'><div>Inbox Shop <i className="fa-solid fa-cart-shopping"></i> : </div><Link onClick={() => window.scrollTo(0, 0)} className='text-decoration-none' to={'/Inbox/Shops/' + props.Shop.Name}>Go to Page</Link></div>
                    <div className='Inbox_Buttons_To_Pages'><div>Inbox Products <i className="fa-solid fa-bag-shopping"></i> : </div><Link onClick={() => window.scrollTo(0, 0)} className='text-decoration-none' to={'/Inbox/Products/' + props.Shop.Name}>Go to Page</Link></div>
                  </div>
                </Container>
                <Container ref={el => (scrrollingPlaces.current[3] = el)} className='Options_Right_Profile'>
                  <div className='d-flex justify-content-center'>
                    <h4 id="All_Impo_Titels">Settings <i className="fa-solid fa-gears"></i></h4>
                  </div>
                  <div className='Detials_Prodile_Edite_Profile'>
                    <Button onClick={() => { setShowDelete(true); setShowDeleteKind('Delete my user') }} className='Button_Functions_Seller_Profile'><div className='m-auto'>Delete my user</div><div className="fa-solid fa-user-slash m-auto" /></Button>
                    <Button onClick={() => { setShowDelete(true); setShowDeleteKind('Delete my shop') }} className='Button_Functions_Seller_Profile'><div className='m-auto'>Delete my shop</div><div className="fa-solid fa-shop-slash m-auto" /></Button>
                    {
                      getProductsSeller() && <Button onClick={() => { setShowDelete(true); setShowDeleteKind('Delete my products') }} className='Button_Functions_Seller_Profile'><div className='m-auto'>Delete my products</div><div className="fa-solid fa-store-slash m-auto" /></Button>
                    }
                  </div>
                </Container>
              </>
              :
              <>

                <Container className='Options_Right_Profile'>
                  <div className='d-flex justify-content-center'>
                    <h4 id="All_Impo_Titels">Inbox <i className="fa-solid fa-inbox"></i></h4>
                  </div>
                  <Row className='m-4'>
                    <Col> <Link className='text-decoration-none' to='/NewShop' >Create New Shop</Link> To Get Inboxes Messages From Customers to your Products And your Shop.</Col>
                  </Row>
                </Container>
                <Container className='Options_Right_Profile'>
                  <div className='d-flex justify-content-center'>
                    <h4 id="All_Impo_Titels">Settings <i className="fa-solid fa-gears"></i></h4>
                  </div>
                  <div className='Detials_Prodile_Edite_Profile'>
                    <Button onClick={() => { setShowDelete(true); setShowDeleteKind('Delete my user') }} className='Button_Functions_Seller_Profile'><div className='m-auto'>Delete my user</div><div className="fa-solid fa-user-slash m-auto" /></Button>
                  </div>
                </Container>
              </>
          }
          <Modal className='bg-primary bg-opacity-10' show={showDelete} onHide={() => { setShowDelete(false) }}
            centered aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header className='text-center bg-black text-white'>
              <Modal.Title className='w-100'>{showDeleteKind}</Modal.Title>
              <CloseButton variant="white" onClick={() => { setShowDelete(false) }} />
            </Modal.Header>

            <Modal.Body>
              {
                showDeleteKind === 'Delete my user'
                  ?
                  <div>
                    <p>Are you shure that you want to delete your user!? <br />Thats mean your account and products and shop will be delete from the site.</p>
                  </div>
                  :
                  showDeleteKind === 'Delete my shop'
                    ?
                    <div>
                      <p>Are you shure that you want to delete your shop!? <br />Thats mean your shop and products will be delete from the site.</p>
                    </div>
                    :
                    <div>
                      <p>Are you shure that you want to delete all your products!?</p>
                    </div>
              }
            </Modal.Body>

            <Modal.Footer>
              <Button className='border_All_Buttons_BS' variant="secondary" onClick={() => { setShowDelete(false) }}>
                Cancel
              </Button>
              <Button className='border_All_Buttons_BS' variant="danger" onClick={() => { handelDeleteFuncs(); setShowDelete(false) }}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>

  )
}





