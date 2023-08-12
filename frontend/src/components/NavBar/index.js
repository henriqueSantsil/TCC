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
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        {!authenticated ? (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/register">Registrar</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/user/profile">Perfil</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/news/create">Cadastrar notícia</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/news/mynews">Minhas notícias</Link></li>
                                <li onClick={logout} className="nav-item"><Link className="nav-link" to='/'>Sair</Link></li>
                            </>

                        )}
                        
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar