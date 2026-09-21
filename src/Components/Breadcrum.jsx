import React from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrum({ title }) {
    return (
        <div className="container-fluid bg-primary hero-header">
            <div className="container py-4">
                <div className="row g-3 align-items-center">
                    <div className="col-lg-6 text-center text-lg-start">
                        <h1 className="display-5 mb-0 animated slideInLeft">{title}</h1>
                    </div>
                    <div className="col-lg-6 animated slideInRight">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb justify-content-center justify-content-lg-end mb-0">
                                <li className="breadcrumb-item"><Link className="text-primary" to="/">Home</Link></li>
                                <li className="breadcrumb-item text-secondary active" aria-current="page">{title}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}
