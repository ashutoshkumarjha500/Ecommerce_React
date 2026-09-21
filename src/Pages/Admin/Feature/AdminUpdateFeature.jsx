import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link, useNavigate, useParams } from 'react-router-dom'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'

import FormValidator from "../../../Validators/FormValidator"

import { getFeature, updateFeature } from "../../../Redux/ActionCreators/FeatureActionCreators"
export default function AdminUpdateFeature() {
    let { id } = useParams()
    let [data, setData] = useState({
        name: "",
        icon: "",
        shortDescription: "",
        status: true
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        icon: "",
        shortDescription: "",
    })
    let [show, setShow] = useState(false)

    let FeatureStateData = useSelector(state => state.FeatureStateData)
    let dispatch = useDispatch()

    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target

        setErrorMessage(old => {
            return {
                ...old,
                [name]: FormValidator(e)
            }
        })

        setData(old => {
            return {
                ...old,
                [name]: name === "status" ? (value === "1" ? true : false) : value
            }
        })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            let item = FeatureStateData.find(x => x.id !== id && x.name.toLocaleLowerCase() === data.name.toLocaleLowerCase())
            if (item) {
                setShow(true)
                setErrorMessage(old => {
                    return {
                        ...old,
                        'name': 'Feature With This Name Already Exist'
                    }
                })
            }
            else {
                dispatch(updateFeature({ ...data }))

                // let formData = new FormData()
                // formData.append("_id", data._id)
                // formData.append("name", data.name)
                // formData.append("icon", data.icon)
                // formData.append("shortDescription", data.shortDescription)
                // formData.append("status", data.status)
                // dispatch(updateFeature(formData))

                navigate("/admin/feature")
            }
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getFeature())
            if (FeatureStateData.length) {
                let item = FeatureStateData.find(x => x.id == id)
                if (item)
                    setData({ ...data, ...item })
                else
                    navigate("/admin/feature")
            }
        })()
    }, [FeatureStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='border p-2 text-center'>Update Feature <Link to="/admin/feature"> <i className='fa fa-arrow-left float-end'></i></Link></h5>

                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Name' className={`${show && errorMessage.name ? 'border-danger' : ''} form-control`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>

                                 <div className="col-12 mb-3">
                                    <label>Short Description*</label>
                                    <textarea type="text" name="shortDescription" value={data.shortDescription} onChange={getInputData} placeholder='Short Description' rows={3} className={`${show && errorMessage.shortDescription ? 'border-danger' : ''} form-control`}></textarea>
                                    {show && errorMessage.shortDescription ? <p className='text-danger'>{errorMessage.shortDescription}</p> : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Icon*</label>
                                    <input type="text" name="icon" value={data.icon} onChange={getInputData} placeholder='eg. <i class="fab-fa-list"></i>' className={`${show && errorMessage.icon ? 'border-danger' : ''} form-control`} />
                                    {show && errorMessage.icon ? <p className='text-danger'>{errorMessage.icon}</p> : null}
                                </div>


                                <div className="col-lg-6 mb-3">
                                    <label>Status*</label>
                                    <select name="status" onChange={getInputData} value={data.status ? "1" : "0"} className='form-select'>
                                        <option value="1">Active</option>
                                        <option value="0">Inctive</option>
                                    </select>
                                </div>

                                <div className="col-12 mb-3">
                                    <button type="submit" className='btn btn-primary w-100'>Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
