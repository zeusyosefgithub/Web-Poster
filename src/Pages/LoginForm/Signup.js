import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { CheckIfSellersEquals, GetSellers } from '../../Collections/SellersCollection';

export default function Signup() {

    const { signup } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmpasswordRef = useRef();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [img, setImg] = useState('');

    const NameRef = useRef();
    const PhoneRef = useRef();
    const ImgRef = useRef();
    const BirthDateRef = useRef();

    const [errorSellerName, setErrorSellerName] = useState('');
    const [errorSellerPhone, setErrorSellerPhone] = useState('');
    const [errorSellerImg, setErrorSellerImg] = useState('');
    const [errorSellerBirthDate, setErrorSellerBirthDate] = useState(false);

    const [errorSellerNameStatus, setErrorSellerNameStatus] = useState('');
    const [errorSellerPhoneStatus, setErrorSellerPhoneStatus] = useState('');
    const [errorSellerImgStatus, setErrorSellerImgStatus] = useState('');

    const [errorPasswords, setErrorPasswords] = useState('');
    const [errroEmail, setErrorEmail] = useState('');

    const [errorPasswordsStatus, setErrorPasswordsStatus] = useState(false);
    const [errroEmailStatus, setErrorEmailStatus] = useState(false);

    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    const [hideForm1, setHideForm1] = useState(false);
    const [hideForm2, setHideForm2] = useState(true);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsersAdmins();
    }, [])

    const getUsersAdmins = async () => {
        const respon = await fetch("/users");
        const data = await respon.json();
        setUsers(data);
    }

    const CheckEmail = () => {
        let res = false;
        users.map((user) => {
            if (user.email === emailRef.current.value) {
                res = true;
            }
        })
        return res;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const seller = {
            Name: NameRef.current.value,
            Phone: PhoneRef.current.value,
            BirthDate: BirthDateRef.current.value,
            Img: ImgRef.current.value
        }
        setLoading(true);
        await signup(emailRef.current.value, passwordRef.current.value, seller);
        setLoading(false);
        setPassword('');
        setConfirmPassword('');
        setEmail('');
        setName('');
        setPhone('');
        setBirthDate('');
        history('/');
    }

    const checkValuesSellerEmail = () => {
        if (!emailRef.current.value) {
            setErrorEmail('');
            setErrorEmailStatus(false);
        }
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailRef.current.value)) {
            setErrorEmail('Enter an vaild email.');
            setErrorEmailStatus(false);
        }
        else if (CheckEmail()) {
            setErrorEmail('Email already in use enter another one.');
            setErrorEmailStatus(false);
        }
        else {
            setErrorEmail('');
            setErrorEmailStatus(true);
        }
    }

    const checkPasswords = () => {
        if (!passwordRef.current.value && !confirmpasswordRef.current.value) {
            setErrorPasswords('');
            setErrorPasswordsStatus(false);
        }
        else if (passwordRef.current.value !== confirmpasswordRef.current.value) {
            setErrorPasswords('the two Passwords are Diffrent, Try to Put the Same...');
            setErrorPasswordsStatus(false);
        }
        else if (passwordRef.current.value.length < 9 || confirmpasswordRef.current.value.length < 9) {
            setErrorPasswords('Passwrds most be More than 8 letters...');
            setErrorPasswordsStatus(false);
        }
        else {
            setErrorPasswords('');
            setErrorPasswordsStatus(true);
        }
    }

    const checkValuesSellerImage = () => {
        const img = new Image();
        img.src = ImgRef.current.value;
        if (img.complete) {
            setErrorSellerImg('');
            setErrorSellerImgStatus(false);
        }
        else if (ImgRef.current.value === '') {
            setErrorSellerImg('');
            setErrorSellerImgStatus(false);
        }
        else {
            img.onload = () => {
                setErrorSellerImg('');
                setErrorSellerImgStatus(true);
            };
            img.onerror = () => {
                setErrorSellerImg('filed to load the image, try another one...');
                setErrorSellerImgStatus(false);
            };
        }
    }

    const checkValuesSellerName = () => {
        if (!NameRef.current.value) {
            setErrorSellerName('');
            setErrorSellerNameStatus(false);
        }
        else if (NameRef.current.value.length < 6) {
            setErrorSellerName('the name most be more than 5 latters');
            setErrorSellerNameStatus(false);
        }
        else {
            setErrorSellerName('');
            setErrorSellerNameStatus(true);
        }
    }

    const checkValuesSellerPhone = () => {
        if (!PhoneRef.current.value) {
            setErrorSellerPhone('');
            setErrorSellerPhoneStatus(false);
        }
        else if (PhoneRef.current.value.length < 10) {
            setErrorSellerPhone('the number most be more 10 latters');
            setErrorSellerPhoneStatus(false);
        }
        else {
            setErrorSellerPhone('');
            setErrorSellerPhoneStatus(true);
        }
    }

    const checkValuesSellerBirthDate = () => {
        if (!BirthDateRef.current.value) {
            setErrorSellerBirthDate(true);
        }
        else {
            setErrorSellerBirthDate(false);
        }
    }

    return (
        <>
            {loading ? <LoadingSpinner /> : null}

            <div className='d-flex align-items-center justify-content-center mt-4'>

                <Card id='SignUp_page_Card' className='border border-primary'>
                    <Card.Body>
                        <div className='text-primary p-1'><img src="https://e7.pngegg.com/pngimages/663/779/png-clipart-blue-w-letter-weebly-logo-icons-logos-emojis-tech-companies.png" className="Logo_Login_Page" />eb Poster</div>
                        <h3 className='text-center pb-1 text-primary'>Sign Up</h3>

                        <Form className='m-4' hidden={hideForm1}>

                            <Form.Group className='SignUp_Labels_Inputs'>
                                <Form.Label className='m-auto w-50'>Email : </Form.Label>
                                <Form.Control className={errroEmail ? 'w-50 border-danger' : 'w-50 border-primary'} onChange={(e) => { checkValuesSellerEmail(); setEmail(e.target.value.slice(0, 30)) }} value={email} type="email" ref={emailRef} placeholder="Email..." />
                            </Form.Group>

                            {errroEmail && <p className='text-danger d-flex justify-content-center'>{errroEmail}</p>}

                            <Form.Group className='SignUp_Labels_Inputs'>
                                <Form.Label className='m-auto w-50'>Password : </Form.Label>
                                <Form.Control className={errorPasswords ? 'w-50 border-danger' : 'w-50 border-primary'} onChange={(e) => { checkPasswords(); setPassword(e.target.value.slice(0, 20)) }} value={password} type="password" ref={passwordRef} placeholder="Password..." />
                            </Form.Group>

                            <Form.Group className='SignUp_Labels_Inputs mb-2'>
                                <Form.Label className='m-auto w-50'>Confirm Password : </Form.Label>
                                <Form.Control className={errorPasswords ? 'w-50 border-danger' : 'w-50 border-primary'} onChange={(e) => { checkPasswords(); setConfirmPassword(e.target.value.slice(0, 20)) }} value={confirmPassword} type="password" ref={confirmpasswordRef} placeholder="Confirm Password..." />
                            </Form.Group>

                            {errorPasswords && <p className='text-danger d-flex justify-content-center'>{errorPasswords}</p>}

                            <Form.Group className='d-flex justify-content-center p-2'>
                                <Button disabled={errorPasswordsStatus && errroEmailStatus ? false : true} className='border_All_Buttons_BS w-25' onClick={() => {
                                    setHideForm1(true);
                                    setHideForm2(false);
                                }}>
                                    Next <i className="fa-solid fa-arrow-right"></i>
                                </Button>
                            </Form.Group>

                            <Form.Group className='d-flex justify-content-center pt-2'>
                                <p>Already have an account? <Link className='text-decoration-none' to="/Login">Login</Link></p>
                            </Form.Group>

                        </Form>

                        <Form onSubmit={handleSubmit} hidden={hideForm2}>

                            <div className='All_SignUp_Inputs_Img m-3'>
                                <div className='m-auto'>
                                    <div>
                                        <Form.Group className='d-flex justfiy-content-between m-2 Form_Group_Sign_Up'>
                                            <Form.Label className='m-auto w-50'>Name : </Form.Label>
                                            <Form.Control className={errorSellerName ? 'w-75 border-danger' : 'w-75 border-primary'} onChange={(e) => { checkValuesSellerName(); setName(e.target.value.slice(0, 12)) }} value={name} type="text" ref={NameRef} placeholder="Seller Name..." />
                                        </Form.Group>
                                        {errorSellerName && <p className='text-danger'>{errorSellerName}</p>}
                                    </div>

                                    <div>
                                        <Form.Group className='d-flex justfiy-content-between m-2 Form_Group_Sign_Up'>
                                            <Form.Label className='m-auto w-50'>Phone number : </Form.Label>
                                            <Form.Control className={errorSellerPhone ? 'w-75 border-danger' : 'w-75 border-primary'} onChange={(e) => { checkValuesSellerPhone(); setPhone(e.target.value.slice(0, 10)) }} value={phone} type="number" ref={PhoneRef} placeholder="Phone..." />
                                        </Form.Group>
                                        {errorSellerPhone && <p className='text-danger'>{errorSellerPhone}</p>}
                                    </div>

                                    <div>
                                        <Form.Group className='d-flex justfiy-content-between m-2 Form_Group_Sign_Up'>
                                            <Form.Label className='m-auto w-50'>BirthDate : </Form.Label>
                                            <Form.Control className='w-75 border-primary' onChange={(e) => { checkValuesSellerBirthDate(); setBirthDate(e.target.value); }} value={birthDate} type="date" ref={BirthDateRef} placeholder="BirthDate..." />
                                        </Form.Group>
                                    </div>

                                    <div>
                                        <Form.Group className='d-flex justfiy-content-between m-2 Form_Group_Sign_Up'>
                                            <Form.Label className='m-auto w-50'>Image URL : </Form.Label>
                                            <Form.Control className={errorSellerImg ? 'w-75 border-danger' : 'w-75 border-primary'} value={img} onChange={(e) => { checkValuesSellerImage(); setImg(e.target.value); }} type="text" ref={ImgRef} placeholder="Seller Image..." />
                                        </Form.Group>
                                        {errorSellerImg && <p className='text-danger'>{errorSellerImg}</p>}
                                    </div>
                                </div>
                                <div className='w-25 m-auto'>
                                    <img src={ImgRef.current?.value ? ImgRef.current?.value : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'} className='rounded-circle w-100 m-auto'/>
                                </div>
                            </div>

                            <Form.Group className='d-flex justify-content-between pt-4 m-2'>
                                <Button className='border_All_Buttons_BS' variant="secondary" onClick={() => {
                                    setHideForm1(false);
                                    setHideForm2(true);
                                }}>
                                    <i className="fa-solid fa-arrow-left"></i> Back
                                </Button>
                                {console.log(errorSellerImgStatus)}
                                {console.log(errorSellerNameStatus)}
                                {console.log(errorSellerPhoneStatus)}

                                <Button className='border_All_Buttons_BS' disabled={!errorSellerBirthDate && errorSellerImgStatus && errorSellerNameStatus && errorSellerPhoneStatus ? false : true} variant="primary" type="submit" onClick={() => {
                                    setHideForm1(false);
                                    setHideForm2(true);
                                }}>
                                    Sign Up <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                </Button>
                            </Form.Group>

                            <Form.Group className='d-flex justify-content-center pt-2'>
                                <p>Already have an account? <Link className='text-decoration-none' to="/Login">Login</Link></p>
                            </Form.Group>

                        </Form>

                    </Card.Body>

                </Card>

            </div>
        </>
    )
}
