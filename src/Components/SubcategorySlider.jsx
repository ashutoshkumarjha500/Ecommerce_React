import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules'

import "swiper/css";

import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreators"
export default function SubcategorySlider() {
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let dispatch = useDispatch()

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

    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
        })()
    }, [SubcategoryStateData.length])
    return (
        <div className="container">
            <h3 className='text-center p-2'>Our Subcategory</h3>
            <Swiper className="mySwiper" {...sliderOptions}>
                {
                    SubcategoryStateData.map((item) => {
                        return <SwiperSlide key={item.id}>
                            <div className="wow fadeIn" data-wow-delay="0.2s">
                                <div>
                                    <Link className='fs-3 position-absolute bottom-0 text-light d-block w-100 text-center' to={`/shop?sc=${item.name}`}>{item.name}</Link>
                                    <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${item.pic}`} className='w-100' alt="" />
                                </div>
                            </div>
                        </SwiperSlide>
                    })
                }
            </Swiper>
        </div>
    )
}
