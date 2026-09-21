import React, { useEffect } from 'react'
import Breadcrum from '../Components/Breadcrum'
import { Link, useNavigate } from 'react-router-dom'

export default function ErrorPage() {
    let navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("login")) {
            if (localStorage.getItem("role") === "Buyer" && window.location.pathname === "/profile")
                navigate(0)
            else if (localStorage.getItem("role") !== "Buyer" && window.location.pathname === "/admin")
                navigate(0)
        }
    }, [])
    return (
        <>
            <Breadcrum title="404! Page Not Found" />
            <div className="container-fluid py-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <i className="bi bi-exclamation-triangle display-1 text-primary"></i>
                            <h1 className="display-1">404</h1>
                            <h1 className="mb-4">Page Not Found</h1>
                            <p className="mb-4">We’re sorry, the page you have looked for does not exist in our website! Maybe go to
                                our home page or try to use a search?</p>
                            <Link className="btn btn-primary py-3 px-4" to="/">Go Back To Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
