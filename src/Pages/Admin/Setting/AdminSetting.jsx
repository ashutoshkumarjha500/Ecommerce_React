import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';


import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'

import { createSetting, getSetting, updateSetting } from "../../../Redux/ActionCreators/SettingActionCreators"
export default function AdminSetting() {
    let [data, setData] = useState({
        map1: "",
        map2: "",
        address: "",
        email: "",
        phone: "",
        whatsapp: "",
        siteName: "",
        facebook: "",
        twitter: "",
        linkedin: "",
        instagram: "",
        youtube: ""
    })
    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    function postData(e) {
        e.preventDefault()
        if (SettingStateData.length) {
            dispatch(updateSetting({ ...data }))
            alert("Record Has Been Updated")
        }
        else {
            dispatch(createSetting({ ...data }))
            alert("Record Has Been Created")
        }
    }

    function getAPIData() {
        dispatch(getSetting())
        if (SettingStateData.length) {
            setData({ ...data, ...SettingStateData[0] })
        }
    }
    useEffect(() => {
        getAPIData()
    }, [SettingStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='border p-2 text-center'>Setting</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Google Map1</label>
                                    <input type="text" name="map1" value={data.map1} onChange={getInputData} placeholder='Google Map1' className='form-control' />
                                </div>
                                <div className="col-12 mb-3">
                                    <label>Google Map2</label>
                                    <input type="text" name="map2" value={data.map2} onChange={getInputData} placeholder='Google Map2' className='form-control' />
                                </div>
                                <div className="col-12 mb-3">
                                    <label>Address</label>
                                    <input type="text" name="address" value={data.address} onChange={getInputData} placeholder='Address' className='form-control' />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Site Name</label>
                                    <input type="text" name="siteName" value={data.siteName} onChange={getInputData} placeholder='Site Name' className='form-control' />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Email</label>
                                    <input type="email" name="email" value={data.email} onChange={getInputData} placeholder='Email Address' className='form-control' />
                                </div>


                                <div className="col-md-6 mb-3">
                                    <label>Phone</label>
                                    <input type="text" name="phone" value={data.phone} onChange={getInputData} placeholder='Phone Number' className='form-control' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Whatsapp</label>
                                    <input type="text" name="whatsapp" value={data.whatsapp} onChange={getInputData} placeholder='Whatsapp' className='form-control' />
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Facebook Profile Page URL</label>
                                    <input type="url" name="facebook" value={data.facebook} onChange={getInputData} placeholder='Facebook Profile Page URL' className='form-control' />
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Twitter Profile Page URL</label>
                                    <input type="url" name="twitter" value={data.twitter} onChange={getInputData} placeholder='Twitter Profile Page URL' className='form-control' />
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Linkedin Profile Page URL</label>
                                    <input type="url" name="linkedin" value={data.linkedin} onChange={getInputData} placeholder='Linkedin Profile Page URL' className='form-control' />
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Instagram Profile Page URL</label>
                                    <input type="url" name="instagram" value={data.instagram} onChange={getInputData} placeholder='Instagram Profile Page URL' className='form-control' />
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Youtube Profile Page URL</label>
                                    <input type="url" name="youtube" value={data.youtube} onChange={getInputData} placeholder='Youtube Profile Page URL' className='form-control' />
                                </div>

                                <div className="col-12 mb-3">
                                    <button type="submit" className='btn btn-primary w-100'>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
