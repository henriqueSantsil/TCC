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

  function handleSubmit(e){
    e.preventDefault()
    login(user)
  }

  const notify = () => {
    toast ('Login realizado com sucesso!')
  }
  
  return (<>
    <section class="text-center text-lg-start rounded-start-2">
    <div class={styles.backgroundImage}>

<div class="container py-4 mt-5 ">
  <div class="row g-0 align-items-center">
    <div class="w-50 mb-5 mb-lg-0">
      <div class="card cascading-right " style={{background: 'hsla(0, 0%, 100%, 0.55);', backdropfilter: 'blur(30px);', margin: '10px,10px,auto'}}>
        <div class="card-body m-5 p-6 shadow-5 text-center">
          <h2 class="fw-bold mb-5">Realize seu login!</h2>
          <form onSubmit={handleSubmit}>
        
            <div class="row">
              
              <div class=" mb-4">
                <div class="form-outline">
                  <label class="form-label" for="email">Digite seu e-mail</label>
                  <InputGroup
                    label = {<i class="zmdi zmdi-email"></i>}
                    type='email'
                    placeholder='exemplo@hotmail.com'
                    name='email'
                    handleChange={handleChange}
                   />
                </div>
              </div>

            </div>
            <div class="row">
              <div class="form-outline  mb-4">
              <label class="form-label" for="form3Example4">Digite sua senha</label>
              <InputGroup
                  label = {<i class="zmdi zmdi-key"></i>}
                  type='password'
                  placeholder='xxxxxx'
                  name='password'
                  handleChange={handleChange}
                  />
            </div>
            </div>
            <button className='btn btn-success'
          onClick={notify}>Login
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