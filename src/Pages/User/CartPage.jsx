import React from 'react'
import Breadcrum from '../../Components/Breadcrum'
import Cart from '../../Components/Buyer/Cart'

export default function CartPage() {
    return (
        <>
            <Breadcrum title="Cart" />
            <div className="container-fluid my-3">
                <h5 className='bg-primary text-light text-center p-2'>Your Cart</h5>
                <Cart title="cart" />
            </div>
        </>
    )
}
