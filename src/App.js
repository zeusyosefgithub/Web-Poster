import './App.css';
import Home from './Pages/Home/Home';
import Navigation from './Components/Navigation/Navigation';
import ShopPages from './Pages/ShopPages/ShopPages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import ListShops from './Pages/ListShops/ListShops';
import ListProducts from './Pages/ListProducts/ListProducts';
import Signup from './Pages/LoginForm/Signup';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';
import Login from './Pages/LoginForm/Login';
import Profile from './Pages/Profile/Profile';
import NewShop from './Pages/NewShop/NewShop';
import { GetShops } from './Collections/ShopsCollection';
import Footer from './Components/Footer/Footer';
import InboxProducts from './Components/Inbox/InboxProducts';
import InboxShops from './Components/Inbox/InboxShops';
import { auth } from './FireBase/firebase';
import { GetSellers } from './Collections/SellersCollection';
import ProductsSeller from './Pages/ProductsSeller/ProductsSeller';
import { GetProducts } from './Collections/ProductsCollection';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import { GetAdmins,CheckUserAdmin } from './Collections/AdminsCollection';
import AdminPanel from './Pages/Admin/AdminPanel';
import ForgetPassword from './Pages/LoginForm/ForgetPassword';


export default function App(props) {

  const currentUser = auth.currentUser;
  const shops = GetShops();
  const sellers = GetSellers();
  const Products = GetProducts();
  const admins = GetAdmins();


  const IsHasShop = () => {
    let res = false;
    shops.map((shop) => {
      if (currentUser && shop.id === currentUser.uid) {
        res = true;
      }
    })
    return res;
  }

  const getShop = () => {
    let Cshop = {};
    shops.map((shop) => {
      if (currentUser && shop.id === currentUser.uid) {
        Cshop = {
          Name: shop.Shop_Name,
          Disc: shop.Shop_Disc,
          Kind: shop.Shop_Kind,
          Location: shop.Shop_Location,
          Img: shop.Shop_Img,
          Inbox: shop.Shop_Inbox
        }
      }
    })
    return Cshop;
  }

  const getSeller = () => {
    let seller = {};
    sellers.map((sellers) => {
      if (currentUser && sellers.id === currentUser.uid) {
        seller = {
          Name: sellers.Name,
          BirthDate: sellers.BirthDate,
          Phone: sellers.Phone,
          Img: sellers.Img
        }
      }
    })
    return seller;
  }

  const getProductsSeller = (id) => {
    let ProductsSeller = [];
    Products.map((products) => {
      if (products.id === id) {
        products.Products.map((prod) => {
          ProductsSeller.push(prod)
        })
      }
    })
    return ProductsSeller;
  }

  const getOffersSeller = (id) => {
    const offers = {
      offersProducts: [],
      offersProductsId: []
    };
    Products.map((products) => {
      if (products.id === id) {
        products.Products.map((prod, i) => {
          if (prod.Product_IsOffer) {
            offers.offersProducts.push(prod);
            offers.offersProductsId.push(i);
          }
        })
      }
    })
    return offers;
  }

  const getAllOffers = () => {
    let offers = [];
    Products.map((products) => {
      products.Products.map((prod, i) => {
        if (prod.Product_IsOffer) {
          offers.push(prod);
        }
      })
    })
    return offers;
  }

  const getAdmins = () => {
    let adminsList = [];
    admins.map((admin) => {
      adminsList.push(admin.id);
    })
    return adminsList;
  }

  const CheckUserAdminWithId = (admins,id) => {
    let res = false;
    admins.map((admin) => {
        if(admin.id === id){
            res = true;
        }
    })
    return res;
  }

  return (

    <AuthProvider>
      <Container>
        <BrowserRouter>
          <div id="Margining_From_NavBar">
            <Navigation Admins={getAdmins()}/>
          </div>
          <Routes>

            <Route exact path='/' element={<Home shopssss={shops} Offers={getAllOffers()} />} />
            <Route path='/ListShops' element={<ListShops />} />
            <Route path='/ListProducts' element={<ListProducts />} />
            
            
            <Route element={<PrivateRoute ForrgetPassword/>}>
              <Route path='/ForgetPassword' element={<ForgetPassword/>}/>
            </Route>

            <Route element={<PrivateRoute SignUpLogIn/>}>
              <Route path='/Login' element={<Login />} />
              <Route path='/SignUp' element={<Signup />} />
            </Route>

            <Route element={<PrivateRoute Profile/>}>
              <Route path='/Profile' element={<Profile email={currentUser && currentUser.email} Seller={getSeller()} Shop={getShop()} />} />
            </Route>

            <Route element={<PrivateRoute AdminPanel CheckUserAdminWithId={CheckUserAdminWithId(admins,currentUser && currentUser.uid)}/>}>
              <Route path='/AdminPanel' element={<AdminPanel products={Products} sellers={sellers} shops={shops} Admins={getAdmins()}/>}/>
            </Route>



            {
              shops.map((shop, i) => {
                return <Route key={i} path={"/Shop/" + shop.Shop_Name}
                  element={<ShopPages
                    Shop_Uid={shop.id}
                    Shop_Name={shop.Shop_Name}
                    Shop_Img={shop.Shop_Img}
                    Shop_Kind={shop.Shop_Kind}
                    Shop_Disc={shop.Shop_Disc}
                    Shop_Location={shop.Shop_Location}
                    Shop_Inbox={shop.Shop_Inbox}
                    Shop_Offers={getOffersSeller(shop.id).offersProducts}
                    Shop_Numbers_Offers={getOffersSeller(shop.id).offersProductsId}
                    shop_products_seller={getProductsSeller(shop.id)}/>}
                />

              })
            }

            // Private / Protected Routes

            <Route element={<PrivateRoute NewShop={true} IsHasShop={IsHasShop} shop_name={getShop().Name}/>}>
              <Route path='/NewShop' element={<NewShop />} />
            </Route>

            {
              shops.map((shop,i) => {
                return <Route key={i} element={<PrivateRoute CheckUserAdminWithId={CheckUserAdminWithId(admins,currentUser && currentUser.uid)} IbnboxesShops IsHasShop={IsHasShop} Uid={shop.id}/>}>

                  <Route key={shop.id} path={'/Inbox/Shops/' + shop.Shop_Name}
                    element={<InboxShops
                      Shop_Uid={shop.id}
                      Shop_Name={shop.Shop_Name}
                      Shop_Img={shop.Shop_Img}
                      Shop_Kind={shop.Shop_Kind}
                      Shop_Disc={shop.Shop_Disc}
                      Shop_Location={shop.Shop_Location}
                      Shop_Inbox={shop.Shop_Inbox} />}
                  />

                  <Route key={shop.id} path={'/Inbox/Products/' + shop.Shop_Name}
                    element={<InboxProducts
                      Shop_Uid={shop.id}
                      Shop_Name={shop.Shop_Name}
                      Shop_Img={shop.Shop_Img}
                      Shop_Kind={shop.Shop_Kind}
                      Shop_Disc={shop.Shop_Disc}
                      Shop_Location={shop.Shop_Location}
                      Shop_Inbox={shop.Shop_Inbox}
                      Shop_Products={getProductsSeller(shop.id)} />}
                  />

                  <Route key={shop.id} path={'/Profile/Products/' + shop.Shop_Name}
                    element={<ProductsSeller
                      Shop_Uid={shop.id}
                      Shop_Name={shop.Shop_Name}
                      Shop_Img={shop.Shop_Img}
                      Shop_Kind={shop.Shop_Kind}
                      Shop_Disc={shop.Shop_Disc}
                      Shop_Location={shop.Shop_Location}
                      Shop_Inbox={shop.Shop_Inbox}
                      Shop_Offers={getOffersSeller(shop.id).offersProducts}
                      Shop_Numbers_Offers={getOffersSeller(shop.id).offersProductsId}
                      shop_products_seller={getProductsSeller(shop.id)}/>}
                  />

                </Route>
              })
            }



          </Routes>
        </BrowserRouter>
        <Footer />
      </Container>
    </AuthProvider>

  );
}