import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminSidebar() {
    return (
        <div className="list-group">
            <Link to="/admin" className="list-group-item list-group-item-action" aria-current="true"><i className='fs-4 fa fa-home'></i><span className='float-end'>Home</span></Link>
            <Link to="/admin/maincategory" className="list-group-item list-group-item-action" aria-current="true"><i className='fs-4 fa fa-th-large'></i><span className='float-end'>Maincategory</span></Link>
            <Link to="/admin/subcategory" className="list-group-item list-group-item-action" aria-current="true"><i className='fs-4 fa fa-list'></i><span className='float-end'>Subcategory</span></Link>
            <Link to="/admin/brand" className="list-group-item list-group-item-action" aria-current="true"><i className='fs-4 fa fa-trademark'></i><span className='float-end'>Brand</span></Link>
            <Link to="/admin/product" className="list-group-item list-group-item-action" aria-current="true"><i className='fs-4 fa fa-cubes'></i><span className='float-end'>Product</span></Link>
            <Link to="/admin/feature" className="list-group-item list-group-item-action" aria-current="true"><i className='fs-4 fa fa-puzzle-piece'></i><span className='float-end'>Features</span></Link>
            <Link to="/admin/faq" className="list-group-item list-group-item-action" aria-current="true"><i className='fs-4 fa fa-question'></i><span className='float-end'>Faq</span></Link>
            <Link to="/admin/setting" className="list-group-item list-group-item-action" aria-current="true"><i className='fs-4 fa fa-gear'></i><span className='float-end'>Settings</span></Link>
            <Link to="/admin/newsletter" className="list-group-item list-group-item-action" aria-current="true"><i className='fs-4 fa fa-envelope'></i><span className='float-end'>Newsletter</span></Link>
            <Link to="/admin/contactus" className="list-group-item list-group-item-action" aria-current="true"><i className='fs-4 fa fa-phone'></i><span className='float-end'>Contact Us</span></Link>
            <Link to="/admin/checkout" className="list-group-item list-group-item-action" aria-current="true"><i className='fs-4 fa fa-shopping-bag'></i><span className='float-end'>Checkouts</span></Link>
            {localStorage.getItem("role") === "Super Admin" ? <Link to="/admin/user" className="list-group-item list-group-item-action" aria-current="true"><i className='fs-4 fa fa-users'></i><span className='float-end'>Users</span></Link> : null}
        </div>
    )
}
