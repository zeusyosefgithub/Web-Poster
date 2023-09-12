import './ProductsSeller.css';
import React, { useState } from 'react';
import ShowProducts from '../../Components/ShowProducts/ShowProducts';
import NavKinds from '../../Components/NavKinds/NavKinds';
import { useAuth } from '../../contexts/AuthContext';
import Product from '../../Components/Product/Product';
import { NavDropdown, Modal, CloseButton, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DeleteAllOffers, DeleteAllProducts, RemoveAllOffers } from '../../Collections/ProductsCollection';
import { DeleteShop } from '../../Collections/ShopsCollection';
import AddProduct from '../../Components/AddProduct/AddProduct';

export default function ProductsSeller(props) {

  const { currentUser } = useAuth();
  const [addModalShow, setAddModalShow] = useState(false);
  const [sortKindOffers, setSortKindOffers] = useState('Normal');
  const [showDeleteAll, setShowDeleteAll] = useState(false);
  const handleCloseDeleteAll = () => setShowDeleteAll(false);
  const handleShowDeleteAll = () => setShowDeleteAll(true);
  const [showDeleteAllKind, setShowDeleteAllKind] = useState('');
  const [sortKind, setSortKind] = useState('Normal');
  const [loading, setLoading] = useState(false);

  const deleteAllProducts = () => {
    setLoading(true);
    if (showDeleteAllKind === 'Remove All Offers') {
      RemoveAllOffers(props.shop_products_seller, currentUser.uid);
    }
    else if (showDeleteAllKind === 'Delete My Shop') {
      DeleteShop(currentUser.uid);
      DeleteAllProducts(currentUser.uid);
    }
    else if (showDeleteAllKind === 'Delete All Offers') {
      DeleteAllOffers(props.shop_products_seller, currentUser.uid);
    }
    else if (showDeleteAllKind === 'Delete All Products') {
      DeleteAllProducts(currentUser.uid);
    }
    setLoading(false);
  }

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  function makeLowestHighest(arrayProducts) {
    let makeLowestHighest = arrayProducts?.sort(
      (productsA, productB) => {
        return productsA.Products_Price - productB.Products_Price;
      }
    )
    return makeLowestHighest;
  }

  function makeHighestLowest(arrayProducts) {
    let makeHighestLowest = arrayProducts?.sort(
      (productsA, productB) => {
        return productB.Products_Price - productsA.Products_Price;
      }
    )
    return makeHighestLowest;
  }

  const renderOffersSellerProducts = () => {
    let makeOffersShuffel = [];
    props.Shop_Offers.map((prod, i) => {
      makeOffersShuffel.push(<div key={i}>
        <Product
          IsInPage
          Product_Id={props.Shop_Numbers_Offers[i]}
          IsSellerInPage
          Product_NewPrice={prod.Product_NewPrice}
          Product_IsOffer={prod.Product_IsOffer}
          Product_Name={prod.Product_Name}
          Product_Img={prod.Product_Img}
          Product_Kind={prod.Product_Kind}
          Product_Price={prod.Product_Price}
          Product_Inbox={prod.Product_Inbox} />
      </div>)
    })
    const shuffeld = shuffle(makeOffersShuffel);
    const lowestHighest = makeLowestHighest(makeOffersShuffel);
    const highestLowest = makeHighestLowest(makeOffersShuffel);

    if (sortKindOffers === 'Normal') {
      return makeOffersShuffel;
    }
    else if (sortKindOffers === 'From lowest price to highest') {
      return highestLowest;
    }
    else if (sortKindOffers === 'From highest price to lowest') {
      return lowestHighest;
    }
    else {
      return shuffeld;
    }
  }

  return (
    <div>
      <div>
        <div className="mt-5">

          {
            props.Shop_Offers.length
              ?
              <>
                <div>
                  <NavKinds noPadding kind={'Offers'} />
                </div>

                <div className="d-flex justify-content-center">
                    <div className="Shop_Options">
                      <div>
                        <table className="w-100">
                          <tbody>
                            <tr className="Add_Product" onClick={() => { handleShowDeleteAll(); setShowDeleteAllKind('Remove All Offers'); }}>
                              <td className="w-100">Remove All Offers</td>
                              <td><i className="fa-solid fa-minus m-auto"></i></td>
                            </tr>
                            <tr className="Add_Product" onClick={() => { handleShowDeleteAll(); setShowDeleteAllKind('Delete All Offers'); }}>
                              <td className="w-100">Delete All Offers</td>
                              <td><i className="fa-solid fa-trash m-auto"></i></td>
                            </tr>
                            <Link onClick={() => window.scrollTo(0, 0)} to={'/Inbox/Products/' + props.Shop_Name} className='text-decoration-none'><tr className="Add_Product">
                              <td className="w-100">See Inbox Products</td>
                              <td><i className="fa-solid fa-inbox m-auto"></i></td>
                            </tr></Link>
                          </tbody>
                        </table>
                      </div>
                      <div className="d-flex Add_Product">
                        <NavDropdown className="w-100 Z_Index_Kind_Sort" title="Sort" id="dropdown-basic">
                          <NavDropdown.Item onClick={() => setSortKindOffers('Normal')} className='text-primary'><div className="fa-solid fa-sort m-auto pe-2" />Normal</NavDropdown.Item>
                          <NavDropdown.Item onClick={() => setSortKindOffers('Random')} className='text-primary' ><div className="fa-solid fa-sort m-auto pe-2" />Random</NavDropdown.Item>
                          <NavDropdown.Item onClick={() => setSortKindOffers('From lowest price to highest')} className='text-primary'><div className="fa-solid fa-sort m-auto pe-2" />From lowest price to highest</NavDropdown.Item>
                          <NavDropdown.Item onClick={() => setSortKindOffers('From highest price to lowest')} className='text-primary' ><div className="fa-solid fa-sort m-auto pe-2" />From highest price to lowest</NavDropdown.Item>
                        </NavDropdown><i className="fa-solid fa-sort m-auto"></i>
                      </div>
                    </div>
                  </div>

                <div className="container_Products_Shops mt-3">
                  {
                    renderOffersSellerProducts()
                  }
                </div>
              </>
              :
              null
          }


        </div>
      </div>
      <div>
        <div className="Shop_Products mt-3">
          <div>
            <NavKinds noPadding kind={'Products'} />
          </div>



          <div className="d-flex justify-content-center">
            <div className="Shop_Options">
              <div>
                <table className="w-100">
                  <tbody>
                    <tr className="Add_Product" onClick={() => setAddModalShow(true)}>
                      <td className="w-100">Add Product </td>
                      <td><i className="fa-solid fa-plus m-auto"></i></td>
                    </tr>
                    <tr className="Add_Product" onClick={() => { handleShowDeleteAll(); setShowDeleteAllKind('Delete All Products'); }}>
                      <td className="w-100">Delete All Products</td>
                      <td><i className="fa-solid fa-trash m-auto"></i></td>
                    </tr>
                    <Link onClick={() => window.scrollTo(0, 0)} to={'/Inbox/Products/' + props.Shop_Name} className='text-decoration-none'><tr className="Add_Product">
                      <td className="w-100">See Inbox Products</td>
                      <td><i className="fa-solid fa-inbox m-auto"></i></td>
                    </tr></Link>
                  </tbody>
                </table>
              </div>
              <div className="d-flex Add_Product">
                <NavDropdown className="w-100 Z_Index_Kind_Sort" title="Sort" id="dropdown-basic">
                  <NavDropdown.Item onClick={() => setSortKind('Normal')} className='text-primary'><div className="fa-solid fa-sort m-auto pe-2" />Normal</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => setSortKind('Random')} className='text-primary' ><div className="fa-solid fa-sort m-auto pe-2" />Random</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => setSortKind('From lowest price to highest')} className='text-primary'><div className="fa-solid fa-sort m-auto pe-2" />From lowest price to highest</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => setSortKind('From highest price to lowest')} className='text-primary' ><div className="fa-solid fa-sort m-auto pe-2" />From highest price to lowest</NavDropdown.Item>
                </NavDropdown><i className="fa-solid fa-sort m-auto"></i>
              </div>

            </div>
          </div>
          <div>
            <ShowProducts sort_kind={sortKind} Shop_Name={props.Shop_Name} Shop_Uid={props.Shop_Uid} IsInPage={true} />
          </div>
        </div>
      </div>
      <Modal className='bg-primary bg-opacity-10' show={showDeleteAll} onHide={handleCloseDeleteAll}
        centered aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header className='text-center bg-black text-white'>
          <Modal.Title className='w-100'>Delete Product {props.Product_Name}</Modal.Title>
          <CloseButton variant="white" onClick={handleCloseDeleteAll} />
        </Modal.Header>

        <Modal.Body>
          {
            showDeleteAllKind === 'Delete All Products'
              ?
              <p>are you shure that you want to delete All the Products from the shop!?</p>
              :
              showDeleteAllKind === 'Delete All Offers'
                ?
                <p>are you shure that you want to delete All the Offers of the products from the shop!?</p>
                :
                showDeleteAllKind === 'Remove All Offers'
                  ?
                  <p>are you shure that you want to remove All the Offers of the products!?</p>
                  :
                  <p>Are you shure that you want to delete your shop!? <br />Thats mean your shop and products will be delete from the site.</p>
          }
        </Modal.Body>

        <Modal.Footer>
          <Button className='border_All_Buttons_BS' variant="secondary" onClick={handleCloseDeleteAll}>
            Cancel
          </Button>
          <Button className='border_All_Buttons_BS' variant="danger" onClick={() => { deleteAllProducts(); handleCloseDeleteAll() }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <AddProduct shop_name={props.Shop_Name} shop_kind={props.Shop_Kind} show={addModalShow} onHide={() => setAddModalShow(false)} />
    </div>
  )
}