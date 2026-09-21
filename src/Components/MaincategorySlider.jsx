import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules'

import "swiper/css";

import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
export default function MaincategorySlider() {
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
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
            dispatch(getMaincategory())
        })()
    }, [MaincategoryStateData.length])
    return (
        <div className="container">
            <h3 className='text-center p-2'>Our Maincategory</h3>
            <Swiper className="mySwiper" {...sliderOptions}>
                {
                    MaincategoryStateData.map((item) => {
                        return <SwiperSlide key={item.id}>
                            <div className="wow fadeIn" data-wow-delay="0.2s">
                                <div>
                                    <Link className='fs-3 position-absolute bottom-0 text-light d-block w-100 text-center' to={`/shop?mc=${item.name}`}>{item.name}</Link>
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
