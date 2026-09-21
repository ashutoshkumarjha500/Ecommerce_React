import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { createNewsletter, getNewsletter } from "../Redux/ActionCreators/NewsletterActionCreators"
import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
export default function Footer() {
    let [setting, setSetting] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME,
        map2: import.meta.env.VITE_APP_MAP2,
        address: import.meta.env.VITE_APP_ADDRESS,
        email: import.meta.env.VITE_APP_EMAIL,
        phone: import.meta.env.VITE_APP_PHONE,
        whatsapp: import.meta.env.VITE_APP_WHATSAPP,
        twitter: import.meta.env.VITE_APP_TWITTER,
        facebook: import.meta.env.VITE_APP_FACEBOOK,
        youtube: import.meta.env.VITE_APP_YOUTUBE,
        instagram: import.meta.env.VITE_APP_INSTAGRAM,
        linkedin: import.meta.env.VITE_APP_LINKEDIN,
    })

    let [email, setEmail] = useState("")
    let [message, setMessage] = useState("")

    let NewsletterStateData = useSelector(state => state.NewsletterStateData)
    let SettingStateData = useSelector(state => state.SettingStateData)

    let dispatch = useDispatch()

    function postData(e) {
        e.preventDefault()
        let item = NewsletterStateData.find(x => x.email === email)
        if (item) {
            setMessage({
                error: "Email Address Already Registered With Us"
            })
        }
        else {
            dispatch(createNewsletter({ email: email, status: true }))
            setMessage("Thanks To Subscribe Our Newsletter Service")
            setEmail("")
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getNewsletter())
        })()
    }, [NewsletterStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                setSetting({
                    siteName: SettingStateData[0].siteName ? SettingStateData[0].siteName : setting.siteName,
                    map2: SettingStateData[0].map2 ? SettingStateData[0].map2 : setting.map2,
                    address: SettingStateData[0].address ? SettingStateData[0].address : setting.address,
                    email: SettingStateData[0].email ? SettingStateData[0].email : setting.email,
                    phone: SettingStateData[0].phone ? SettingStateData[0].phone : setting.phone,
                    whatsapp: SettingStateData[0].whatsapp ? SettingStateData[0].whatsapp : setting.whatsapp,
                    twitter: SettingStateData[0].twitter ? SettingStateData[0].twitter : setting.twitter,
                    facebook: SettingStateData[0].facebook ? SettingStateData[0].facebook : setting.facebook,
                    youtube: SettingStateData[0].youtube ? SettingStateData[0].youtube : setting.youtube,
                    instagram: SettingStateData[0].instagram ? SettingStateData[0].instagram : setting.instagram,
                    linkedin: SettingStateData[0].linkedin ? SettingStateData[0].linkedin : setting.linkedin,
                })
            }
        })()
    }, [SettingStateData.length])
    return (
        <>
            <div className="container-fluid bg-primary newsletter p-0">
                <div className="container p-0">
                    <div className="row g-0 align-items-center">
                        <div className="col-md-5 ps-lg-0 text-start wow fadeIn" data-wow-delay="0.2s">
                            <img className="img-fluid w-100" src="/images/banner2.jpg" alt="" />
                        </div>
                        <div className="col-md-7 py-5 newsletter-text wow fadeIn" data-wow-delay="0.5s">
                            <div className="p-5">
                                <h1 className="mb-5">Subscribe the <span
                                    className="text-uppercase text-primary bg-white px-2">Newsletter</span></h1>
                                <p className={`text-center ${message.error ? 'text-danger' : 'text-success'}`}>{message.error ? message.error : message}</p>
                                <form onSubmit={postData}>
                                    <div className="position-relative w-100 mb-2">
                                        <input className="form-control border-0 w-100 ps-4 pe-5" required name='email' onChange={(e) => setEmail(e.target.value)} value={email} type="email"
                                            placeholder="Enter Your Email" style={{ height: "60px" }} />
                                        <button type="submit" className="btn shadow-none position-absolute top-0 end-0 mt-2 me-2"><i
                                            className="fa fa-paper-plane text-primary fs-4"></i></button>
                                    </div>
                                </form>
                                <p className="mb-0">Subscribe Our Newsletter Service to Get Updated Related to New Products Update, Best Offers and Much More</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-dark text-white-50 footer pt-5">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.1s">
                            <a href="index.html" className="d-inline-block mb-3">
                                <h1 className="text-white">{setting.siteName}</h1>
                            </a>
                            <p className="mb-0 text-light">ShopStudio is your one-stop online store offering trendy fashion, gadgets, and home essentials. We focus on quality, affordability, and fast delivery, ensuring a smooth and satisfying shopping experience every time.</p>
                        </div>
                        <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.3s">
                            <h5 className="text-white mb-4">Get In Touch</h5>
                            <p><Link className='text-light' to={setting.map2} target='_blank' rel='noreferrer'><i className="fs-5 fa fa-map-marker me-3"></i>{setting.address}</Link></p>
                            <p><Link className='text-light' to={`mailto:${setting.email}`} target='_blank' rel='noreferrer'><i className="fs-5 fa fa-envelope me-3"></i>{setting.email}</Link></p>
                            <p><Link className='text-light' to={`phone:${setting.phone}`} target='_blank' rel='noreferrer'><i className="fs-5 fa fa-phone me-3"></i>{setting.phone}</Link></p>
                            <p><Link className='text-light' to={`https://wa.me/${setting.whatsapp}`} target='_blank' rel='noreferrer'><i className="fs-5 fa fa-whatsapp me-3"></i>{setting.whatsapp}</Link></p>
                            <div className="d-flex pt-2">
                                <Link className="btn btn-outline-light btn-square border-2 me-2" to={setting.twitter}><i
                                    className="text-light fab fa-twitter"></i></Link>
                                <Link className="btn btn-outline-light btn-square border-2 me-2" to={setting.facebook}><i
                                    className="text-light fab fa-facebook-f"></i></Link>
                                <Link className="btn btn-outline-light btn-square border-2 me-2" to={setting.youtube}><i
                                    className="text-light fab fa-youtube"></i></Link>
                                <Link className="btn btn-outline-light btn-square border-2 me-2" to={setting.instagram}><i
                                    className="text-light fab fa-instagram"></i></Link>
                                <Link className="btn btn-outline-light btn-square border-2 me-2" to={setting.linkedin}><i
                                    className="text-light fab fa-linkedin-in"></i></Link>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-2 wow fadeIn" data-wow-delay="0.5s">
                            <h5 className="text-white mb-4">Popular Link</h5>
                            <Link className="btn btn-link text-light" to="/">Home</Link>
                            <Link className="btn btn-link text-light" to="/about">About Us</Link>
                            <Link className="btn btn-link text-light" to="/shop">Shop</Link>
                            <Link className="btn btn-link text-light" to="/features">Features</Link>
                            <Link className="btn btn-link text-light" to="/contactus">Contact Us</Link>
                        </div>
                        <div className="col-md-6 col-lg-2 wow fadeIn" data-wow-delay="0.7s">
                            <h5 className="text-white mb-4">Our Services</h5>
                            <Link className="btn btn-link text-light" to="/testimonials">Testimonials</Link>
                            <Link className="btn btn-link text-light" to="/faq">FAQ</Link>
                            <Link className="btn btn-link text-light" to="#">T&C</Link>
                            <Link className="btn btn-link text-light" to="#">Privacy policy</Link>
                            <Link className="btn btn-link text-light" to="#">Refund policy</Link>
                        </div>
                    </div>
                </div>
                <div className="container wow fadeIn" data-wow-delay="0.1s">
                    <div className="copyright">
                        <div className="row">
                            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                &copy; <Link className="border-bottom" to="#!">{setting.siteName}</Link>, All Right Reserved.
                            </div>
                            <div className="col-md-6 text-center text-md-end">
                                <div className="footer-menu">
                                    <Link className='text-light' to="/">Home</Link>
                                    <Link className='text-light' to="/services">About</Link>
                                    <Link className='text-light' to="/shop">Shop</Link>
                                    <Link className='text-light' to="/features">Features</Link>
                                    <Link className='text-light' to="/faq">FAQs</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
