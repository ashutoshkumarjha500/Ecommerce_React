import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules'

import "swiper/css";

import { getBrand } from "../Redux/ActionCreators/BrandActionCreators"
export default function BrandSlider() {
    let BrandStateData = useSelector(state => state.BrandStateData)
    let dispatch = useDispatch()

    let sliderOptions = {
        loop: true,
        autoplay: {
            delay: 2000
        },
        pagination: false,
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 6,
            }
        },
        modules: [Autoplay]
    }

    useEffect(() => {
        (() => {
            dispatch(getBrand())
        })()
    }, [BrandStateData.length])
    return (
        <div className="container">
            <h3 className='text-center p-2'>Our Brand</h3>
            <Swiper className="mySwiper" {...sliderOptions}>
                {
                    BrandStateData.map((item) => {
                        return <SwiperSlide key={item.id}>
                            <div className="wow fadeIn" data-wow-delay="0.2s">
                                <div className='mx-3'>
                                    <Link to={`/shop?br=${item.name}`}>
                                        <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${item.pic}`} className='w-100' height={100} alt="" />
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    })
                }
            </Swiper>
        </div>
    )
}
