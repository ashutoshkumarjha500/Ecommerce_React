import React, { useState } from 'react'
import Breadcrum from '../Components/Breadcrum'
import FormValidator from '../Validators/FormValidator'
import { Link, useNavigate } from 'react-router-dom'

export default function SignupPage() {
    let [data, setData] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        cpassword: '',
        role: "Buyer"
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Full Name Field is Mendatory",
        username: "User Name Field is Mendatory",
        email: "Email Address Field is Mendatory",
        phone: "Phone Number Field is Mendatory",
        password: "Password Field is Mendatory"
    })
    let [show, setShow] = useState(false)

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: FormValidator(e) })
    }

    let navigate = useNavigate()

    async function postData(e) {
        e.preventDefault()

        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else if (data.password !== data.cpassword) {
            setShow(true)
            setErrorMessage({ ...errorMessage, 'password': 'Password and Confirm Password Does Not Matched' })
        }
        else {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`)
            response = await response.json()

            let item = response.find(x => x.username === data.username || x.email === data.email)
            if (item) {
                setShow(true)
                setErrorMessage({
                    ...errorMessage,
                    'username': item.username === data.username ? "Username Already Used" : "",
                    'email': item.email === data.email ? "Email Address Already Used" : ""
                })
            }
            else {
                let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        name: data.name,
                        username: data.username,
                        email: data.email,
                        phone: data.phone,
                        password: data.password,
                        role: data.role,
                        status: true
                    })
                })
                response = await response.json()
                navigate("/login")
            }
        }
    }
    return (
        <>
            <Breadcrum title="Signup" />
            <div className="container my-5">
                <h5 className='text-center p-2 bg-primary text-light'>Create Free Account</h5>
                <form onSubmit={postData}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Name*</label>
                            <input type="text" name="name" onChange={getInputData} placeholder='Full Name' className={`${show && errorMessage.name ? 'border-danger' : 'border-dark'} form-control`} />
                            {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Phone*</label>
                            <input type="text" name="phone" onChange={getInputData} placeholder='Phone Number' className={`${show && errorMessage.phone ? 'border-danger' : 'border-dark'} form-control`} />
                            {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Username*</label>
                            <input type="text" name="username" onChange={getInputData} placeholder='Username' className={`${show && errorMessage.username ? 'border-danger' : 'border-dark'} form-control`} />
                            {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Email*</label>
                            <input type="email" name="email" onChange={getInputData} placeholder='Email Address' className={`${show && errorMessage.email ? 'border-danger' : 'border-dark'} form-control`} />
                            {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Password*</label>
                            <input type="password" name="password" onChange={getInputData} placeholder='Password' className={`${show && errorMessage.password ? 'border-danger' : 'border-dark'} form-control`} />
                            {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : null}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Confirm Password*</label>
                            <input type="password" name="cpassword" onChange={getInputData} placeholder='Confirm Password' className={`${show && errorMessage.password ? 'border-danger' : 'border-dark'} form-control`} />
                        </div>

                        <div className="col-12 mb-3">
                            <button type="submit" className='btn btn-primary w-100'>Signup</button>
                        </div>
                    </div>
                </form>
                <div>
                    <Link to="/login">Already Have an Account? Login</Link>
                </div>
            </div>
        </>
    )
}
