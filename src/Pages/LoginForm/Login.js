import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Col, Row } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './LoginForm.css';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';


export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            setIsLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            setIsLoading(false);      
            history('/');
            window.location.reload(); 
        }
        catch {
            setIsLoading(false);
            setLoading(false);
            setError('Failed to log in');
        }
    }

    return (
        <>
            {isLoading ? <LoadingSpinner /> : null}
            <div className='d-flex justify-content-center mt-5'>
                <Card id='Login_Page_Card' className='border border-primary'>

                    <Card.Body>
                        <div className='text-primary p-1'><img src="https://e7.pngegg.com/pngimages/663/779/png-clipart-blue-w-letter-weebly-logo-icons-logos-emojis-tech-companies.png" className="Logo_Login_Page" />eb Poster</div>
                        <h3 className='text-center mb-4 text-primary'>Login</h3>

                        <Form onSubmit={handleSubmit}>

                            <Form.Group className='d-flex justfiy-content-between m-3'>
                                <Form.Label className='m-auto w-50'>Email : </Form.Label>
                                <Form.Control className={error ? 'border-danger' : 'border-primary'} type="email" name="Email" ref={emailRef} required placeholder="Email..." />
                            </Form.Group>

                            <Form.Group className='d-flex justfiy-content-between m-3'>
                                <Form.Label className='m-auto w-50'>Password : </Form.Label>
                                <Form.Control className={error ? 'border-danger' : 'border-primary'} type="password" name="Password" ref={passwordRef} required placeholder="Password..." />
                            </Form.Group>

                            {error && <p className='d-flex justify-content-center text-danger'>{error}</p>}

                            <Form.Group className='d-flex justify-content-center p-2'>
                                <Button disabled={loading} className='border_All_Buttons_BS w-25' type="submit">
                                    Login
                                </Button>
                            </Form.Group>

                            <Form.Group className='d-flex justify-content-center pt-2'>
                                <p>need an account? <Link className='text-decoration-none' to="/SignUp">Sign Up</Link></p>
                            </Form.Group>

                            <Form.Group className='d-flex justify-content-center pt-2'>
                                <p><Link className='text-decoration-none' to="/ForgetPassword">Forget password?</Link></p>
                            </Form.Group>

                        </Form>

                    </Card.Body>

                </Card>
            </div>
        </>
    )
}
