import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';

import { getCheckout } from "../../Redux/ActionCreators/CheckoutActionCreators"
import { getTestimonial, createTestimonial, updateTestimonial } from "../../Redux/ActionCreators/TestimonialActionCreators"
export default function Orders() {
  let [orders, setOrders] = useState([])
  let [reviews, setReviews] = useState([])

  let CheckoutStateData = useSelector(state => state.CheckoutStateData)
  let TestimonialStateData = useSelector(state => state.TestimonialStateData)
  let dispatch = useDispatch()

  let [showModal, setShowModal] = useState(false)
  let [option, setOption] = useState("Create")

  let [data, setData] = useState({
    message: "",
    star: 5
  })

  function getInputData(e) {
    let { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  function postData(e) {
    e.preventDefault()
    if (option === "Create") {
      dispatch(createTestimonial({
        message: data.message,
        star: parseInt(data.star),
        product: data.product,
        user: localStorage.getItem("userid"),
        name: localStorage.getItem("name")
      }))
      getAPIData()
    }
    else {
      dispatch(updateTestimonial({
        id: data.id,
        message: data.message,
        star: parseInt(data.star),
        product: data.product,
        user: data.user,
        name: data.name
      }))
      getAPIData()
    }
    toast(`Review Has Been ${option === "Create" ? "Created" : "Updated"}!!!`)
    setShowModal(false)
  }

  function create(pid) {
    setOption("Create")
    setData({
      message: "",
      star: 5,
      product: pid
    })
    setShowModal(true)
  }

  function update(id) {
    let item = reviews.find(x => x.id === id)
    setOption("Update")
    setData({
      id: id,
      message: item.message,
      star: item.star,
      product: item.product,
      user: item.user,
      name: item.name
    })
    setShowModal(true)
  }

  function check(pid) {
    let item = reviews.find(x => x.product === pid)
    return item ? item.id : false
    
  }


  function getAPIData() {
    dispatch(getTestimonial())
    if (TestimonialStateData.length) {
      setReviews(TestimonialStateData.filter(x => x.user === localStorage.getItem("userid")))
    }
  }
  useEffect(() => {
    getAPIData()
  }, [TestimonialStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getCheckout())
      if (CheckoutStateData.length) {
        setOrders(CheckoutStateData.filter(x => x.user === localStorage.getItem("userid")))
      }
    })()
  }, [CheckoutStateData.length])
  return (
    <>
      <h5 className='bg-primary text-center p-2 text-light'>Your Orders</h5>
      {
        orders.map((item) => {
          return <div key={item.id} className='card p-3 mb-3'>
            <div className="row">
              <div className="col-lg-4">
                <div className="table-responsive">
                  <table className='table table-bordered'>
                    <tbody>
                      <tr>
                        <th>Order Id</th>
                        <td>{item.id}</td>
                      </tr>
                      <tr>
                        <th>Order Status</th>
                        <td>{item.orderStatus}</td>
                      </tr>
                      <tr>
                        <th>Payment Mode</th>
                        <td>{item.paymentMode}</td>
                      </tr>
                      <tr>
                        <th>Payment Status</th>
                        <td>{item.paymentStatus}</td>
                      </tr>
                      <tr>
                        <th>Subtotal</th>
                        <td>&#8377;{item.subtotal}</td>
                      </tr>
                      <tr>
                        <th>Shipping</th>
                        <td>&#8377;{item.shipping}</td>
                      </tr>
                      <tr>
                        <th>Total</th>
                        <td>&#8377;{item.total}</td>
                      </tr>
                      <tr>
                        <th>Date</th>
                        <td>{new Date(item.date).toLocaleDateString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-lg-8">
                <h5 className='bg-primary p-2 text-center text-light'>Products in Order</h5>
                <div className="table-responsive">
                  <table className='table table-bordered'>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Pic</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        item.products?.map((x, index) => {
                          return <tr key={index}>
                            <td>{x.name}</td>
                            <td>
                              <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${x.pic}`} target='_blank' rel='noreferrer'>
                                <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${x.pic}`} height={60} width={60} alt="" />
                              </Link>
                            </td>
                            <td>&#8377;{x.price}</td>
                            <td>{x.qty}</td>
                            <td>&#8377;{x.total}</td>
                            <td><Link to={`/product/${x.product}`} className='btn btn-primary'>Buy Again</Link></td>
                            <td>{item.orderStatus === "Delivered" ? check(x.product) ? <button className='btn btn-dark' onClick={() => update(check(x.product))}>Update Review</button> : <button className='btn btn-dark' onClick={() => create(x.product)}>Write Review</button> : null}</td>
                          </tr>
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        })
      }


      <ToastContainer />

      <div className={`modal fade ${showModal ? 'show d-block' : 'd-none'}`} id="exampleModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={postData}>
                <div className="row">
                  <div className="mb-3 col-12">
                    <textarea name="message" onChange={getInputData} value={data.message} rows={5} className='form-control' placeholder='Please Write About the Product'></textarea>
                  </div>
                  <div className="mb-3 col-6">
                    <select name="star" onChange={getInputData} value={data.star} className='form-select'>
                      <option>5</option>
                      <option>4</option>
                      <option>3</option>
                      <option>2</option>
                      <option>1</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary w-100">{option}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
