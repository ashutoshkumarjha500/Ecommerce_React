import React from 'react'
import Breadcrum from '../../Components/Breadcrum'
import { Link } from 'react-router-dom'

export default function OrderConfirmationPage() {
  return (
    <>
      <Breadcrum title="Order Has Been Placed"/>

      <div className="container my-5">
          <div className="card p-5 text-center">
            <h1>Thank You</h1>
            <h2>Your Order Has Been Placed</h2>
            <h3>You Can Track Your Orders in Profile Page</h3>
            <div className="btn-group w-75 m-auto">
              <Link to="/shop" className='btn btn-primary'>Shop More</Link>
              <Link to="/profile?option=Orders" className='btn btn-success'>Profile</Link>
            </div>
          </div>
      </div>
    </>
  )
}
