import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/storeContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {

    const [data,setData] = useState([]);
    const {url,token} = useContext(StoreContext);

    const fetchOrders = async()=>{
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data);
        
    }

    useEffect(()=>{
        if (token){
            fetchOrders();
        }
    },[token])

  return (
    <div className="orders-container">
      {data
      .slice() // Create a copy of the array to avoid mutating the original data
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date in descending order
      .map((order) => (
        <div className="order-card" key={order._id}>
          <div className="order-card-header">
            <img src={assets.parcel_icon} alt="" />
            <button className='btn' onClick={fetchOrders}>Track Order</button>
            </div>
          <h3>Order ID: {order._id}</h3>
          <p><strong>Order Date:</strong> {new Date(order.date).toLocaleString()}</p>
          <p><strong>Amount:</strong> ${order.amount}</p>
          <p className='status'><strong>Status:</strong> {order.status}</p>
          <div className="order-items">
            <h4>Items Ordered:</h4>
            {order.items.length > 0 ? (
              order.items.map((item) => (
                <div className="order-item" key={item._id}>
                  <img
                    src={url+"/images/"+item.image}
                    alt={item.name}
                    className="item-image"
                  />
                  <div className="item-details">
                    <p><strong>Name:</strong> {item.name}</p>
                    <p><strong>Category:</strong> {item.category}</p>
                    <p><strong>Description:</strong> {item.description}</p>
                    <p><strong>Price:</strong> ${item.price}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No items found</p>
            )}
          </div>
          
        </div>
      ))}
    </div>
  )
}

export default MyOrders