import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
export default function Navbar() {
    let [siteName, setSiteName] = useState(import.meta.env.VITE_APP_SITE_NAME)

    let SettingStateData = useSelector(state => state.SettingStateData)

    let dispatch = useDispatch()

    let navigate = useNavigate()
    function logout() {
        localStorage.clear()
        navigate("/login")
    }

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length && SettingStateData[0].siteName) {
                setSiteName(SettingStateData[0].siteName)
            }
        })()
    }, [SettingStateData.length])
    return (
        <div className="container-fluid sticky-top">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light border-bottom border-2 border-white">
                    <Link to="/" className="navbar-brand">
                        <h1>{siteName}</h1>
                    </Link>
                    <button type="button" className="navbar-toggler ms-auto me-0" data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto">
                            <Link to="/" className="nav-item nav-link active">Home</Link>
                            <Link to="/about" className="nav-item nav-link">About</Link>
                            <Link to="/shop" className="nav-item nav-link">Shop</Link>
                            <Link to="/features" className="nav-item nav-link">Features</Link>
                            <Link to="/testimonials" className="nav-item nav-link">Testimonial</Link>
                            <Link to="/faq" className="nav-item nav-link">Faq</Link>
                            <Link to="/contactus" className="nav-item nav-link">Contact</Link>
                            {
                                localStorage.getItem("login") ?
                                    <>
                                        <div className="nav-item dropdown">
                                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{localStorage.getItem("name")}</a>
                                            <div className="dropdown-menu bg-light mt-2">
                                                <Link to="/profile" className="dropdown-item">Profile</Link>
                                                {localStorage.getItem("role") !== "Buyer" ? <Link to="/admin" className="dropdown-item">Admin Dashboard</Link> : null}
                                                <Link to="/cart" className="dropdown-item">Cart</Link>
                                                <Link to="/checkout" className="dropdown-item">Checkout</Link>
                                                <button onClick={logout} className="dropdown-item">Logout</button>
                                            </div>
                                        </div>
                                    </> : <Link to="/login" className="nav-item nav-link text-danger">Login</Link>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}
