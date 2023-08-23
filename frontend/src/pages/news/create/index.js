import React, { useState } from 'react'
import InputGroup from '../../../components/InputGroup'
import api from '../../../utils/api'

function AddNews() {
    const [news, setNews] = useState({})
    const [preview, setPreview] = useState()
    const [token] = useState(localStorage.getItem('token' || ''))

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
            return response.data
        }).catch((err) => {
            alert(err.response.data)
            return err.response.data
        })
        alert(data.message)
    }

    return (
        <section>
            <div>
                <h3>Crie sua noticia</h3>
                <p>Depois ficará disponivel para lerem</p>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <InputGroup
                        type='file'
                        label='Imagem'
                        placeholder='Coloque a foto da noticia'
                        name='images'
                        handleChange={onFileChange}
                    />
                    <InputGroup
                        type='text'
                        label='Titulo da noticia'
                        placeholder='Digite o titulo da noticia'
                        name='name'
                        handleChange={handleChange}
                    />
                    <InputGroup
                        type='textarea'
                        label='Caption'
                        placeholder='Digite a descrição da noticia'
                        name='caption'
                        handleChange={handleChange}
                    />
                    <InputGroup
                        type='textarea'
                        label='news'
                        placeholder='Digite a noticia'
                        name='news'
                        handleChange={handleChange}
                    />
                    
                    <button type='submit'>Cadastrar noticia</button>
                </form>
            </div>
        </section>
    )
}

export default AddNews