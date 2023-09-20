import React from 'react'
import InputGroup from '../../../components/InputGroup'

import { Link } from 'react-router-dom'

//context
import { Context } from '../../../context/UserContext'
import { useContext, useState } from 'react'

import styles from "./login.module.css"

//Notificaçoes com Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [user, setUser] = useState({})
  const { login } = useContext(Context)

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    login(user)
  }



  return (<>
    <section className={styles.backgroundImage}>
      <div>

        <div className="container py-4 mt-5 ">
          <div className="row g-0 align-items-center">
            <div className={styles.seila}>
              <div className="card cascading-right " style={{ background: 'hsla(0, 0%, 100%, 0.55);', backdropfilter: 'blur(30px);' }}>
                <div className="card-body m-5 p-6 shadow-5 text-center">
                  <h2 className="fw-bold mb-5">Realize seu login!</h2>
                  <form onSubmit={handleSubmit}>

                    <div className="row">

                      <div className=" mb-4">
                        <div className="form-outline">
                          <label className="form-label" for="email">Digite seu e-mail</label>
                          <InputGroup
                            label={<i className="zmdi zmdi-email"></i>}
                            type='email'
                            placeholder='exemplo@hotmail.com'
                            name='email'
                            handleChange={handleChange}
                          />
                        </div>
                      </div>

                    </div>
                    <div className="row">
                      <div className="form-outline  mb-4">
                        <label className="form-label" for="form3Example4">Digite sua senha</label>
                        <InputGroup
                          label={<i className="zmdi zmdi-key"></i>}
                          type='password'
                          placeholder='xxxxxx'
                          name='password'
                          handleChange={handleChange}
                        />
                      </div>
                    </div>
                    <button className='btn btn-success'
                    >Login
                    </button>
                    <ToastContainer />

                    <p>
                      não possui conta?<Link to='/register'>Faça sua conta aqui!</Link>
                    </p>

                  </form>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>

  </>
  )
}

export default Login