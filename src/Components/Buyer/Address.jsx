import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import FormValidator from '../../Validators/FormValidator'

export default function Address() {
  let [option, setOption] = useState("Create")
  let [showModal, setShowModal] = useState(false)

  let errorOptions = {
    name: 'Name Field is Mendatory',
    email: 'Email Address Field is Mendatory',
    phone: "Phone Number Field is Mendatory",
    address: "Address Field is Mendatory",
    pin: "Pin Code is Mendatory",
    city: "City Name is Mendatory",
    state: "State Name is Mendatory"
  }
  let dataOptions = {
    name: "",
    email: "",
    phone: "",
    address: "",
    pin: "",
    city: "",
    state: ""
  }
  let [data, setData] = useState(dataOptions)
  let [errorMessage, setErrorMessage] = useState(errorOptions)
  let [show, setShow] = useState(false)
  let [address, setAddress] = useState([])

  function getInputData(e) {
    let { name, value } = e.target
    setErrorMessage({ ...errorMessage, [name]: FormValidator(e) })
    setData({ ...data, [name]: value })
  }

  async function deleteRecord(id) {
    if (window.confirm("Are Your Sure to Delete That Record")) {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/address/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      toast("Address Has Been Deleted!!!")
      setAddress(address.filter(x => x.id !== id))
      setShow(false)
    }
  }

  function setCreateRecord() {
    setShowModal(true)
    setOption("Create")
    setShow(false)
    setErrorMessage(errorOptions)
    setData(dataOptions)
  }

  function setUpdateRecord(id) {
    setOption("Update")
    setShowModal(true)
    setData({ ...address.find(x => x.id === id), 'id': id })
    setErrorMessage(dataOptions)
    setShow(false)
  }

  async function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error)
      setShow(true)
    else {
      let url = option === "Create" ? `${import.meta.env.VITE_APP_BACKEND_SERVER}/address` : `${import.meta.env.VITE_APP_BACKEND_SERVER}/address/${data.id}`

      let response = await fetch(url, {
        method: option === "Create" ? "POST" : "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ ...data, user: localStorage.getItem("userid") })
      })
      response = await response.json()
      if (option === "Create")
        setAddress([...address, response])
      else {
        let index = address.findIndex(x => x.id === data.id)
        address[index] = { ...data }
        setAddress(address)
      }
      setData(dataOptions)
      setErrorMessage(errorOptions)
      setShow(false)
      setShowModal(false)
      toast(`Address Has Been ${option === "Create" ? "Created" : "Updated"}!!!`)
    }
  }


  useEffect(() => {
    (async () => {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/address`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      setAddress(response.filter(x => x.user === localStorage.getItem("userid")))
    })()
  }, [])
  return (
    <>
      <div className="btn-group w-100">
        <h5 className='bg-primary text-center p-2 text-light' style={{ width: "80%" }}>Your Saved Addresses</h5>
        <button className='float-end btn btn-light' onClick={setCreateRecord}>Add New Address</button>
      </div>
      {
        address.map((item, index) => {
          return <div className='card p-2 my-3' style={{ backgroundColor: "#f5efefff" }} key={index}>
            <div className="row">
              <div className="col-9">
                <div className="table-responsive">
                  <table className='table'>
                    <tbody>
                      <tr>
                        <th>Name</th>
                        <td>{item.name}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{item.email}</td>
                      </tr>
                      <tr>
                        <th>Phone</th>
                        <td>{item.phone}</td>
                      </tr>
                      <tr>
                        <th>Address</th>
                        <td>{item.address}</td>
                      </tr>
                      <tr>
                        <th>Name</th>
                        <td>{item.pin}/{item.city}/{item.state}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-3">
                <div className="btn-group">
                  <button className='btn btn-primary' onClick={() => setUpdateRecord(item.id)}><i className='bi bi-pencil fs-4'></i></button>
                  <button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='bi bi-x fs-4'></i></button>
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
                  <div className="mb-3">
                    <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Full Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />
                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                  </div>
                  <div className=" col-6 mb-3">
                    <input type="email" name="email" value={data.email} onChange={getInputData} placeholder='Email Address' className={`form-control ${show && errorMessage.email ? 'border-danger' : 'border-dark'}`} />
                    {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                  </div>
                  <div className=" col-6 mb-3">
                    <input type="text" name="phone" value={data.phone} onChange={getInputData} placeholder='Phone Number' className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'border-dark'}`} />
                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                  </div>

                  <div className="mb-3">
                    <textarea name="address" value={data.address} rows={3} onChange={getInputData} placeholder='Address' className={`form-control ${show && errorMessage.address ? 'border-danger' : 'border-dark'}`} ></textarea>
                    {show && errorMessage.address ? <p className='text-danger'>{errorMessage.address}</p> : null}
                  </div>

                  <div className="col-4 mb-3">
                    <input type="text" name="pin" value={data.pin} onChange={getInputData} placeholder='Pin Code' className={`form-control ${show && errorMessage.pin ? 'border-danger' : 'border-dark'}`} />
                    {show && errorMessage.pin ? <p className='text-danger'>{errorMessage.pin}</p> : null}
                  </div>

                  <div className="col-4 mb-3">
                    <input type="text" name="city" value={data.city} onChange={getInputData} placeholder='City Name' className={`form-control ${show && errorMessage.city ? 'border-danger' : 'border-dark'}`} />
                    {show && errorMessage.city ? <p className='text-danger'>{errorMessage.city}</p> : null}
                  </div>

                  <div className="col-4 mb-3">
                    <input type="text" name="state" value={data.state} onChange={getInputData} placeholder='State Name' className={`form-control ${show && errorMessage.state ? 'border-danger' : 'border-dark'}`} />
                    {show && errorMessage.state ? <p className='text-danger'>{errorMessage.state}</p> : null}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">{option}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
