import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getWishlist, deleteWishlist } from "../../Redux/ActionCreators/WishlistActionCreators"
export default function Wishlist() {
  let [data, setData] = useState([])

  let WishlistStateData = useSelector(state => state.WishlistStateData)
  let dispatch = useDispatch()

  function deleteRecord(id) {
    if (window.confirm("Are You Sure to Delete That Record : ")) {
      dispatch(deleteWishlist({ id: id }))
      setData(data.filter(x => x.product !== id))
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getWishlist())
      if (WishlistStateData.length)
        setData(WishlistStateData.filter(x => x.user === localStorage.getItem("userid")))
      else
        setData([])
    })()
  }, [WishlistStateData.length])
  return (
    <>
      <h5 className='bg-primary text-center p-2 text-light'>Wishlist Details</h5>
      <div className='my-3'>
        {
          data.length ?
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
                    <th>Stock Quantity</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((item) => {
                      return <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>
                          <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${item.pic}`} target='_blank' rel='noreferrer'>
                            <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${item.pic}`} height={60} width={80} alt="" />
                          </Link>
                        </td>
                        <td>{item.brand}</td>
                        <td>{item.color?.join()}</td>
                        <td>{item.size?.join()}</td>
                        <td>&#8377;{item.finalPrice}</td>
                        <td>{`${item.stockQuantity} Left in Stock`}</td>
                        <td><Link to={`/product/${item.product}`} className='btn btn-primary'><i className='bi bi-cart'></i></Link></td>
                        <td><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='bi bi-x'></i></button></td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div> :
            <div className='my-3 text-center'>
              <div className="card pt-5 mb-3">
                <h3>No Items in Wishlist</h3>
              </div>
              <Link to="/shop" className='btn btn-primary'>Shop Now</Link>
            </div>
        }
      </div>
    </>
  )
}
