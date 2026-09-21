import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../Components/Breadcrum'

import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../Redux/ActionCreators/BrandActionCreators"
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { Link, useSearchParams } from 'react-router-dom'
export default function ShopPage() {
    let [products, setProducts] = useState([])
    let [sortFilter, setSortFilter] = useState("1")
    let [search, setSearch] = useState("")

    let [mc, setMc] = useState("")
    let [sc, setSc] = useState("")
    let [br, setBr] = useState("")

    let [min, setMin] = useState(-1)
    let [max, setMax] = useState(-1)

    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()

    let [searchParams] = useSearchParams()

    function filterProducts(mc, sc, br, min = -1, max = -1) {
        let data = ProductStateData.filter(x => x.status &&
            (mc === "" || mc === x.maincategory) &&
            (sc === "" || sc === x.subcategory) &&
            (br === "" || br === x.brand)
        )
        sortFilterProducts(sortFilter, data)
    }

    function sortFilterProducts(option, products) {
        setSortFilter(option)
        if (min !== -1 && max !== -1)
            products = products.filter(x => x.finalPrice >= min && x.finalPrice <= max)
        
        if (option === "1")
            setProducts(products.sort().reverse())
        else if (option === "2")
            setProducts(products.sort((x, y) => x.finalPrice - y.finalPrice))
        else
            setProducts(products.sort((x, y) => y.finalPrice - x.finalPrice))
    }

    function selectCategory(mc, sc, br) {
        setMc(mc)
        setSc(sc)
        setBr(br)
        setSearch("")
        filterProducts(mc, sc, br)
    }

    function postSearch() {
        setMc("")
        setSc("")
        setBr("")
        let ch = search.toLocaleLowerCase()
        let data = ProductStateData.filter(x => x.status &&
            x?.name?.toLocaleLowerCase()?.includes(ch) ||
            x?.maincategory?.toLocaleLowerCase() === ch ||
            x?.subcategory?.toLocaleLowerCase() === ch ||
            x?.brand?.toLocaleLowerCase() === ch ||
            x?.color?.includes(ch) ||
            x?.size?.includes(ch)
        )
        sortFilterProducts(sortFilter, data)
    }

    function postPriceFilter(e) {
        e.preventDefault()
        if (search)
            postPriceFilter()
        else
            filterProducts(mc, sc, br)
    }

    useEffect(() => {
        (() => dispatch(getMaincategory()))()
    }, [MaincategoryStateData.length])

    useEffect(() => {
        (() => dispatch(getSubcategory()))()
    }, [SubcategoryStateData.length])

    useEffect(() => {
        (() => dispatch(getBrand()))()
    }, [BrandStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            let mc = searchParams.get("mc") ?? ""
            let sc = searchParams.get("sc") ?? ""
            let br = searchParams.get("br") ?? ""
            setMc(mc)
            setSc(sc)
            setBr(br)
            if (ProductStateData.length)
                filterProducts(mc, sc, br)
        })()
    }, [ProductStateData.length, searchParams])
    return (
        <>
            <Breadcrum title="Shop Page" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-md-3">
                        <div className="list-group mb-3">
                            <p className="list-group-item list-group-item-action active" aria-current="true">
                                Maincategory
                            </p>
                            <button className="list-group-item list-group-item-action" onClick={() => selectCategory("", sc, br)}>All {mc === "" ? <i className='bi bi-check float-end fs-5'></i> : null}</button>
                            {
                                MaincategoryStateData.filter(x => x.status).map((item) => {
                                    return <button key={item.id} className="list-group-item list-group-item-action" onClick={() => selectCategory(item.name, sc, br)}>{item.name} {mc === item.name ? <i className='bi bi-check float-end fs-5'></i> : null}</button>
                                })
                            }
                        </div>
                        <div className="list-group mb-3">
                            <p className="list-group-item list-group-item-action active" aria-current="true">
                                Subcategory
                            </p>
                            <button className="list-group-item list-group-item-action" onClick={() => selectCategory(mc, "", br)}>All {sc === "" ? <i className='bi bi-check float-end fs-5'></i> : null}</button>
                            {
                                SubcategoryStateData.filter(x => x.status).map((item) => {
                                    return <button key={item.id} className="list-group-item list-group-item-action" onClick={() => selectCategory(mc, item.name, br)}>{item.name} {sc === item.name ? <i className='bi bi-check float-end fs-5'></i> : null}</button>
                                })
                            }
                        </div>
                        <div className="list-group mb-3">
                            <p className="list-group-item list-group-item-action active" aria-current="true">
                                Brand
                            </p>
                            <button className="list-group-item list-group-item-action" onClick={() => selectCategory(mc, sc, "")}>All {br === "" ? <i className='bi bi-check float-end fs-5'></i> : null}</button>
                            {
                                BrandStateData.filter(x => x.status).map((item) => {
                                    return <button key={item.id} className="list-group-item list-group-item-action" onClick={() => selectCategory(mc, sc, item.name)}>{item.name} {br === item.name ? <i className='bi bi-check float-end fs-5'></i> : null}</button>
                                })
                            }
                        </div>

                        <div className="row mb-3">
                            <h5 className='bg-primary text-light text-center p-2'>Price Range Filter</h5>
                            <form onSubmit={postPriceFilter}>
                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <label>Min Amount</label>
                                        <input type="number" name="min" onChange={(e) => setMin(e.target.value)} className='form-control border-dark' placeholder='Min' />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label>Max Amount</label>
                                        <input type="number" name="max" onChange={(e) => setMax(e.target.value)} className='form-control border-dark' placeholder='Max' />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className='btn btn-primary w-100'>Apply</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-lg-9 mb-3">
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    postSearch()
                                }}>
                                    <div className="btn-group w-100">
                                        <input type="search" name="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search Products By Name,Category, Brand Etc.' className='form-control border-dark' />
                                        <button type="submit" className='btn btn-primary'>Search</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-3 mb-3">
                                <select className='form-select border-dark' value={sortFilter} onChange={(e) => sortFilterProducts(e.target.value, products)}>
                                    <option value="1">Latest</option>
                                    <option value="2">Price : Low to High</option>
                                    <option value="3">Price : High to Low</option>
                                </select>
                            </div>
                        </div>
                        <div className="row g-4">
                            {
                                products?.map(item => {
                                    return <div key={item.id} className="col-md-6 col-lg-4" data-wow-delay="0.1s">
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
            </div>
        </>
    )
}
