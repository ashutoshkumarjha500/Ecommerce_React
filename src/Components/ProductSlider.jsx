import React from 'react'
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules'

import "swiper/css";
export default function ProductSlider({ maincategory, product }) {
    let sliderOptions = {
        loop: true,
        autoplay: {
            delay: 2000
        },
        pagination: false,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            }
        },
        modules: [Autoplay]
    }
    return (
        <div className="container-fluid mt-5">
            <div className="container mt-5">
                <div className="row g-0">
                    <div className="col-lg-5 wow fadeIn" data-wow-delay="0.1s" style={{ position: "relative" }}>
                        {
                            maincategory.map(item => {
                                return <div key={item.id} className="">
                                    <h1 className="text-white mb-5 position-absolute">Our Latest <span
                                        className="text-uppercase text-primary bg-light px-2">{item.name} Products</span></h1>
                                    <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${item.pic}`} className='w-100' style={{ height: 300 }} />
                                </div>
                            })
                        }
                    </div>
                    <div className="col-lg-7">
                        {
                            maincategory.map((item) => {
                                return <div key={item.id} className="g-0">
                                    <Swiper className="mySwiper" {...sliderOptions}>
                                        {
                                            product.filter(x => x.maincategory === item.name).map((p) => {
                                                return <SwiperSlide key={p.id}>
                                                    <div className="wow fadeIn" data-wow-delay="0.2s">
                                                        <div className="project-item position-relative overflow-hidden">
                                                            <img className="img-fluid w-100" style={{ height: 300 }} src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${p.pic[0]}`} alt="" />
                                                            <Link className="project-overlay text-decoration-none" to={`/product/${item.id}`}>
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
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
