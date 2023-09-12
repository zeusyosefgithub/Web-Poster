import React,{useEffect, useState} from 'react';
import { Outlet, Navigate , useNavigate} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Modal,CloseButton,Button } from 'react-bootstrap';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';

const PrivateRoute = (props) => {

    const { currentUser } = useAuth();
    const [showExp,setShowExp] = useState(true);

    const [checkUserAdminWithId,setCheckUserAdminWithId] = useState({...props.CheckUserAdminWithId});

    useEffect(() => {
        setCheckUserAdminWithId(props.CheckUserAdminWithId);
    },[props.CheckUserAdminWithId])

    if(props.ForrgetPassword && currentUser){
        return <GetEpectionMessage history={"/Profile"} MessageExp={'sorry your account already in useing if you want to rest password update them from (Profile > Edit profile).'} showExp={showExp} onHide={() => setShowExp(false)}/>
    }
    else if (props.NewShop && currentUser && props.IsHasShop()) {
        return <GetEpectionMessage history={"/Shop/" + props.shop_name} MessageExp={'sorry you already have a shop.'} showExp={showExp} onHide={() => setShowExp(false)}/>
    }
    else if(props.AdminPanel && !currentUser || props.AdminPanel && currentUser && !checkUserAdminWithId){
        return <GetEpectionMessage history={"/"} MessageExp={'sorry you dont have a permission for admin panel.'} showExp={showExp} onHide={() => setShowExp(false)}/>
    }
    else if (props.SignUpLogIn && currentUser) {
        return <GetEpectionMessage history={"/"} MessageExp={'sorry you already have logged in with account.'} showExp={showExp} onHide={() => setShowExp(false)}/>
    }
    else if (props.IbnboxesShops && currentUser && !props.IsHasShop() || props.IbnboxesShops && !currentUser || props.IbnboxesShops && currentUser && props.IsHasShop() && currentUser.uid !== props.Uid) {
        return <GetEpectionMessage history={props.CheckUserAdminWithId ? '/AdminPanel' : "/"} MessageExp={props.CheckUserAdminWithId ? 'Admins can see the info of sellers from (Admin Panel > Sellers List)' : 'sorry you not the owned of this page.'} showExp={showExp} onHide={() => setShowExp(false)}/>
    }
    else if (props.Profile && !currentUser){
        return <GetEpectionMessage history={'/SignUp'} MessageExp={'Sorry you have to create a new account to open this page.'} showExp={showExp} onHide={() => setShowExp(false)}/>
    }
    else {
        return <Outlet />
    }
}

export default PrivateRoute;

export function GetEpectionMessage(props) {

    const history = useNavigate();

    return (
        <Modal className='bg-primary bg-opacity-10' show={props.showExp} onHide={() => {props.onHide();history(props.history)}}
            centered aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header className='text-center bg-black text-white'>
                <Modal.Title className='w-100'>Error</Modal.Title>
                <CloseButton variant="white" onClick={() => {props.onHide();history(props.history)}} />
            </Modal.Header>
            <Modal.Body>
                
                <p className='text-danger'>{props.MessageExp}</p>

            </Modal.Body>
            <Modal.Footer>
                <Button className='border_All_Buttons_BS p-2 pe-4 ps-4' variant="primary" onClick={() => {props.onHide();history(props.history)}}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

