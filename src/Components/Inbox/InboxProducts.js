import React, { useState } from 'react';
import './Inbox.css';
import { Card } from 'react-bootstrap';
import { UpdateInboxProducts } from '../../Collections/ProductsCollection';
import { useAuth } from '../../contexts/AuthContext';
import EditProduct from '../EditProduct/EditProduct';

export default function InboxProducts(props) {

  const { currentUser } = useAuth();

  const ClearInbox = () => {
    UpdateInboxProducts(props.Shop_Uid, props.Shop_Products);
  }

  return (
    <div className='d-flex justify-content-around mt-5'>
      <div>
        <h3 className='text-primary pb-5'>Options Inbox</h3>
        <p onClick={ClearInbox} className='Clear_All_Messages'>Clear Inbox</p>
      </div>
      <Card id='Card_Inbox_Shop' className="text-center">
        <Card.Header>Shop Inbox</Card.Header>
        <Card.Body>

          {
            props.Shop_Products.map((prod) => {
              return prod.Product_Inbox.map((inbox, i) => {
                return <div key={i}><Inbox
                  Product_Id={i}
                  Product_Inbox={prod.Product_Inbox}
                  Product_Kind={prod.Product_Kind}
                  Product_Name={prod.Product_Name}
                  Product_Img={prod.Product_Img}
                  Product_Price={prod.Product_Price}
                  Product_IsOffer={prod.Product_IsOffer}
                  Product_NewPrice={prod.Product_NewPrice}
                  Inbox={inbox} /></div>
              })
            })
          }

        </Card.Body>
        <Card.Footer className="text-muted">{props.Shop_Name}</Card.Footer>
      </Card>
    </div>
  )
}

export function Inbox(props) {

  const [editModalShow, setEditModalShow] = useState(false);
  const editModalClose = () => setEditModalShow(false);

  return (
    <div className='Inbox_Style'>
      <p onClick={() => setEditModalShow(true)} id='See_Product_Inbox' className='ms-5 font-weight-bold'>See Product</p>
      <EditProduct
        product_id={props.Product_Id}
        product_inbox={props.Product_Inbox}
        product_kind={props.Product_Kind}
        product_name={props.Product_Name}
        product_img={props.Product_Img}
        product_price={props.Product_Price}
        Product_IsOffer={props.Product_IsOffer}
        Product_NewPrice={props.Product_NewPrice}
        show={editModalShow}
        onHide={editModalClose}
      />
      <p className='ms-5'>{props.Inbox}</p>
      <span id='Span_User_Comment' className="fas fa-user" />
    </div>
  )
}
