import React, { useEffect, useState } from 'react'
import Breadcrum from '../../Components/Breadcrum'
import Cart from '../../Components/Buyer/Cart'
import { Link } from 'react-router-dom'

export default function CheckoutPage() {
  let [address, setAddress] = useState([])
  let [selected, setSelected] = useState({
    deliveryAddress: {},
    paymentMode: "COD"
  })

  useEffect(() => {
    (async () => {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/address`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      if (response.length) {
        let filteredAddress = response.filter(x => x.user === localStorage.getItem("userid"))
        setAddress(filteredAddress)
        setSelected({ ...selected, 'deliveryAddress': { ...filteredAddress[0] } })
      }
    })()
  }, [])
  return (
    <>
      <Breadcrum title="Place Order" />
      <div className="container-fluid my-3">
        {
          address.length ?
            <div className="row">
              <div className="col-md-7">
                <table className='table table-bordered'>
                  <tbody>
                    <tr>
                      <th>Select Delivery Address</th>
                      <td>
                        {
                          address.map(item => {
                            return <div key={item.id} className='card p-3 mb-3' onClick={() => setSelected({ ...selected, 'deliveryAddress': { ...item } })}>
                              <h6>{item.name}</h6>
                              <h6>{item.email},{item.phone}</h6>
                              <h6>{item.address}</h6>
                              <h6>{item.pin},{item.city},{item.state}</h6>

                              {selected.deliveryAddress.id === item.id ? <i className='bi bi-check fs-3 position-absolute top-0 end-0'></i> : null}
                            </div>
                          })
                        }
                      </td>
                    </tr>
                    <tr>
                      <th>Select Payment Mode</th>
                      <td>
                        <div className="card p-3" onClick={() => setSelected({ ...selected, 'paymentMode': "COD" })}>
                          Cash On Delivery
                          {selected.paymentMode === "COD" ? <i className='bi bi-check fs-3 position-absolute top-0 end-0'></i> : null}
                        </div>
                        <div className="card p-3" onClick={() => setSelected({ ...selected, 'paymentMode': "Net Banking" })}>
                          Net Banking/Card/UPI/EMI
                          {selected.paymentMode === "Net Banking" ? <i className='bi bi-check fs-3 position-absolute top-0 end-0'></i> : null}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-5">
                <h5 className='bg-primary text-light text-center p-2'>Cart Items</h5>
                <Cart title="checkout" selected={selected} />
              </div>
            </div> :
            <div className='my-3 text-center'>
              <div className="card pt-5 mb-3">
                <h3>Delivery Address Not Found</h3>
                <h4>Plase Create a Delivery Address In Profile Section</h4>
              </div>
              <Link to="/profile?option=Address" className='btn btn-primary'>Create Delivery Address</Link>
            </div>
        }
      </div >
    </>
  )
}
