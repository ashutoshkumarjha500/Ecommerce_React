import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules'

import "swiper/css";

import { getTestimonial } from "../Redux/ActionCreators/TestimonialActionCreators"

export default function Testimonial() {
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let dispatch = useDispatch()
    let sliderOptions = {
        loop: true,
        modules: [Autoplay],
        autoplay: {
            delay: 2000,
        },
    }

    function getStar(id) {
        let review = TestimonialStateData.find(x => x.id == id)
        if (review.star === 5)
            return <span><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i></span>
        else
            return <span><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star text-warning'></i></span>
    }

    useEffect(() => {
        (() => dispatch(getTestimonial()))()
    }, [TestimonialStateData.length])
    return (
        <div className="container-xxl py-5">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-9">
                        <div className="testimonial-carousel wow fadeIn" data-wow-delay="0.2s">
                            <Swiper className="mySwiper" {...sliderOptions}>
                                {
                                    TestimonialStateData.filter(x => x.star >= 4).map((item) => {
                                        return <SwiperSlide key={item.id}>
                                            <div className="testimonial-item">
                                                <div className="row g-5 align-items-center">
                                                    <div className="col-12">
                                                        <div className="testimonial-text pb-5 pb-md-0">
                                                            <h3 className='text-center'>{getStar(item.id)}</h3>
                                                            <p>{item.message}</p>
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
                </div>
            </div>
        </div>
    )
}
