import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Offcanvas.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { GetShops } from '../../Collections/ShopsCollection';
import { CloseButton } from 'react-bootstrap';
import { CheckUserAdmin, GetAdmins } from '../../Collections/AdminsCollection';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';




export default function OffcanvasBar(props) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const { currentUser, logout} = useAuth();
  const history = useNavigate();
  const [loading,setLoading] = useState(false);

  const admins = GetAdmins();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleLogout() {
    setError('');
    try {
      setLoading(true);
      await logout();  
      setLoading(false);
      history('/');
      window.location.reload();
      window.scrollTo(0,0);
    }
    catch {
      setError('Failed to Log In')
    }
  }

  function getMyShop() {
    let shops = GetShops();
    let res = false;
    let shopName = '';
    shops.map((shop) => {
      if (currentUser && currentUser.uid === shop.id) {
        res = true;
        shopName = shop.Shop_Name;
      }
    })
    if (res) {
      return <Link to={"/Shop/" + shopName} onClick={() => handleClose()}><div className='New_Icons_CurrentUser'>
      <div id='Text_Icon_Button'>My Shop</div><div id='Icon_Button' className="fa-solid fa-store"></div>
      </div></Link>
    }
    else if(currentUser) {
      return <Link to="/NewShop"><div className='New_Icons_CurrentUser' onClick={() => {handleClose();window.scrollTo(0,0)}}>
      <div id='Text_Icon_Button'>Create Shop</div><div id='Icon_Button' className="fa-solid fa-plus"></div>
      </div></Link>
    }
  }


  return (
    <>
      {loading ? <LoadingSpinner logout /> : null}
      <p id="Offcav" onClick={handleShow}>Menu <i id='Icon_Button_Offac' className="fas fa-bars ms-1"></i></p>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header id='Offcanvas_titel'>
          <Offcanvas.Title>Menu</Offcanvas.Title>
          <CloseButton variant='white' onClick={handleClose}/>
        </Offcanvas.Header>
        <Offcanvas.Body className='Offcav_Body'>

          <div id="Links_Buttons">

            {
              currentUser
                ?
                <Link to="/Profile" onClick={() => { handleClose(); window.scrollTo(0, 0) }}><div className='New_Icons_CurrentUser'>
                  <div id='Text_Icon_Button'>Profile</div><div id='Icon_Button' className="fas fa-user"></div>
                </div></Link>
                :
                null
            }

            {
              getMyShop()
            }

            {
              CheckUserAdmin(props.Admins,currentUser?.uid) 
              ?
              <Link to="/AdminPanel" onClick={() => { handleClose(); window.scrollTo(0, 0) }}><div className='New_Icons_CurrentUser'>
                  <div id='Text_Icon_Button'>Admin Panel</div><div id='Icon_Button' className="fa-solid fa-user-tie"></div>
              </div></Link>
              :
              null
            }

            <Link to="/" onClick={() => { handleClose(); window.scrollTo(0, 0) }}><div className='New_Icons_CurrentUser'>
              <div id='Text_Icon_Button'>Home</div><div id='Icon_Button' className="fa fa-home"></div>
            </div></Link>

            <Link to="/ListProducts" onClick={() => {handleClose();window.scrollTo(0,0)}}><div className='New_Icons_CurrentUser'>
              <div id='Text_Icon_Button'>Products</div><div id='Icon_Button' className="fa fa-shopping-bag"></div>
            </div></Link>

            <Link to="/ListShops" onClick={() => {handleClose();window.scrollTo(0,0)}}><div className='New_Icons_CurrentUser'>
              <div id='Text_Icon_Button'>Shops</div><div id='Icon_Button' className="fa fa-shopping-cart"></div>
            </div></Link>

            <Link to="/" onClick={() => {handleClose();window.scrollTo(0,0)}}><div className='New_Icons_CurrentUser'>
              <div id='Text_Icon_Button'>Who As</div><div id='Icon_Button' className="fa fa-users"></div>
            </div></Link>

            <Link to="/" onClick={() => {handleClose();window.scrollTo(0,0)}}><div className='New_Icons_CurrentUser'>
              <div id='Text_Icon_Button'>Contact As</div><div id='Icon_Button' className="fa fa-phone"></div>
            </div></Link>

            <Link to="/" onClick={() => {handleClose();window.scrollTo(0,0)}}><div className='New_Icons_CurrentUser'>
              <div id='Text_Icon_Button'>Report</div><div id='Icon_Button' className="fa fa-comment"></div>
            </div></Link>

            {
              !currentUser
                ?
                <Link to="/SignUp" onClick={() => { handleClose(); window.scrollTo(0, 0) }}><div className='New_Icons_CurrentUser'>
                  <div id='Text_Icon_Button'>SignUp</div><div id='Icon_Button' className="fa-solid fa-user-plus"></div>
                </div></Link>
                :
                null
            }

          </div>

          {
            currentUser
              ?
              <div className='Logout'><Button className='Logout_Button_Offcanvas' onClick={() => {handleLogout();handleClose();}}>Logout <i className="fas fa-sign-out-alt"></i></Button></div>
              :
              <div className='Logout'><Link to="/Login" style={{ textDecoration: "none" }}>
                <Button onClick={() => {handleClose();window.scrollTo(0,0);handleClose()}} className='Login_Logout_Button_Offcanvas'>Login <i className="fas fa-sign-in-alt"></i></Button>
              </Link></div>
          }

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}