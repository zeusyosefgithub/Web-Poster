import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate , Link } from 'react-router-dom';
import { Button,Form,Card } from 'react-bootstrap';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';

export default function ForgetPassword() {

    const { restPassword } = useAuth();
    const emailRef = useRef();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState('');
    const [message,setMasseage] = useState('');
    const [errorEmail,setErrorEmail] = useState(false);
    const [errormeassageEmail,setErrorMessageEmail] = useState('');
    const history = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            setError('');
            setLoading(true);
            await restPassword(emailRef.current.value);
            setMasseage('Check your inbox to reset.');
        }
        catch{
            setError('Invalid email address.');
            setMasseage('');
        }
        setLoading(false);
    }

    const checkEmai = () => {
        if(!emailRef.current.value){
            setErrorEmail(true);
            setErrorMessageEmail('');
        }
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailRef.current.value)){
            setErrorEmail(true);
            setErrorMessageEmail('Enter an vaild email.');
        }
        else{
            setErrorEmail(false);
            setErrorMessageEmail('');
        }
    }

    return (
        <div className='mt-5 d-flex justify-content-center'>
            {loading && <LoadingSpinner/>}
            <Card id='Login_Page_Card' className='border border-primary'>

                <Card.Body>
                    <div className='text-primary p-1'><img src="https://e7.pngegg.com/pngimages/663/779/png-clipart-blue-w-letter-weebly-logo-icons-logos-emojis-tech-companies.png" className="Logo_Login_Page" />eb Poster</div>
                    <h3 className='text-center mb-4 text-primary'>Login</h3>

                    <Form onSubmit={handleSubmit}>

                        <Form.Group className='d-flex justfiy-content-between m-3'>
                            <Form.Label className='m-auto w-50'>Email : </Form.Label>
                            <Form.Control value={email} onChange={(e) => {setEmail(e.target.value);checkEmai()}} className={errormeassageEmail ? 'border-danger' : 'border-primary'} type="email" name="Email" ref={emailRef} placeholder="Email..." />
                        </Form.Group>

                        {error && <p className='d-flex justify-content-center text-danger'>{error}</p>}
                        {message && <p className='d-flex justify-content-center text-success'>{message}</p>}
                        {errormeassageEmail && <p className='d-flex justify-content-center text-danger'>{errormeassageEmail}</p>}

                        <Form.Group className='d-flex justify-content-center p-2'>
                            <Button disabled={errorEmail} className='border_All_Buttons_BS w-25' type="submit">
                                Reset
                            </Button>
                        </Form.Group>

                        <Link className='text-decoration-none' to="/Login"><Button className='border_All_Buttons_BS' variant="secondary">
                            <i className="fa-solid fa-arrow-left"></i> Back
                        </Button></Link>

                    </Form>

                </Card.Body>

            </Card>
        </div>
    )
}