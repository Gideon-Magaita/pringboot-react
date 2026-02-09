import React from 'react'
import {Link} from 'react-router-dom'

const HeaderComponent = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand text-light" to="#">Employee Management System</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link text-light active" aria-current="page" to="/">Employees</Link>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link text-light" href="#">Add employee</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link text-light">Status</a>
                    </li>
                </ul>
                    <Link className="btn btn-outline-light" to="#">Add User</Link>
                </div>
            </div>
            </nav>
    </div>
  )
}

export default HeaderComponent
