import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../Components/Breadcrum'

import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
import { createContactUs } from "../Redux/ActionCreators/ContactUsActionCreators"
import FormValidator from '../Validators/FormValidator'
export default function ContactusPage() {
    let [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mendatory",
        email: "Email Field is Mendatory",
        phone: "Phone Field is Mendatory",
        subject: "Subject Field is Mendatory",
        message: "Message Field is Mendatory"
    })
    let [show, setShow] = useState(false)
    let [message, setMessage] = useState("")

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: FormValidator(e) })
        setMessage("")
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            dispatch(createContactUs({ ...data, 'date': new Date(), 'status': true }))
            setMessage("Thank You For Contacting Us, Our Team Will Contact You Soon")
            setData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: ""
            })
            setErrorMessage({
                name: "Name Field is Mendatory",
                email: "Email Field is Mendatory",
                phone: "Phone Field is Mendatory",
                subject: "Subject Field is Mendatory",
                message: "Message Field is Mendatory"
            })
            setShow(false)
        }
    }

    let [setting, setSetting] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME,
        map1: import.meta.env.VITE_APP_MAP1,
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

    let SettingStateData = useSelector(state => state.SettingStateData)

    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                setSetting({
                    siteName: SettingStateData[0].siteName ? SettingStateData[0].siteName : setting.siteName,
                    map1: SettingStateData[0].map1 ? SettingStateData[0].map1 : setting.map1,
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
            <Breadcrum title="Contact Us" />
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="text-center wow fadeIn" data-wow-delay="0.1s">
                        <h1 className="mb-5">Have Any Query? <span className="text-uppercase text-primary bg-light px-2">Contact
                            Us</span></h1>
                    </div>
                    <div className="row mb-4">
                        <div className="col-lg-5">
                            <div className="card border-dark p-3 mb-1">
                                <div className='d-flex'>
                                    <div><i className='bi bi-house fs-1'></i></div>
                                    <div className='ms-4'>
                                        <h5>Address</h5>
                                        <Link to={setting.map2} target='_blank' rel='noreferrer'>{setting.address}</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-dark p-3 mb-1">
                                <div className='d-flex'>
                                    <div><i className='bi bi-envelope fs-1'></i></div>
                                    <div className='ms-4'>
                                        <h5>Email</h5>
                                        <Link to={`mailto:${setting.email}`} target='_blank' rel='noreferrer'>{setting.email}</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-dark p-3 mb-1">
                                <div className='d-flex'>
                                    <div><i className='bi bi-phone fs-1'></i></div>
                                    <div className='ms-4'>
                                        <h5>Phone</h5>
                                        <Link to={`tel:${setting.phone}`} target='_blank' rel='noreferrer'>{setting.phone}</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-dark p-3 mb-1">
                                <div className='d-flex'>
                                    <div><i className='bi bi-whatsapp fs-1'></i></div>
                                    <div className='ms-4'>
                                        <h5>Whatsapp</h5>
                                        <Link to={`mailto:${setting.whatsapp}`} target='_blank' rel='noreferrer'>{setting.whatsapp}</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex pt-2 mb-4">
                                <Link className="btn btn-outline-dark btn-square border-2 me-2" to={setting.twitter}><i
                                    className="text-dark fab fa-twitter"></i></Link>
                                <Link className="btn btn-outline-dark btn-square border-2 me-2" to={setting.facebook}><i
                                    className="text-dark fab fa-facebook-f"></i></Link>
                                <Link className="btn btn-outline-dark btn-square border-2 me-2" to={setting.youtube}><i
                                    className="text-dark fab fa-youtube"></i></Link>
                                <Link className="btn btn-outline-dark btn-square border-2 me-2" to={setting.instagram}><i
                                    className="text-dark fab fa-instagram"></i></Link>
                                <Link className="btn btn-outline-dark btn-square border-2 me-2" to={setting.linkedin}><i
                                    className="text-dark fab fa-linkedin-in"></i></Link>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            {message ? <p className='text-success text-center'>{message}</p> : null}
                            <div className="wow fadeIn" data-wow-delay="0.3s">
                                <form onSubmit={postData}>
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} onChange={getInputData} name="name" value={data.name} placeholder="Your Name" />
                                                <label htmlFor="name">Your Name</label>
                                                {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="email" className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} onChange={getInputData} name="email" placeholder="Your Email" value={data.email} />
                                                <label htmlFor="email">Your Email Address</label>
                                                {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="phone" className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} onChange={getInputData} name="phone" placeholder="Your phone" value={data.phone} />
                                                <label htmlFor="phone">Your Phone Number</label>
                                                {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} onChange={getInputData} name="subject" placeholder="Subject" value={data.subject} />
                                                <label htmlFor="subject">Subject</label>
                                                {show && errorMessage.subject ? <p className='text-danger'>{errorMessage.subject}</p> : null}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} onChange={getInputData} nameaceholder="Leave a message here" name="message" value={data.message}
                                                    style={{ height: "150px" }}></textarea>
                                                <label htmlFor="message">Message</label>
                                                {show && errorMessage.message ? <p className='text-danger'>{errorMessage.message}</p> : null}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className='w-100'>
                        <iframe src={setting.map1} className='w-100' height={300} frameborder="0"></iframe>
                    </div>
                </div>
            </div>
        </>
    )
}
