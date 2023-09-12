import React from 'react';
import './Inbox.css';
import { Card, Button } from 'react-bootstrap';
import { UpdateShop } from '../../Collections/ShopsCollection';

export default function InboxShops(props) {

  const ClearInbox = () => {
    let emptyInbox = []
    const Shop = {
      Shop_Name : props.Shop_Name,
      Shop_Img : props.Shop_Img,
      Shop_Inbox : emptyInbox,
      Shop_Disc : props.Shop_Disc,
      Shop_Location : props.Shop_Location,
      Shop_Kind : props.Shop_Kind
    }
    UpdateShop(Shop,props.Shop_Uid);
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
          props.Shop_Inbox.map((inbox) => {
            return <InboxShopss Inbox={inbox} />
          })
        }

      </Card.Body>
      <Card.Footer className="text-muted">{props.Shop_Name}</Card.Footer>
    </Card>
    </div>
  )
}

export function InboxShopss(props) {
  return (
    <div className='Inbox_Style'>
      <p className='m-5'>{props.Inbox}</p>
      <span id='Span_User_Comment' className="fas fa-user" />
    </div>
  )
}