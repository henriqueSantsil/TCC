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
        <div>
            <label htmlFor="profileImageInput">
            <img
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
        
        {/* Invisible file input */}
        <input 
            id="profileImageInput"
            type="file"
            name="image"
            onChange={onFileChange}
            style={{ display: 'none' }}
        />
            
            <form onSubmit={handleSubmit}>
                <InputGroup
                    type='text'
                    label='Nome'
                    name='name'
                    placeholder='Digite seu nome'
                    handleChange={handleChange}
                    value={user.name}
                />
                <InputGroup
                    type='email'
                    label='email'
                    name='email'
                    placeholder='Digite seu email'
                    handleChange={handleChange}
                    value={user.email}
                />
                <InputGroup
                    type='phone'
                    label='phone'
                    name='phone'
                    placeholder='Digite seu phone'
                    handleChange={handleChange}
                    value={user.phone}
                />
                <InputGroup
                    type='text'
                    label='bio'
                    name='bio'
                    placeholder='Insira sua bio'
                    handleChange={handleChange}
                />
                <InputGroup
                    type='password'
                    label='password'
                    name='password'
                    placeholder='Digite seu password'
                    handleChange={handleChange}
                />
                <InputGroup
                    type='password'
                    label='password'
                    name='confirmpassword'
                    placeholder='Digite seu password'
                    handleChange={handleChange}
                   
                />
                <button type='submit'>Atualizar</button>
            </form>
        </div>
    )
}

export default Settings