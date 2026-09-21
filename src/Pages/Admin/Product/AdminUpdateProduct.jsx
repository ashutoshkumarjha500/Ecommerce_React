import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link, useNavigate, useParams } from 'react-router-dom'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'

import FormValidator from "../../../Validators/FormValidator"
import ImageValidator from '../../../Validators/ImageValidator'

import { getProduct, updateProduct } from "../../../Redux/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../../../Redux/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../../../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../../../Redux/ActionCreators/BrandActionCreators"

var rte;
export default function AdminUpdateProduct() {
    let { id } = useParams()
    var refdiv = useRef(null)
    let [flag, setFlag] = useState(false)
    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: [],
        size: [],
        basePrice: "",
        discount: "",
        finalPrice: "",
        stock: true,
        stockQuantity: "",
        pic: [],
        status: true
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        basePrice: "",
        discount: "",
        stockQuantity: "",
        pic: ""
    })
    let [show, setShow] = useState(false)

    let ProductStateData = useSelector(state => state.ProductStateData)
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)

    let dispatch = useDispatch()
    let navigate = useNavigate()

    function getCheckBoxData(input, value) {
        if (input === "color") {
            if (data.color.length === 1 && value === data.color[0])
                return
            else {
                if (data.color.includes(value))
                    setData({ ...data, 'color': data.color.filter(x => x !== value) })
                else
                    setData({ ...data, 'color': [...data.color, value] })
            }
        }
        else {
            if (data.size.length === 1 && value === data.size[0])
                return
            else {
                if (data.size.includes(value))
                    setData({ ...data, 'size': data.size.filter(x => x !== value) })
                else
                    setData({ ...data, 'size': [...data.size, value] })
            }
        }
    }

    function getInputData(e) {
        let name = e.target.name
        let value = name === "pic" ? data.pic.concat(Array.from(e.target.files).map(x => "product/" + x.name)) : e.target.value
        // let value = name === "pic" ? e.target.files : e.target.value

        setErrorMessage(old => {
            return {
                ...old,
                [name]: name === "pic" ? ImageValidator(e) : FormValidator(e)
            }
        })

        setData(old => {
            return {
                ...old,
                [name]: name === "status" ? (value === "1" ? true : false) : value
            }
        })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            let bp = parseInt(data.basePrice)
            let d = parseInt(data.discount)
            let fp = parseInt(bp - bp * d / 100)
            let sc = parseInt(data.stockQuantity)
            dispatch(updateProduct({
                ...data,
                'maincategory': data.maincategory ? data.maincategory : MaincategoryStateData[0].name,
                'subcategory': data.subcategory ? data.subcategory : SubcategoryStateData[0].name,
                'brand': data.brand ? data.brand : BrandStateData[0].name,
                'basePrice': bp,
                'discount': d,
                'finalPrice': fp,
                'stockQuantity': sc,
                'description': rte.getHTMLCode()
            }))

            // let formData = new FormData()
            // formData.append("name", data.name)
            // formData.append("maincategory",  data.maincategory ? data.maincategory : MaincategoryStateData[0].name)
            // formData.append("subcategory",  data.subcategory ? data.subcategory : SubcategoryStateData[0].name)
            // formData.append("brand",  data.brand ? data.brand : BrandStateData[0].name)
            // formData.append("basePrice", bp)
            // formData.append("discount", d)
            // formData.append("finalPrice", fp)
            // formData.append("stockQuantity", sc)
            // formData.append("description", rte.getHTMLCode())
            // formData.append("pic", data.pic)
            // formData.append("status", data.status)
            // dispatch(updateProduct(formData))

            navigate("/admin/product")
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
        })()
    }, [MaincategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
        })()
    }, [SubcategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getBrand())
        })()
    }, [BrandStateData.length])

    useEffect(() => {
        rte = new window.RichTextEditor(refdiv.current);
        dispatch(getProduct())
        if (ProductStateData.length) {
            let item = ProductStateData.find(x => x.id === id)
            if (item) {
                setData({ ...data, ...item })
                rte.setHTMLCode(item.description)
            }
            else
                navigate("/admin/product")
        }
    }, [ProductStateData.length, id])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='border p-2 text-center'>Update Product <Link to="/admin/product"> <i className='fa fa-arrow-left float-end'></i></Link></h5>

                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Name' className={`${show && errorMessage.name ? 'border-danger' : ''} form-control`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label>Maincategory*</label>
                                    <select name="maincategory" onChange={getInputData} value={data.maincategory} className='form-select'>
                                        {
                                            MaincategoryStateData.filter(x => x.status).map(item => {
                                                return <option key={item.id}>{item.name}</option>
                                                // return <option key={item._id} value={item._id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label>Subcategory*</label>
                                    <select name="subcategory" onChange={getInputData} value={data.subcategory} className='form-select'>
                                        {
                                            SubcategoryStateData.filter(x => x.status).map(item => {
                                                return <option key={item.id}>{item.name}</option>
                                                // return <option key={item._id} value={item._id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label>Brand*</label>
                                    <select name="brand" onChange={getInputData} value={data.brand} className='form-select'>
                                        {
                                            BrandStateData.filter(x => x.status).map(item => {
                                                return <option key={item.id}>{item.name}</option>
                                                // return <option key={item._id} value={item._id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label>Stock*</label>
                                    <select name="stock" onChange={getInputData}  value={data.stock ? "1" : "0"} className='form-select'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>

                                <div className='col-12 mb-3'>
                                    <label>Color</label>
                                    <div className="row">
                                        <div className="col-3">
                                            <input type="checkbox" name="white" onChange={() => getCheckBoxData("color", "white")} className='form-check-input' checked={data.color?.includes("white")} />
                                            <label>&nbsp;&nbsp;White</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="blue" onChange={() => getCheckBoxData("color", "blue")} className='form-check-input' checked={data.color?.includes("blue")} />
                                            <label>&nbsp;&nbsp;Blue</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="black" onChange={() => getCheckBoxData("color", "black")} className='form-check-input' checked={data.color?.includes("black")} />
                                            <label>&nbsp;&nbsp;Black</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="green" onChange={() => getCheckBoxData("color", "green")} className='form-check-input' checked={data.color?.includes("green")} />
                                            <label>&nbsp;&nbsp;Green</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="pink" onChange={() => getCheckBoxData("color", "pink")} className='form-check-input' checked={data.color?.includes("pink")} />
                                            <label>&nbsp;&nbsp;Pink</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="brown" onChange={() => getCheckBoxData("color", "brown")} className='form-check-input' checked={data.color?.includes("brown")} />
                                            <label>&nbsp;&nbsp;Brown</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="cyan" onChange={() => getCheckBoxData("color", "cyan")} className='form-check-input' checked={data.color?.includes("cyan")} />
                                            <label>&nbsp;&nbsp;Cyan</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="orchid" onChange={() => getCheckBoxData("color", "orchid")} className='form-check-input' checked={data.color?.includes("orchid")} />
                                            <label>&nbsp;&nbsp;Orchid</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="gray" onChange={() => getCheckBoxData("color", "gray")} className='form-check-input' checked={data.color?.includes("gray")} />
                                            <label>&nbsp;&nbsp;Gray</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="navy" onChange={() => getCheckBoxData("color", "navy")} className='form-check-input' checked={data.color?.includes("navy")} />
                                            <label>&nbsp;&nbsp;Navy</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="orange" onChange={() => getCheckBoxData("color", "orange")} className='form-check-input' checked={data.color?.includes("orange")} />
                                            <label>&nbsp;&nbsp;Orange</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="yellow" onChange={() => getCheckBoxData("color", "yellow")} className='form-check-input' checked={data.color?.includes("yellow")} />
                                            <label>&nbsp;&nbsp;Yellow</label>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-12 mb-3'>
                                    <label>Size</label>
                                    <div className="row">
                                        <div className="col-3">
                                            <input type="checkbox" name="xxl" onChange={() => getCheckBoxData("size", "xxl")} className='form-check-input' checked={data.size?.includes("xxl")} />
                                            <label>&nbsp;&nbsp;XXL</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="xl" onChange={() => getCheckBoxData("size", "xl")} className='form-check-input' checked={data.size?.includes("xl")} />
                                            <label>&nbsp;&nbsp;XL</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="lg" onChange={() => getCheckBoxData("size", "lg")} className='form-check-input' checked={data.size?.includes("lg")} />
                                            <label>&nbsp;&nbsp;LG</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="sm" onChange={() => getCheckBoxData("size", "sm")} className='form-check-input' checked={data.size?.includes("sm")} />
                                            <label>&nbsp;&nbsp;SM</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="m" onChange={() => getCheckBoxData("size", "m")} className='form-check-input' checked={data.size?.includes("m")} />
                                            <label>&nbsp;&nbsp;M</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="xs" onChange={() => getCheckBoxData("size", "xs")} className='form-check-input' checked={data.size?.includes("xs")} />
                                            <label>&nbsp;&nbsp;XS</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="26" onChange={() => getCheckBoxData("size", "26")} className='form-check-input' checked={data.size?.includes("26")} />
                                            <label>&nbsp;&nbsp;26</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="28" onChange={() => getCheckBoxData("size", "28")} className='form-check-input' checked={data.size?.includes("28")} />
                                            <label>&nbsp;&nbsp;28</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="30" onChange={() => getCheckBoxData("size", "30")} className='form-check-input' checked={data.size?.includes("30")} />
                                            <label>&nbsp;&nbsp;30</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="32" onChange={() => getCheckBoxData("size", "32")} className='form-check-input' checked={data.size?.includes("32")} />
                                            <label>&nbsp;&nbsp;32</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="34" onChange={() => getCheckBoxData("size", "34")} className='form-check-input' checked={data.size?.includes("34")} />
                                            <label>&nbsp;&nbsp;34</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="36" onChange={() => getCheckBoxData("size", "36")} className='form-check-input' checked={data.size?.includes("36")} />
                                            <label>&nbsp;&nbsp;36</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="38" onChange={() => getCheckBoxData("size", "38")} className='form-check-input' checked={data.size?.includes("38")} />
                                            <label>&nbsp;&nbsp;38</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="40" onChange={() => getCheckBoxData("size", "40")} className='form-check-input' checked={data.size?.includes("40")} />
                                            <label>&nbsp;&nbsp;40</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="42" onChange={() => getCheckBoxData("size", "42")} className='form-check-input' checked={data.size?.includes("42")} />
                                            <label>&nbsp;&nbsp;42</label>
                                        </div>
                                        <div className="col-3">
                                            <input type="checkbox" name="44" onChange={() => getCheckBoxData("size", "44")} className='form-check-input' checked={data.size?.includes("44")} />
                                            <label>&nbsp;&nbsp;44</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Base Price*</label>
                                    <input type="number" name="basePrice" value={data.basePrice} onChange={getInputData} placeholder='Base Price' className={`${show && errorMessage.basePrice ? 'border-danger' : ''} form-control`} />
                                    {show && errorMessage.basePrice ? <p className='text-danger'>{errorMessage.basePrice}</p> : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Discount*</label>
                                    <input type="number" name="discount" value={data.discount} onChange={getInputData} placeholder='Discount' className={`${show && errorMessage.discount ? 'border-danger' : ''} form-control`} />
                                    {show && errorMessage.discount ? <p className='text-danger'>{errorMessage.discount}</p> : null}
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Description</label>
                                    <div ref={refdiv}></div>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Stock Quantity*</label>
                                    <input type="number" name="stockQuantity" value={data.stockQuantity} onChange={getInputData} placeholder='Stock Quantity' className={`${show && errorMessage.stockQuantity ? 'border-danger' : ''} form-control`} />
                                    {show && errorMessage.stockQuantity ? <p className='text-danger'>{errorMessage.stockQuantity}</p> : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Status*</label>
                                    <select name="status" onChange={getInputData} value={data.status ? "1" : "0"} className='form-select'>
                                        <option value="1">Active</option>
                                        <option value="0">Inctive</option>
                                    </select>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Pics</label>
                                    <input type="file" name="pic" multiple onChange={getInputData} className={`${show && errorMessage.pic ? 'border-danger' : ''} form-control`} />
                                    {show && errorMessage.pic ? errorMessage.pic.toString().split("|").map((error, index) => {
                                        return <p className='text-danger' key={index}>{error}</p>
                                    }) : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className='d-block'>Old Pics</label>
                                    {
                                        data.pic.map((pic, index) => {
                                            return <img key={index} onClick={() => {
                                                data.pic.splice(index, 1)
                                                setFlag(!flag)
                                            }} src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${pic}`} height={80} width={80} className='m-1' />
                                        })
                                    }
                                </div>
                                <div className="col-12 mb-3">
                                    <button type="submit" className='btn btn-primary w-100'>Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
