import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules'

import "swiper/css";

import About from "../Components/About"
import Features from '../Components/Features'
import ProductSlider from '../Components/ProductSlider'
import Products from '../Components/Products'
import Testimonial from '../Components/Testimonial'

import MaincategorySlider from '../Components/MaincategorySlider';
import SubcategorySlider from '../Components/SubcategorySlider';
import BrandSlider from '../Components/BrandSlider';

import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"

export default function HomePage() {
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)

    let dispatch = useDispatch()

    let sliderOptions = {
        loop: true,
        modules: [Autoplay],
        autoplay: {
            delay: 2000,
        },
    }

    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
        })()
    }, [MaincategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getProduct())
        })()
    }, [ProductStateData.length])
    return (
        <>
            <div className="container-fluid pb-5 hero-header bg-light mb-5">
                <div className="container py-5">
                    <div className="row g-5 align-items-center mb-5">
                        <div className="col-lg-6">
                            <h1 className="display-3 mb-4 animated slideInRight">Shop <span className='text-primary'>Smarter</span>, Live <span className='text-primary'>Better</span> with <span className='text-primary'>ShopStudio</span></h1>
                            <h5 className="d-inline-block border border-2 border-white py-3 px-5 mb-0 animated slideInRight">
                                ShopStudio - Style, Savings & Speed!</h5>
                        </div>
                        <div className="col-lg-6">
                            <div className="header-carousel animated fadeIn">
                                <Swiper className="mySwiper" {...sliderOptions}>
                                    <SwiperSlide><img className="w-100" height={300} src="/images/banner1.jpg" alt="" /></SwiperSlide>
                                    <SwiperSlide><img className="w-100" height={300} src="/images/banner2.jpg" alt="" /></SwiperSlide>
                                    <SwiperSlide><img className="w-100" height={300} src="/images/banner3.jpg" alt="" /></SwiperSlide>
                                    <SwiperSlide><img className="w-100" height={300} src="/images/banner4.jpg" alt="" /></SwiperSlide>
                                    <SwiperSlide><img className="w-100" height={300} src="/images/banner5.jpg" alt="" /></SwiperSlide>
                                    <SwiperSlide><img className="w-100" height={300} src="/images/banner6.jpg" alt="" /></SwiperSlide>
                                    <SwiperSlide><img className="w-100" height={300} src="/images/banner7.jpg" alt="" /></SwiperSlide>
                                    <SwiperSlide><img className="w-100" height={300} src="/images/banner8.jpg" alt="" /></SwiperSlide>
                                    <SwiperSlide><img className="w-100" height={300} src="/images/banner9.jpg" alt="" /></SwiperSlide>
                                    <SwiperSlide><img className="w-100" height={300} src="/images/banner10.jpg" alt="" /></SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    <div className="row g-5 animated fadeIn">
                        <div className="col-md-6 col-lg-3">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 btn-square border border-2 border-white me-3">
                                    <i className="fa fa-truck fs-3 text-primary"></i>
                                </div>
                                <h5 className="lh-base mb-0">Fastest Delivery</h5>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 btn-square border border-2 border-white me-3">
                                    <i className="fa fa-check-circle fs-3 text-primary"></i>
                                </div>
                                <h5 className="lh-base mb-0">100% Original</h5>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 btn-square border border-2 border-white me-3">
                                    <i className="fa fa-undo fs-4 text-primary"></i>
                                </div>
                                <h5 className="lh-base mb-0">7 Days Return</h5>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 btn-square border border-2 border-white me-3">
                                    <i className="fa fa-percent fs-4 text-primary"></i>
                                </div>
                                <h5 className="lh-base mb-0">Upto 90% Off</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MaincategorySlider />
            <About />
            <Features />
            <ProductSlider maincategory={MaincategoryStateData.filter(x => x.status)} product={ProductStateData.filter(x => x.status)} />
            <SubcategorySlider />
            <Products product={ProductStateData.filter(x => x.status).slice(0, 24)} />
            <BrandSlider />
            <Testimonial />
        </>
    )
}
