import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';

import { getCart, updateCart, deleteCart } from "../../Redux/ActionCreators/CartActionCreators"
import { getProduct, updateProduct } from "../../Redux/ActionCreators/ProductActionCreators"
import { getWishlist, createWishlist } from "../../Redux/ActionCreators/WishlistActionCreators"
import { createCheckout } from "../../Redux/ActionCreators/CheckoutActionCreators"
export default function Cart(props) {
    let [flag, setFlag] = useState(true)
    let [cart, setCart] = useState([])
    let [subtotal, setSubtotal] = useState()
    let [shipping, setShipping] = useState()
    let [total, setTotal] = useState()


    let CartStateData = useSelector(state => state.CartStateData)
    let WishlistStateData = useSelector(state => state.WishlistStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    function placeOrder() {
        let item = {
            user: localStorage.getItem("userid"),
            deliveryAddress: props.selected?.deliveryAddress,
            orderStatus: "Order is Placed",
            paymentMode: props.selected?.paymentMode,
            paymentStatus: "Pending",
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            date: new Date(),
            products: cart
        }
        dispatch(createCheckout(item))

        cart.forEach(x => {
            let product = ProductStateData.find(p => p.id === x.product)
            product.stockQuantity = product.stockQuantity - x.qty
            product.stock = product.stockQuantity === 0 ? false : true
            dispatch(updateProduct(product))
            dispatch(deleteCart({ id: x.id }))
        })
        navigate("/confirmation")
    }

    function deleteRecord(id) {
        if (window.confirm("Are You Sure to Delete That Record : ")) {
            dispatch(deleteCart({ id: id }))
            setCart(data.filter(x => x.product !== id))
            checkCartProductStockStatus(data.filter(x => x.product !== id))
        }
    }

    function updateRecord(id, option) {
        let item = cart.find(x => x.id === id)
        let index = cart.findIndex(x => x.id === id)
        if (option === "DEC" && item.qty === 1)
            return
        else if (option === "DEC") {
            item['qty'] = item['qty'] - 1
            item['total'] = item['total'] - item['price']
        }
        else if (option === "INC" && item.qty < item.stockQuantity) {
            item['qty'] = item['qty'] + 1
            item['total'] = item['total'] + item['price']
        }
        dispatch(updateCart(item))
        cart[index].qty = item.qty
        cart[index].total = item.total
        calculate(cart)
    }

    function calculate(cart) {
        let sum = 0
        cart.forEach(x => sum = sum + x.total)

        if (sum < 1000) {
            setShipping(150)
            setTotal(sum + 150)
        }
        else {
            setShipping(0)
            setTotal(sum)
        }
        setSubtotal(sum)
    }

    function addToWishlist(id) {
        let cartItem = CartStateData.find(x => x.id === id)
        let product = ProductStateData.find(x => x.id === cartItem.product)
        let item = WishlistStateData.find(x => product.id === x.id && x.user === localStorage.getItem("userid"))
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
        dispatch(deleteCart({ id: id }))
        setCart(cart.filter(x => x.product !== id))
        toast("Item Has Been Move to The Wishlist")
        checkCartProductStockStatus(cart)
    }

    function checkCartProductStockStatus(data) {
        setFlag(true)
        data.forEach((x, index) => {
            let item = ProductStateData.find(p => p.id === x.product)
            if (item && !item.stock) {
                setFlag(false)
            }
            if (item && x.stockQuantity !== item.stockQuantity) {
                data[index].stockQuantity = item.stockQuantity
                dispatch(updateCart({ ...x }))
            }
        })
        setCart(data)
        calculate(data)
    }

    useEffect(() => {
        (() => {
            dispatch(getCart())
            if (CartStateData.length) {
                let data = CartStateData.filter(x => x.user === localStorage.getItem("userid"))
                checkCartProductStockStatus(data)
            }
            else {
                setCart([])
                calculate([])
            }
        })()
    }, [CartStateData.length, ProductStateData.length])

    useEffect(() => {
        (() => dispatch(getProduct()))()
    }, [ProductStateData.length])

    useEffect(() => {
        (() => dispatch(getWishlist()))()
    }, [WishlistStateData.length])
    return (
        <>
            <ToastContainer />
            {
                cart.length ?
                    <>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        {props.title === "Cart" ? <th>Pic</th> : null}
                                        {props.title === "Cart" ? <th>Brand</th> : null}
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Price</th>
                                        {props.title === "Cart" ? <th></th> : <th>Quantity</th>}
                                        <th>Total</th>
                                        {props.title === "Cart" ? <th></th> : null}
                                        {props.title === "Cart" ? <th></th> : null}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.map((item) => {
                                            return <tr key={item.id}>
                                                {
                                                    item.stockQuantity ? <td>{item.name}({`${item.stockQuantity} Left in Stock`})</td> :
                                                        <td className='text-danger'>{item.name}({`Out in Stock`})</td>
                                                }
                                                {
                                                    props.title === "cart" ? <td>
                                                        <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${item.pic}`} target='_blank' rel='noreferrer'>
                                                            <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${item.pic}`} height={60} width={80} alt="" />
                                                        </Link>
                                                    </td> : null
                                                }
                                                {props.title === "cart" ? <td>{item.brand}</td> : null}
                                                <td>{item.color}</td>
                                                <td>{item.size}</td>
                                                <td>&#8377;{item.price}</td>
                                                {props.title === "cart" ? <td>
                                                    <div>
                                                        <div className="btn-group w-100">
                                                            <button className='btn btn-primary' onClick={() => updateRecord(item.id, "DEC")}><i className='bi bi-dash'></i></button>
                                                            <h5 className='text-center mt-2 mx-3'>{item.qty}</h5>
                                                            <button className='btn btn-primary' onClick={() => updateRecord(item.id, "INC")}><i className='bi bi-plus'></i></button>
                                                        </div>
                                                    </div>
                                                </td> : <td>{item.qty}</td>}
                                                <td>&#8377;{item.total}</td>
                                                {props.title === "cart" ?
                                                    <>
                                                        <td><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='bi bi-x'></i></button></td>
                                                        <td><button className='btn btn-primary' onClick={() => addToWishlist(item.id)}>Move To Wishlist</button></td>
                                                    </> : null}
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-md-6"></div>
                            <div className={`${props.title === "checkout" ? 'col-md-12' : 'col-md-6'} mb-3`}>
                                <table className='table table-bordered'>
                                    <tbody>
                                        <tr>
                                            <th>Subtotal</th>
                                            <td>&#8377;{subtotal}</td>
                                        </tr>
                                        <tr>
                                            <th>Shipping</th>
                                            <td>&#8377;{shipping}</td>
                                        </tr>
                                        <tr>
                                            <th>Total</th>
                                            <td>&#8377;{total}</td>
                                        </tr>
                                        <tr>
                                            {
                                                flag === false ?
                                                    <td colSpan={2}>
                                                        <div className='card p-4 text-danger'>One or More Products From Your Cart Are Out of Stock? Please Remove or Move them in Wishlist to Place Your Order</div>
                                                    </td>
                                                    :
                                                    props.title === "cart" ?
                                                        <th colSpan={2}><Link to="/checkout" className='btn btn-primary w-100'>Proceed to Checkout</Link></th> :
                                                        <th colSpan={2}><button className='btn btn-primary w-100' onClick={placeOrder}>Place Order</button></th>
                                            }
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </> :
                    <div className='my-3 text-center'>
                        <div className="card pt-5 mb-3">
                            <h3>No Items in Cart</h3>
                        </div>
                        <Link to="/shop" className='btn btn-primary'>Shop Now</Link>
                    </div>
            }
        </>
    )
}
