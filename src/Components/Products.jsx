import React from 'react'
import { Link } from 'react-router-dom'

export default function Products({ product }) {
    return (
        <div className="container-fluid bg-light py-5">
            <div className="container py-5">
                <h1 className="mb-5">Our Lastest<span className="text-uppercase text-primary bg-light px-2">Products</span>
                </h1>
                <div className="row g-4">
                    {
                        product?.map(item => {
                            return <div key={item.id} className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.1s">
                                <div className="team-item position-relative overflow-hidden">
                                    <img className="img-fluid w-100" src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${item.pic[0]}`} alt="" style={{ height: 350 }} />
                                    <div className="team-overlay">
                                        <small className="mb-2 w-75 text-center m-auto position-absolute top-0">{item.brand}</small>
                                        <h4 className="lh-base text-light" style={{ height: 80 }}>{item.name}</h4>
                                        <h6 className='text-light text-center'><del>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice} <sup>{item.discount}% Off</sup></h6>
                                        <div className="w-100">
                                            <Link className="btn btn-primary w-100 border-3 boredr-outline-light" to={`/product/${item.id}`}>
                                                <i className="fa fa-shopping-cart text-light"></i>
                                                <span className='ms-3'>Add to Cart</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
