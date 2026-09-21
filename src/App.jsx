import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import FeaturesPage from './Pages/FeaturesPage'
import ShopPage from './Pages/ShopPage'
import ProductPage from './Pages/ProductPage'
import TestimonialPage from './Pages/TestimonialPage'
import ContactusPage from './Pages/ContactusPage'

import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/loginPage'

import ProfilePage from './Pages/User/ProfilePage'
import CartPage from './Pages/User/CartPage'
import CheckoutPage from './Pages/User/CheckoutPage'
import OrderConfirmationPage from './Pages/User/OrderConfirmationPage'


import ErrorPage from './Pages/ErrorPage'

import AdminHome from './Pages/Admin/AdminHome'

import AdminMaincategory from './Pages/Admin/Maincategory/AdminMaincategory'
import AdminCreateMaincategory from './Pages/Admin/Maincategory/AdminCreateMaincategory'
import AdminUpdateMaincategory from './Pages/Admin/Maincategory/AdminUpdateMaincategory'

import AdminSubcategory from './Pages/Admin/Subcategory/AdminSubcategory'
import AdminCreateSubcategory from './Pages/Admin/Subcategory/AdminCreateSubcategory'
import AdminUpdateSubcategory from './Pages/Admin/Subcategory/AdminUpdateSubcategory'

import AdminBrand from './Pages/Admin/Brand/AdminBrand'
import AdminCreateBrand from './Pages/Admin/Brand/AdminCreateBrand'
import AdminUpdateBrand from './Pages/Admin/Brand/AdminUpdateBrand'

import AdminFeature from './Pages/Admin/Feature/AdminFeature'
import AdminCreateFeature from './Pages/Admin/Feature/AdminCreateFeature'
import AdminUpdateFeature from './Pages/Admin/Feature/AdminUpdateFeature'

import AdminSetting from './Pages/Admin/Setting/AdminSetting'

import AdminProduct from './Pages/Admin/Product/AdminProduct'
import AdminCreateProduct from './Pages/Admin/Product/AdminCreateProduct'
import AdminUpdateProduct from './Pages/Admin/Product/AdminUpdateProduct'

import AdminFaq from './Pages/Admin/Faq/AdminFaq'
import AdminCreateFaq from './Pages/Admin/Faq/AdminCreateFaq'
import AdminUpdateFaq from './Pages/Admin/Faq/AdminUpdateFaq'

import AdminNewsletter from './Pages/Admin/Newsletter/AdminNewsletter'

import AdminContactUs from './Pages/Admin/ContactUs/AdminContactUs'
import AdminContactUsShow from './Pages/Admin/ContactUs/AdminContactUsShow'

import AdminCheckout from './Pages/Admin/Checkout/AdminCheckout'
import AdminCheckoutShow from './Pages/Admin/Checkout/AdminCheckoutShow'

import AdminUser from './Pages/Admin/User/AdminUser'
import AdminCreateUser from './Pages/Admin/User/AdminCreateUser'
import AdminUpdateUser from './Pages/Admin/User/AdminUpdateUser'
export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='' element={<HomePage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/features' element={<FeaturesPage />} />
                <Route path='/shop' element={<ShopPage />} />
                <Route path='/product/:id' element={<ProductPage />} />
                <Route path='/testimonials' element={<TestimonialPage />} />
                <Route path='/contactus' element={<ContactusPage />} />

                <Route path='/signup' element={<SignupPage />} />
                <Route path='/login' element={<LoginPage />} />

                {/* Buyer Pages */}
                {localStorage.getItem("login") ?
                    <>
                        <Route path='/profile' element={<ProfilePage />} />
                        <Route path='/cart' element={<CartPage />} />
                        <Route path='/checkout' element={<CheckoutPage />} />
                        <Route path='/confirmation' element={<OrderConfirmationPage />} />
                    </> : null}

                {/* Admin Pages */}
                {localStorage.getItem("login") && localStorage.getItem("role") !== "Buyer" ?
                    <>
                        <Route path='/admin' element={<AdminHome />} />

                        <Route path='/admin/maincategory' element={<AdminMaincategory />} />
                        <Route path='/admin/maincategory/create' element={<AdminCreateMaincategory />} />
                        <Route path='/admin/maincategory/update/:id' element={<AdminUpdateMaincategory />} />

                        <Route path='/admin/subcategory' element={<AdminSubcategory />} />
                        <Route path='/admin/subcategory/create' element={<AdminCreateSubcategory />} />
                        <Route path='/admin/subcategory/update/:id' element={<AdminUpdateSubcategory />} />

                        <Route path='/admin/brand' element={<AdminBrand />} />
                        <Route path='/admin/brand/create' element={<AdminCreateBrand />} />
                        <Route path='/admin/brand/update/:id' element={<AdminUpdateBrand />} />

                        <Route path='/admin/feature' element={<AdminFeature />} />
                        <Route path='/admin/feature/create' element={<AdminCreateFeature />} />
                        <Route path='/admin/feature/update/:id' element={<AdminUpdateFeature />} />

                        <Route path='/admin/setting' element={<AdminSetting />} />

                        <Route path='/admin/product' element={<AdminProduct />} />
                        <Route path='/admin/product/create' element={<AdminCreateProduct />} />
                        <Route path='/admin/product/update/:id' element={<AdminUpdateProduct />} />

                        <Route path='/admin/faq' element={<AdminFaq />} />
                        <Route path='/admin/faq/create' element={<AdminCreateFaq />} />
                        <Route path='/admin/faq/update/:id' element={<AdminUpdateFaq />} />

                        <Route path='/admin/newsletter' element={<AdminNewsletter />} />

                        <Route path='/admin/contactus' element={<AdminContactUs />} />
                        <Route path='/admin/contactus/show/:id' element={<AdminContactUsShow />} />

                        <Route path='/admin/checkout' element={<AdminCheckout />} />
                        <Route path='/admin/checkout/show/:id' element={<AdminCheckoutShow />} />

                        {localStorage.getItem("role") === "Super Admin" ?
                            <>
                                <Route path='/admin/user' element={<AdminUser />} />
                                <Route path='/admin/user/create' element={<AdminCreateUser />} />
                                <Route path='/admin/user/update/:id' element={<AdminUpdateUser />} />
                            </> : null}
                    </> : null}

                <Route path='/*' element={<ErrorPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
