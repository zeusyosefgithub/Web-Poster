import React, { Component } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import './Navigation.css'
import OffcanvasBar from "../Offcanvas/Offcanvas";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from "../../contexts/AuthContext";

export default function Navigation(props) {

    const { currentUser } = useAuth();

    return (
        <div id="Navgitaion_Dropdown">
            <div>
                <Navbar bg="black" id="Navigation__">
                    <Navbar.Toggle />
                    <Navbar.Collapse id='aaaaaa' className="d-flex justify-content-between">

                        <Nav>
                            <NavLink onClick={() => window.scrollTo(0,0)} id="Nav_Buttons" className="m-2 ms-5 bg-black text-white text-decoration-none fw-bold d-flex" to="/">
                                <p id='Nav_Options'>Home <i id='Icon_Buttons_Navgition' className="fa fa-home ms-1"></i></p>
                            </NavLink>
                        </Nav>

                        <Nav>
                            <NavLink onClick={() => window.scrollTo(0,0)} id="Nav_Buttons" className="m-2 bg-black text-white text-decoration-none fw-bold" to="/ListShops">
                                <p id='Nav_Options'>Shops <i id='Icon_Buttons_Navgition' className="fa fa-shopping-cart ms-1"></i></p>
                            </NavLink>
                        </Nav>

                        <Nav>
                            <NavLink onClick={() => window.scrollTo(0,0)} id="Nav_Buttons" className="m-2 bg-black text-white text-decoration-none fw-bold" to="/ListProducts">
                                <p id='Nav_Options'>Products <i id='Icon_Buttons_Navgition' className="fa fa-shopping-bag ms-1"></i></p>
                            </NavLink>
                        </Nav>

                        {
                            currentUser ?
                                <Nav key={currentUser.uid
                                }>
                                    <NavLink onClick={() => window.scrollTo(0,0)} id="Nav_Buttons" className="m-2 bg-black text-white text-decoration-none fw-bold" to="/Profile">
                                        <p id='Nav_Options'>Profile <i id='Icon_Buttons_Navgition' className="fas fa-user ms-1"></i></p>
                                    </NavLink>
                                </Nav>
                                : null
                        }

                        <Nav id="Nav_Buttons" className="m-2 me-5 bg-black text-white text-decoration-none fw-bold">
                            <OffcanvasBar Admins={props.Admins}/>
                        </Nav>

                    </Navbar.Collapse>

                </Navbar>
            </div>

            
        </div>
    )
}


