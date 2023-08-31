import React, { useState, useEffect, useRef } from 'react'
import api from '../../../utils/api'
import { useNavigate } from 'react-router-dom'
import InputGroup from '../../../components/InputGroup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import InputGroupCKEditor from '../../../components/InputGroupCkEditor';

function UpdateNews() {
    //Aqui vamos digitar a logica do perfil
    const [user, setUser,news, setNews] = useState({})
    const [preview, setPreview] = useState()
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            alert('Por favor faça o login')
            navigate('/login')
        } else {
            api.patch('news/:id', {
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

        console.log(news)

        const formData = new FormData()

        //adiciona a imagem ao formdata (se ela existir)
        if (image) {
            formData.append('image', image)
        }

        //adiciona as outras propriedades do usuario ao formData
        await Object.keys(news).forEach((key) => formData.append(key, news[key]))

        const data = await api.patch(`news/update/${news.id}`, formData, {
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
                    <label htmlFor="newsImageInput">

                        <img
                            class="rounded-circle"
                            style={{ height: '200px', width: '200px', cursor: 'pointer' }}
                            src={
                                preview ||
                                (user.image
                                    ? 'http://localhost:5000/images/news/' + news.image
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
                    id="profileNewsInput"
                    type="file"
                    name="image"
                    onChange={onFileChange}
                    style={{ display: 'none' }}
                />
                <form onSubmit={handleSubmit}>



                    <div className="container mt-5">

                        {/* Segundo Bloco: Informações Privadas */}
                        <div className="card">
                            <div className="card-header">
                               Atualize sua noticia
                            </div>
                            <div class="container bg-light">
                                <div className="card-body">
                                <InputGroup
                                    type='text'
                                    label='Titulo da noticia'
                                    placeholder='Digite o titulo da noticia'
                                    name='title'
                                    handleChange={handleChange} />
                                <InputGroup
                                    type='textarea'
                                    label='Subtitulo'
                                    placeholder='Digite a descrição da noticia'
                                    name='caption'
                                    handleChange={handleChange} />
                                <InputGroupCKEditor
                                    label="Notícia"
                                    name="article"
                                    handleChange={handleChange}
                                    value={news.article} />
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

export default UpdateNews;