import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
//Contexto
import { Context } from '../../context/UserContext'

function NavBar() {
    const { authenticated, logout } = useContext(Context)

    return (
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        
            <div className="container">
                <Link className="navbar-brand" to="/">Radar da informação</Link>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css" rel="stylesheet" />

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" to="/"><i className="bi bi-house-door"></i></Link></li>
                        {!authenticated ? (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/register">Registrar</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                            </>
                        ) : (
                            <>
                              <li className="nav-item"><Link className="nav-link" to="/news/create"><i className="bi bi-clipboard"></i></Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/users/profile"><i className="bi bi-person-circle"></i> </Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/users/settings"><i className="bi bi-gear"></i></Link></li>
                        <li onClick={logout} className="nav-item"><Link className="nav-link" to='/'><i className="bi bi-box-arrow-right"></i> </Link></li>
                            </>

                        )}


                        <Link className="nav-link" to="/">

                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar