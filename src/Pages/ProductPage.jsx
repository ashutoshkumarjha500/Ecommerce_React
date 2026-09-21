import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-creative';


import Breadcrum from '../Components/Breadcrum'

import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { getCart, createCart } from "../Redux/ActionCreators/CartActionCreators"
import { getWishlist, createWishlist } from "../Redux/ActionCreators/WishlistActionCreators"
import { getTestimonial } from "../Redux/ActionCreators/TestimonialActionCreators"

export default function ProductPage() {
    let { id } = useParams()
    let [review, setReview] = useState({
        data: [],
        stats: {},
        total: 0,
        average: 0
    })
    let [data, setData] = useState({
        color: "",
        size: "",
        qty: 1
    })
    let [product, setProduct] = useState({
        color: [],
        size: [],
        pic: []
    })
    let [relatedProducts, setRelatedProducts] = useState([])

    let ProductStateData = useSelector(state => state.ProductStateData)
    let CartStateData = useSelector(state => state.CartStateData)
    let WishlistStateData = useSelector(state => state.WishlistStateData)
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)

    let dispatch = useDispatch()
    let navigate = useNavigate()

    let sliderOptions = {
        loop: true,
        autoplay: {
            delay: 2000
        },
        pagination: false,
        modules: [EffectCreative, Autoplay],
        grabCursor: true,
        effect: 'creative',
        creativeEffect: {
            prev: {
                shadow: true,
                translate: [0, 0, -400],
            },
            next: {
                translate: ['100%', 0, 0],
            },
        }
    }

    let sliderOptions2 = {
        loop: true,
        modules: [Autoplay],
        autoplay: {
            delay: 2000,
        },
    }

    function addToCart() {
        let item = CartStateData.find(x => x.product === id && x.user === localStorage.getItem("userid"))
        if (!item) {
            let item = {
                user: localStorage.getItem("userid"),
                product: product.id,
                name: product.name,
                brand: product.brand,
                stockQuantity: product.stockQuantity,
                price: product.finalPrice,
                pic: product.pic[0],
                total: product.finalPrice * data.qty,
                ...data
            }
            dispatch(createCart(item))
        }
        navigate("/cart")
    }

    function addToWishlist() {
        let item = WishlistStateData.find(x => x.product === id && x.user === localStorage.getItem("userid"))
        if (!item) {
            let item = {
                user: localStorage.getItem("userid"),
                product: product.id,
                name: product.name,
                brand: product.brand,
                color: product.color,
                size: product.size,
                stockQuantity: product.stockQuantity,
                price: product.finalPrice,
                pic: product.pic[0],
            }
            dispatch(createWishlist(item))
        }
        navigate("/profile?option=Wishlist")
    }

    function getStar(id) {
        let review = TestimonialStateData.find(x => x.id == id)
        if (review.star === 5)
            return <span><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i></span>
        else if (review.star === 4)
            return <span><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star text-warning'></i></span>
        else if (review.star === 3)
            return <span><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star text-warning'></i><i className='fs-4 bi bi-star text-warning'></i></span>
        else if (review.star === 2)
            return <span><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star text-warning'></i><i className='fs-4 bi bi-star text-warning'></i><i className='fs-4 bi bi-star text-warning'></i></span>
        else
            return <span><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star text-warning'></i><i className='fs-4 bi bi-star text-warning'></i><i className='fs-4 bi bi-star text-warning'></i><i className='fs-4 bi bi-star text-warning'></i></span>
    }


    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                let item = ProductStateData.find(x => x.id === id)
                if (item) {
                    setProduct({ ...item })
                    setData({ ...data, 'color': item.color[0], 'size': item.size[0] })
                    setRelatedProducts(ProductStateData.filter(x => x.maincategory === item.maincategory))
                }
                else
                    window.history.back()
            }
        })()
    }, [ProductStateData.length, id])

    useEffect(() => {
        (() => dispatch(getCart()))()
    }, [CartStateData.length])

    useEffect(() => {
        (() => dispatch(getWishlist()))()
    }, [WishlistStateData.length])


    useEffect(() => {
        (() => {
            dispatch(getTestimonial())
            if (TestimonialStateData.length) {
                let data = TestimonialStateData.filter(x => x.product === id)

                let sum = 0
                let stats = {}
                data.forEach(x => {
                    stats[x.star.toString()] = (stats[x.star.toString()] || 0) + 1
                    sum = sum + x.star
                });
                setReview({
                    data: data,
                    stats: stats,
                    total: data.length,
                    average: (sum / (data.length)).toFixed(1)
                })
                console.log(data)
            }
        })()
    }, [TestimonialStateData.length])
    return (
        <>
            <Breadcrum title={`${product?.name ?? "Product"}`} />

            <div className="container my-3">
                <div className="row">
                    <div className="col-md-6">
                        <Swiper {...sliderOptions}>
                            {
                                product?.pic?.map((item, index) => {
                                    return <SwiperSlide key={index}>
                                        <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${item}`} height={500} className='w-100' alt="" />
                                    </SwiperSlide>
                                })
                            }
                        </Swiper>
                    </div>
                    <div className="col-md-6">
                        <h5 className='text-center p-2 bg-primary text-light'>{product?.name}</h5>
                        <table className='table table-bordered'>
                            <tbody>
                                <tr>
                                    <th>Maincategory</th>
                                    <td>{product?.maincategory}</td>
                                </tr>
                                <tr>
                                    <th>Subcategory</th>
                                    <td>{product?.subcategory}</td>
                                </tr>
                                <tr>
                                    <th>Brand</th>
                                    <td>{product?.brand}</td>
                                </tr>
                                <tr>
                                    <th>Color</th>
                                    <td>
                                        <div className="btn-group w-100">
                                            {product?.color.map((item, index) => {
                                                return <button key={index} onClick={() => setData({ ...data, 'color': item })} className={`btn ${data.color === item ? 'btn-primary' : 'btn-light'} border`}>{item}</button>
                                            })}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Size</th>
                                    <td>
                                        <div className="btn-group w-100">
                                            {product?.size.map((item, index) => {
                                                return <button key={index} onClick={() => setData({ ...data, 'size': item })} className={`btn ${data.size === item ? 'btn-primary' : 'btn-light'} border`}>{item}</button>
                                            })}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Price</th>
                                    <td><del>&#8377;{product?.basePrice}</del> &#8377;{product?.finalPrice} <sup>{product?.discount}% off</sup></td>
                                </tr>
                                <tr>
                                    <th>Stock</th>
                                    <td>{product?.stock ? `In Stock (${product?.stockQuantity} Left)` : "Out Of Stock"}</td>
                                </tr>
                                <tr>
                                    <th colSpan={2}>
                                        <div className="row">
                                            {
                                                product.stock ?
                                                    <div className="col-md-4 col-sm-6">
                                                        <div className="btn-group w-100">
                                                            <button className='btn btn-primary' onClick={() => setData({ ...data, 'qty': data.qty > 1 ? data.qty - 1 : 1 })}><i className='bi bi-dash fs-4'></i></button>
                                                            <h4 className='w-50 text-center mt-2'>{data.qty}</h4>
                                                            <button className='btn btn-primary' onClick={() => setData({ ...data, 'qty': data.qty < product.stockQuantity ? data.qty + 1 : data.qty })}><i className='bi bi-plus fs-4'></i></button>
                                                        </div>
                                                    </div> : null
                                            }
                                            <div className="col-md-8 col-sm-6">
                                                <div className="btn-group w-100 h-100">
                                                    {product.stock ? <button className='btn btn-primary' onClick={addToCart}><i className='bi bi-cart'></i> Add to Cart</button> : null}
                                                    <button className='btn btn-success' onClick={addToWishlist}><i className='bi bi-heart'></i> Add to Wishlist</button>
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>
                                        <div dangerouslySetInnerHTML={{ __html: product?.description }} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {
                    review.total ?
                        <div className="row my-5">
                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="col-5">
                                        <div className="card p-4">
                                            <h6>Customers Reviews</h6>
                                            <h5>{review.average}<i className='ms-2 bi bi-star-fill text-warning fs-4'></i></h5>
                                            <h6>{review.total} Verified Buyers</h6>
                                        </div>
                                    </div>
                                    <div className="col-7 card p-4">
                                        <div className='row'>
                                            <p className="col-5 mb-0">5 <i className="bi bi-star-fill text-warning"></i> ({review.stats[5]})</p>
                                            <div className='col-7'>
                                                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={review.stats[5] * 100 / review.total} aria-valuemin="0" aria-valuemax="100">
                                                    <div className="progress-bar" style={{ width: `${review.stats[5] * 100 / review.total}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <p className="col-5 mb-0">4 <i className="bi bi-star-fill text-warning"></i> ({review.stats[4]})</p>
                                            <div className='col-7'>
                                                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={review.stats[4] * 100 / review.total} aria-valuemin="0" aria-valuemax="100">
                                                    <div className="progress-bar" style={{ width: `${review.stats[4] * 100 / review.total}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <p className="col-5 mb-0">3 <i className="bi bi-star-fill text-warning"></i> ({review.stats[3]})</p>
                                            <div className='col-7'>
                                                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={review.stats[3] * 100 / review.total} aria-valuemin="0" aria-valuemax="100">
                                                    <div className="progress-bar" style={{ width: `${review.stats[3] * 100 / review.total}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <p className="col-5 mb-0">2 <i className="bi bi-star-fill text-warning"></i> ({review.stats[2]})</p>
                                            <div className='col-7'>
                                                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={review.stats[2] * 100 / review.total} aria-valuemin="0" aria-valuemax="100">
                                                    <div className="progress-bar" style={{ width: `${review.stats[2] * 100 / review.total}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <p className="col-5 mb-0">1 <i className="bi bi-star-fill text-warning"></i> ({review.stats[1]})</p>
                                            <div className='col-7'>
                                                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={review.stats[1] * 100 / review.total} aria-valuemin="0" aria-valuemax="100">
                                                    <div className="progress-bar" style={{ width: `${review.stats[1] * 100 / review.total}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="testimonial-carousel wow fadeIn" data-wow-delay="0.2s">
                                    <Swiper className="mySwiper" {...sliderOptions2}>
                                        {
                                            review.data?.map((item) => {
                                                return <SwiperSlide key={item.id}>
                                                    <div className="testimonial-item card p-5">
                                                        <div className="row g-5 align-items-center">
                                                            <div className="col-12">
                                                                <div className="testimonial-text pb-5 pb-md-0">
                                                                    <h3 className='text-center'>{getStar(item.id)}</h3>
                                                                    <p style={{ fontSize: 13 }}>{item.message}</p>
                                                                    <h5 className="mb-0">{item.name}</h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            })
                                        }
                                    </Swiper>
                                </div>
                            </div>
                        </div> : null
                }
            </div>


            <div className="container-fluid mt-5">
                <div className="container mt-5">
                    <div className="row g-0">
                        <div className="col-lg-5 wow fadeIn" data-wow-delay="0.1s" style={{ position: "relative" }}>
                            <h1 className="text-dark mb-5 position-absolute">Other Latest <span
                                className="text-uppercase text-primary bg-light px-2">Related Products</span></h1>
                            <img src={`/images/banner10.jpg`} className='w-100' style={{ height: 300 }} />
                        </div>
                        <div className="col-lg-7">
                            <div className="g-0">
                                <Swiper className="mySwiper" {...sliderOptions}>
                                    {
                                        relatedProducts.map((p) => {
                                            return <SwiperSlide key={p.id}>
                                                <div className="wow fadeIn" data-wow-delay="0.2s">
                                                    <div className="project-item position-relative overflow-hidden">
                                                        <img className="img-fluid w-100" style={{ height: 300 }} src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${p.pic[0]}`} alt="" />
                                                        <Link className="project-overlay text-decoration-none" to={`/product/${p.id}`}>
                                                            <h5 className="text-white">{p.name}</h5>
                                                            <small className="text-white"><del>&#8377;{p.basePrice}</del> &#8377;{p.finalPrice} <sup>{p.discount}% Off</sup></small>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        })
                                    }
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
