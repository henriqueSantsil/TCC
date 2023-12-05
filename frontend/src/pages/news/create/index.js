import React, { useState } from 'react'
import InputGroup from '../../../components/InputGroup'
import api from '../../../utils/api'
import { useNavigate } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import InputGroupCKEditor from '../../../components/InputGroupCkEditor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function AddNews() {
    const [news, setNews] = useState({})
    const [preview, setPreview] = useState()
    const [token] = useState(localStorage.getItem('token' || ''))

    const navigate = useNavigate()

    function handleChange(e) {
        setNews({ ...news, [e.target.name]: e.target.value })
    }

    const [images, setImage] = useState(null)

    //trabalhando com imagem
    function onFileChange(e) {
        setPreview(URL.createObjectURL(e.target.files[0]))
        setImage(e.target.files[0])
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData()

        if (images) {
            formData.append('images', images)
        }

        await Object.keys(news).forEach((key) => formData.append(key, news[key]))

        formData.append('news', JSON.stringify(news))

        const data = await api.post('news/create', formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            const notify = () => toast.success("Noticia cadastrada com sucesso!", {
                theme: "dark"
            });
            navigate('/')
            notify()
            return response.data
        }).catch((err) => {
            let message = err.response.data.message
            const notify = () => toast.warn(message, {
                theme: "dark"
            });
            notify()
            return err.response.data.message
        })
        
    }


        return (
           <>
            <div className="row justify-content-center mt-3">
                <div className="col-auto">
                    <label htmlFor="newsImageInput">

                        <img

                            style={{ height: '200px', width: '200px', cursor: 'pointer' }}
                            src={preview ||
                                (news.image
                                    ? 'http://localhost:5000/images/news/' + news.image
                                    : 'https://imgs.search.brave.com/z3Rkncq4le9dXD4ml_g86LWSNHMo3vSIx58WpRNWJUI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTMx/NjQzMTUwL3ZlY3Rv/ci9waWN0dXJlLWlj/b24uanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVN0LWdwUm41/OGVJYThFREFIcG5f/eU80Q1paQW5HRDZ3/S3BsbjlsM1ozT2s9') // Your placeholder image URL
                            }
                            alt='Click to change profile picture' />
                    </label>

                </div>
            </div><div className="container mt-5">

                    <input
                        id="newsImageInput"
                        type="file"
                        name="image"
                        onChange={onFileChange}
                        style={{ display: 'none' }} />

                    <form onSubmit={handleSubmit}>



                        {/* Bloco: Detalhes da Notícia */}
                        <div className="card">
                            <div className="card-header">
                                <strong>Detalhes da Notícia</strong>
                            </div>
                            <div className="card-body bg-light">
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

                        {/* Botão para submissão */}
                        <div className="d-grid gap-2 col-6 mx-auto mt-4">
                            <button type='submit' className="btn btn-outline-primary">Cadastrar noticia</button>
                        </div>
                    </form>
                </div>
        
            </>
        )
        }
export default AddNews;