import api from '../utils/api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function useAuth() {
    //useState() é um hook para alterar o estado de algo
    const [authenticated, setAuthenticated] = useState(false)
    //useNavigate() é utilizado para redirecionar o usuario para uma rota 
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            //JSON.parse() converte JSON em string
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    async function authUser(data) {
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))
        navigate('/')
    }

    async function register(user) {
        try {
            const data = await api.post('/users/register', user)
                .then((response) => {
                    return response.data
                })
            const notify = () => toast.success("Registro realizado com sucesso!", {
                theme: "dark"
            });
            notify()
            await authUser(data)
        } catch (error) {
            let message = error.response.data.message
            console.log('Erro ao cadastrar ', error)
            const notify = () => toast.warn(message, {
                theme: "dark"
            });
            notify()
            
        }
    }

    async function login(user) {
        try {
            const data = await api.post('/users/login', user)
                .then((response) => {
                    return response.data
                })
            const notify = () => toast.success(data.message, {
                theme: "dark"
            });
            notify()
            await authUser(data)
            navigate('users/profile')
        } catch (error) {
            let message = error.response.data.message
            console.log('Error ao fazer login', error)
            const notify = () => toast.warn(message, {
                theme: "dark"
            });
            notify()
        }
    }

    function logout() {
        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        navigate('/')
        const notify = () => toast.success("Logout realizado com sucesso!", {
            theme: "dark"
        });
        notify()
    }

    return { authenticated, register, login, logout }

}

export default useAuth