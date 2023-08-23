import React, { useState, useEffect, useRef } from 'react'
import api from '../../../utils/api'
import { useNavigate } from 'react-router-dom'
import InputGroup from '../../../components/InputGroup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Style from '../Settings/settings.module.css'


function Settings() {
    //Aqui vamos digitar a logica do perfil
    const [user, setUser] = useState({})
    const [preview, setPreview] = useState()
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            alert('Por favor faça o login')
            navigate('/login')
        } else {
            api.get('/users/checkuser', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then((response) => {
                setUser(response.data)
            })
        }
    }, [token, navigate])

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    //trabalhando com a imagem
    const [image, setImage] = useState(null)

    function onFileChange(e) {
        setPreview(URL.createObjectURL(e.target.files[0]))
        setImage(e.target.files[0])
    }

    async function handleSubmit(e) {
        e.preventDefault()

        console.log(user)

        const formData = new FormData()

        //adiciona a imagem ao formdata (se ela existir)
        if (image) {
            formData.append('image', image)
        }

        //adiciona as outras propriedades do usuario ao formData
        await Object.keys(user).forEach((key) => formData.append(key, user[key]))

        const data = await api.patch(`users/settings/${user.id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            const notify = () => toast.success("Sucesso!", {
                theme: "dark"
            });
            notify()
            return response.data
        }).catch((err) => {
            let message = err.response.data.message
            const notify = (err) => toast.warn(message, {
                theme: "dark"
            });
            notify()
            

            return err.response.data
        })


    }
    
    return (
        <div class="container">

            <div className="row justify-content-center mt-3">
                <div className="col-auto">
                    <label htmlFor="profileImageInput">

                        <img
                            class="rounded-circle"
                            style={{ height: '200px', width: '200px', cursor: 'pointer' }}
                            src={
                                preview ||
                                (user.image
                                    ? 'http://localhost:5000/images/users/' + user.image
                                    : 'https://i.pinimg.com/originals/a0/4d/84/a04d849cf591c2f980548b982f461401.jpg') // Your placeholder image URL
                            }
                            alt='Click to change profile picture'
                        />
                    </label>
                    <h2 className=" row mt-3 justify-content-center">Olá {user.name} </h2>
                </div>
            </div>


            <div className="container mt-5">
                {/* Invisible file input */}
                <input
                    id="profileImageInput"
                    type="file"
                    name="image"
                    onChange={onFileChange}
                    style={{ display: 'none' }}
                />
                <form onSubmit={handleSubmit}>



                    <div className="container mt-5">

                        {/* Primeiro Bloco: Nome e Bio */}
                        <div className="card mb-4">
                            <div className="card-header">
                                Informações Públicas
                            </div>
                            <div class="container bg-light">
                                <div className="card-body">
                                    <InputGroup
                                        type='text'
                                        label={<i className="zmdi zmdi-account"></i>}
                                        name='name'
                                        placeholder='Digite seu nome'
                                        handleChange={handleChange}
                                        value={user.name}
                                    />
                                    <InputGroup
                                        type='textarea'
                                        label={<i className="zmdi zmdi-comment-text"></i>}
                                        name='bio'
                                        placeholder='Insira sua bio'
                                        handleChange={handleChange}
                                        value={user.bio}
                                    />
                                </div>
                            </div>
                        </div>


                        {/* Segundo Bloco: Informações Privadas */}
                        <div className="card">
                            <div className="card-header">
                                Informações Privadas
                            </div>
                            <div class="container bg-light">
                                <div className="card-body">
                                    <InputGroup
                                        type='email'
                                        label={<i className="zmdi zmdi-email"></i>}
                                        name='email'
                                        placeholder='Digite seu email'
                                        handleChange={handleChange}
                                        value={user.email}
                                    />
                                    <InputGroup
                                        type='tel'
                                        label={<i className="zmdi zmdi-phone"></i>}
                                        name='phone'
                                        placeholder='Digite seu telefone'
                                        handleChange={handleChange}
                                        value={user.phone}
                                    />
                                    <InputGroup
                                        type='password'
                                        label={<i className="zmdi zmdi-key"></i>}
                                        name='password'
                                        placeholder='Digite sua senha'
                                        handleChange={handleChange}
                                        value={user.password}
                                    />
                                    <InputGroup
                                        type='password'
                                        label={<i className="zmdi zmdi-key"></i>}
                                        name='confirmpassword'
                                        placeholder='Confirme sua senha'
                                        handleChange={handleChange}
                                        value={user.confirmpassword}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="d-grid gap-2 col-6 mx-auto mt-4">
                            <button type='submit' className="btn btn-outline-primary">Atualizar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Settings