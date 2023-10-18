//componente register
import React from "react";
import InputGroup from "../../../components/InputGroup";

//Notificações
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useAuth from '../../../hooks/useAuth';


import { Link } from 'react-router-dom'

import styles from "./register.module.css"

//hooks
import { useContext, useState } from "react";

//context
import { Context } from "../../../context/UserContext";

function Register() {
  //a logica para enviar um formulario, ou para fazer qualquer coisa diferenciada em uma pagina fica nesse local
  const [user, setUser] = useState({});
  const { register } = useContext(Context);

  function handleChange(evento) {
    setUser({ ...user, [evento.target.name]: evento.target.value });
    //{...user}: isso aqui, cria uma cópia do objeto user atual, usando a sintaze de espalhamento do javascript(...), essa cópia e feita para preservar valores existentes no objeto antes de fazer qualquer att
  }

  function handleSubmit(evento) {
    evento.preventDefault();
    register(user);
  }




  return ( <>
  

  <section class="text-center text-lg-start rounded-start-2">
    
    <div className={styles.backgroundImage}>

<div class="container py-4 mt-5 ">
  <div class="row g-0 align-items-center">
    <div class="w-50 responsive mb-5 mb-lg-0">
      <div class="card cascading-right " style={{background: 'hsla(0, 0%, 100%, 0.55);', backdropfilter: 'blur(30px);', margin: '10px,10px,auto'}}>
        <div class="card-body m-5 p-6 shadow-5 text-center">
          <h2 class="fw-bold mb-5">Crie sua conta de graça</h2>
          
          <form onSubmit={handleSubmit}>
        
            <div class="row">
              <div class="col-md-6 mb-4">
                <div class="form-outline">
                  <label class="form-label" for="name">Digite seu nome</label>
                  <InputGroup
                    label = {<i class="zmdi zmdi-account"></i>}
                    type='text'
                    placeholder='Seu nome aqui'
                    name='name'
                    handleChange={handleChange}
                   />
                  
                </div>
              </div>
              <div class="col-md-6 mb-4">
                <div class="form-outline">
                  <label class="form-label" for="email">Digite seu e-mail</label>
                  <InputGroup
                    label = {<i class="zmdi zmdi-email"></i>}
                    type='email'
                    placeholder='exemplo@exemplo.com'
                    name='email'
                    handleChange={handleChange}
                   />
                  
                </div>
              </div>
              
            </div>

            
            <div class="form-outline mb-4">
              
              <label class="form-label" for="form3Example3">Digite seu número</label>
              <InputGroup
                  label = {<i class="zmdi zmdi-phone"></i>}
                  type='tel'
                  placeholder='0000-0000'
                  name='phone'
                  handleChange={handleChange}
                  />
            </div>

            <div class="row">
              <div class="form-outline col-md-6 mb-4">
              <label class="form-label" for="form3Example4">Digite sua senha</label>
              <InputGroup
                  label = {<i class="zmdi zmdi-key"></i>}
                  type='password'
                  placeholder='xxxxxx'
                  name='password'
                  handleChange={handleChange}
                  />
            </div>

            <div class="form-outline col-md-6 mb-4">
              <label class="form-label" for="form3Example4">Confirme sua senha</label>
              <InputGroup
                  label = {<i class="zmdi zmdi-key"></i>}
                  type='password'
                  placeholder='xxxxxx'
                  name='confirmpassword'
                  handleChange={handleChange}
                  />
            </div>
            </div>

            <button className='btn btn-success'>Registrar
        </button>
        <ToastContainer />

        <p>
        Já possui conta?<Link to='/login'>Faça o seu login aqui!</Link>
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
  );
}

export default Register;
