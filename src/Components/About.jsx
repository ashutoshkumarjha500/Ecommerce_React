import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
    return (
        <div className="container-fluid py-5">
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-6 wow fadeIn" data-wow-delay="0.1s">
                                <img className="img-fluid" src="/images/p2.jpg" alt="" />
                            </div>
                            <div className="col-6 wow fadeIn" data-wow-delay="0.3s">
                                <img className="img-fluid h-75" src="/images/p3.jpg" alt="" />
                                <div className="h-25 d-flex align-items-center text-center bg-primary px-4">
                                    <h4 className="text-white lh-base mb-0">Award Winning Plateform</h4>
                                </div>
                            </div>
                            <div className='w-100' style={{ height: 200 }}>
                                <img src="/images/banner6.jpg" className='w-100 h-100' alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                        <h1 className="mb-5"><span className="text-uppercase text-primary bg-light px-2">About</span>Us - {import.meta.env.VITE_APP_SITE_NAME}</h1>
                        <p className="mb-4">Welcome to {import.meta.env.VITE_APP_SITE_NAME}, your trusted destination for quality products at unbeatable prices. We bring together the latest trends in fashion, tech gadgets, and home essentials, all in one convenient online store. Our mission is to make online shopping effortless, enjoyable, and affordable for everyone. With a focus on premium quality, secure transactions, and quick delivery, we strive to provide an unmatched shopping experience that keeps you coming back. Shop smart, shop easy — only at {import.meta.env.VITE_APP_SITE_NAME}.</p>
                        <p className="mb-5">{import.meta.env.VITE_APP_SITE_NAME} is your go-to online store for trendy, reliable, and affordable products. We prioritize quality, fast delivery, and customer satisfaction to make your shopping journey smooth and enjoyable.</p>
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <h6 className="mb-3"><i className="fa fa-check text-primary me-2"></i>Award Winning</h6>
                                <h6 className="mb-0"><i className="fa fa-check text-primary me-2"></i>100% Genuin Products</h6>
                            </div>
                            <div className="col-sm-6">
                                <h6 className="mb-3"><i className="fa fa-check text-primary me-2"></i>24/7 Support</h6>
                                <h6 className="mb-0"><i className="fa fa-check text-primary me-2"></i>Upto 90% Off</h6>
                            </div>
                        </div>
                        <div className="d-flex align-items-center mt-5">
                            <Link className="btn btn-primary px-4 me-2" to="/about">Read More</Link>
                            <Link className="btn btn-outline-primary btn-square border-2 me-2" to={import.meta.env.VITE_APP_FACEBOOK} target='_blank' rel='noreferrer'><i
                                className="fab fa-facebook-f"></i></Link>
                            <Link className="btn btn-outline-primary btn-square border-2 me-2" to={import.meta.env.VITE_APP_TWITTER} target='_blank' rel='noreferrer'><i
                                className="fab fa-twitter"></i></Link>
                            <Link className="btn btn-outline-primary btn-square border-2 me-2" to={import.meta.env.VITE_APP_INSTAGRAM} target='_blank' rel='noreferrer'><i
                                className="fab fa-instagram"></i></Link>
                            <Link className="btn btn-outline-primary btn-square border-2 me-2" to={import.meta.env.VITE_APP_LINKEDIN} target='_blank' rel='noreferrer'><i
                                className="fab fa-linkedin-in"></i></Link>
                            <Link className="btn btn-outline-primary btn-square border-2" to={import.meta.env.VITE_APP_YOUTUBE} target='_blank' rel='noreferrer'><i
                                className="fab fa-youtube"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
