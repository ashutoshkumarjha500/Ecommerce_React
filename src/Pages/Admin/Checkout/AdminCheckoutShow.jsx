import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';


import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'

import { deleteCheckout, getCheckout, updateCheckout } from "../../../Redux/ActionCreators/CheckoutActionCreators"
export default function AdminCheckoutShow() {
    let { id } = useParams()
    let [data, setData] = useState({})
    let [flag, setFlag] = useState(false)
    let [orderStatus, setOrderStatus] = useState("")
    let [paymentStatus, setPaymentStatus] = useState("")

    let CheckoutStateData = useSelector(state => state.CheckoutStateData)
    let dispatch = useDispatch()

    let navigate = useNavigate()

    function updateRecord() {
        if (window.confirm("Are You Sure to Change Status of That Record : ")) {
            data.orderStatus = orderStatus
            data.paymentStatus = paymentStatus
            dispatch(updateCheckout({ ...data }))
            setFlag(!flag)
        }
    }

    function getAPIData() {
        dispatch(getCheckout())
        if (CheckoutStateData.length) {
            let item = CheckoutStateData.find(x => x.id === id)
            if (item) {
                setData(item)
                setOrderStatus(item.orderStatus)
                setPaymentStatus(item.paymentStatus)
            }
            else
                navigate("/admin/Checkout")
        }
    }
    useEffect(() => {
        getAPIData()
    }, [CheckoutStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='border p-2 text-center'>Checkout</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <td>{data.id}</td>
                                    </tr>
                                    <tr>
                                        <th>Buyer</th>
                                        <td>
                                            <h6>{data.deliveryAddress?.name}</h6>
                                            <p>{data.deliveryAddress?.email}, {data.deliveryAddress?.phone}</p>
                                            <p>{data.deliveryAddress?.address}</p>
                                            <p>{data.deliveryAddress?.pin}, {data.deliveryAddress?.city}, {data.deliveryAddress?.state}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Order Status</th>
                                        <td>{data.orderStatus}
                                            {
                                                data.orderStatus !== "Delivered" ?
                                                    <select className='mt-3 form-select border-dark' onChange={(e) => setOrderStatus(e.target.value)} value={orderStatus}>
                                                        <option>Order is Placed</option>
                                                        <option>Order is Packed</option>
                                                        <option>Order is Ready to Ship</option>
                                                        <option>Order is Shipped</option>
                                                        <option>Order is In Transit</option>
                                                        <option>Order is Reached At the Final Delivery Station</option>
                                                        <option>Order is Out for Delivery</option>
                                                        <option>Delivered</option>
                                                    </select> : null
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Payment Mode</th>
                                        <td>{data.paymentMode}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Status</th>
                                        <td>{data.paymentStatus}
                                            {
                                                data.paymentStatus !== "Done" ?
                                                    <select className='mt-3 form-select border-dark' onChange={(e) => setPaymentStatus(e.target.value)} value={paymentStatus}>
                                                        <option>Pending</option>
                                                        <option>Done</option>
                                                    </select> : null
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>&#8377;{data.subtotal}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td>&#8377;{data.shipping}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>&#8377;{data.total}</td>
                                    </tr>
                                    <tr>
                                        <th>RPPID</th>
                                        <td>{data.rppid ? data.rppid : "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{new Date(data.date).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <th colSpan={2}>
                                            {data.orderStatus !== "Delivered" || data.paymentStatus === "Pending" ?
                                                <button className='btn btn-primary w-100' onClick={updateRecord}>Update Status</button> :
                                                null
                                            }
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h5 className='bg-primary text-center p-2 text-light mt-3'>Products in This Order</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Pic</th>
                                        <th>Brand</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.products?.map((x, index) => {
                                            return <tr key={index}>
                                                <td>{x.name}</td>
                                                <td>
                                                    <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${x.pic}`} target='_blank' rel='noreferrer'>
                                                        <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${x.pic}`} height={60} width={60} alt="" />
                                                    </Link>
                                                </td>
                                                <td>{x.brand}</td>
                                                <td>{x.color}</td>
                                                <td>{x.size}</td>
                                                <td>&#8377;{x.price}</td>
                                                <td>{x.qty}</td>
                                                <td>&#8377;{x.total}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
