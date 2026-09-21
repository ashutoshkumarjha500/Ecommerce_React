import React, { useEffect, useState } from 'react'
import Breadcrum from '../../Components/Breadcrum'
import { Link, useSearchParams } from 'react-router-dom'
import Profile from '../../Components/Buyer/Profile'
import UpdateProfile from '../../Components/Buyer/UpdateProfile'
import Address from '../../Components/Buyer/Address'
import Wishlist from '../../Components/Buyer/Wishlist'
import Orders from '../../Components/Buyer/Orders'

export default function ProfilePage() {
    let [searchParams] = useSearchParams()
    let [option, setOption] = useState("Home")

    useEffect(() => {
        setOption(searchParams.get("option") ?? "Home")
    }, [searchParams])
    return (
        <>
            <Breadcrum title="Profile" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="list-group">
                            <button type="button" className={`list-group-item list-group-item-action ${option === "Home" ? 'active' : ''}`} onClick={() => setOption("Home")}>Home</button>
                            <button type="button" className={`list-group-item list-group-item-action ${option === "Update" ? 'active' : ''}`} onClick={() => setOption("Update")}>Update Profile</button>
                            <button type="button" className={`list-group-item list-group-item-action ${option === "Address" ? 'active' : ''}`} onClick={() => setOption("Address")}>Manage Address</button>
                            <button type="button" className={`list-group-item list-group-item-action ${option === "Wishlist" ? 'active' : ''}`} onClick={() => setOption("Wishlist")}>Wishlist</button>
                            <button type="button" className={`list-group-item list-group-item-action ${option === "Orders" ? 'active' : ''}`} onClick={() => setOption("Orders")}>Orders</button>
                            <Link to="/cart" className={`list-group-item list-group-item-action`}>Cart</Link>
                            <Link to="/checkout" className="list-group-item list-group-item-action">Checkout</Link>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className={`${option === "Home" ? 'd-block' : 'd-none'}`}>
                            <Profile />
                        </div>
                        <div className={`${option === "Update" ? 'd-block' : 'd-none'}`}>
                            <UpdateProfile setOption={setOption} />
                        </div>
                        <div className={`${option === "Address" ? 'd-block' : 'd-none'}`}>
                            <Address />
                        </div>
                        <div className={`${option === "Wishlist" ? 'd-block' : 'd-none'}`}>
                            <Wishlist />
                        </div>
                        <div className={`${option === "Orders" ? 'd-block' : 'd-none'}`}>
                            <Orders />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
