import React from 'react';
import './Footer.css';

export default function Footer(prop) {
    return (
        <div className='Footer_Web_Poster'>
            <hr className="mx-0 px-0" />
            <footer className=''>
                <div className="row justify-content-around">
                    <div className=" col-11">
                        <div id="Options_Footer" className="row justify-content-center">
                            <div className="col-md-3 col-12 font-italic align-items-center mt-md-3 mt-4">
                                <h5><span><img src="https://e7.pngegg.com/pngimages/663/779/png-clipart-blue-w-letter-weebly-logo-icons-logos-emojis-tech-companies.png" className="img-fluid mb-2"/>
                                </span><b className="text-dark">eb Poster</b>
                                </h5>
                                <p className="social mt-md-3 mt-2"> <span><i className="fa fa-facebook " aria-hidden="true"></i></span> <span><i className="fa fa-linkedin" aria-hidden="true"></i></span> <span><i className="fa fa-twitter" aria-hidden="true"></i></span> </p> <small className="copy-rights cursor-pointer">&#9400; Web Poster For Shops.</small><br /> <small>Web Poster. </small>
                            </div>
                            <div className="col-md-3 col-12 my-sm-0 mt-5">
                                <ul className="list-unstyled">
                                    <li className="mt-md-3 mt-4">Sellers</li>
                                    <li>Many Kinds To Sell</li>
                                    <li>Core Features</li>
                                    <li>Product Features</li>
                                </ul>
                            </div>
                            <div className="col-md-3 col-12 my-sm-0 mt-5">
                                <ul className="list-unstyled">
                                    <li className="mt-md-3 mt-4">Products</li>
                                    <li>Many Products</li>
                                    <li>Many Kinds Of Products</li>
                                    <li>Make Shop And Upload Products</li>
                                </ul>
                            </div>
                            <div className="col-xl-auto col-md-3 col-12 my-sm-0 mt-5">
                                <ul className="list-unstyled">
                                    <li className="mt-md-3 mt-4">Shops</li>
                                    <li>Any One Can Be With As</li>
                                    <li>Any One Can Make Shop</li>
                                    <li>Make Your Shop Now</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}