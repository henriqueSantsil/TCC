import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Profile.module.css';
import Pagination from '../../../components/Pagination' 
import { Link } from 'react-router-dom'

function Profile() {
    const [user, setUser] = useState({});
    const [userNews, setUserNews, news] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const navigate = useNavigate();
    

    useEffect(() => {
        if (!token) {
            const notify = () => toast.warn("Faça login", { theme: "dark" });
            notify();
            navigate('/login');
        } else {
            api.get('/users/checkuser', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then((response) => {
                setUser(response.data);
                
                // Fetch the user-specific news using the user ID.
                api.get(`/users/profile/${response.data.id}`)
                    .then(newsResponse => {
                        if (Array.isArray(newsResponse.data.news)) {
                            setUserNews(newsResponse.data.news);
                        }
                        else {
                            console.error("Unexpected data format:", newsResponse.data);
                        }
                    })
                    .catch(error => {
                        console.error("Error fetching user news:", error);
                    });
            });
        }
    }, [token, navigate]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = userNews.slice(indexOfFirstItem, indexOfLastItem);

    // Function to change the page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    async function removeNewsById(id) {
        const data = await api.delete(`/news/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            const updatedNews = userNews.filter((userNews) => userNews.id !== id)
            setUserNews(updatedNews)
            return response.data
        }).catch((err) => {
            return err.response.data
        })

        let message  = data.message
        const notify = () => toast.success(message, {
            theme: "dark"
        });
        notify() 
    }

    // async function updateNews(id) {
    //     const data = await api.patch(`/news/${id}`, {
    //         headers: {
    //             Authorization: `Bearer ${JSON.parse(token)}`
    //         }
    //     }).then((response) => {
    //         const updateNews = userNews.filter((userNews) => userNews.id !== id)
    //         setUserNews(updateNews)
    //         return response.data
    //     }).catch((err) => {
    //         return err.response.data
    //     })

    //     let message  = data.message
    //     const notify = () => toast.success(message, {
    //         theme: "dark"
    //     });
    //     notify() 
    // }


    return (
        <div className={styles.container}>
            <ToastContainer />
    
            {/* User profile block */}
            <div className={styles.profileBlock}>
                <img
                    className={styles.profileImage}
                    src={
                        user.image
                            ? 'http://localhost:5000/images/users/' + user.image
                            : 'https://i.pinimg.com/originals/a0/4d/84/a04d849cf591c2f980548b982f461401.jpg' // Default placeholder image
                    }
                    alt="User profile"
                />
                <div className={styles.profileDetails}>
                    <h2>Olá {user.name}</h2>
                    <p>{user.bio}</p>
                </div>
            </div>
    
            {/* News block */}
            <h3>Your Posted News:</h3>
            <div className={styles.newsBlock}>
                
    
                {currentItems.length > 0 ? (
                    currentItems.map((newsItem) => (
                        <figure className={styles.card} key={newsItem.id}>
                            <img
                                src={`http://localhost:5000/images/news/${newsItem.ImageNews?.[0]?.image}` }
                                className={styles.cardImgTop}
                                alt={`Image for ${newsItem.title}`}
                            />
                            <figcaption className={styles.cardBody}>
                                <h3 className={styles.cardTitle}>{newsItem.title}</h3>
                                <p className={styles.cardText}>
                                    <strong>Subtitulo:</strong> {newsItem.caption}
                                </p>
                                <div dangerouslySetInnerHTML={{ __html: newsItem.article.slice(0, 155) }} />
                                {newsItem.article.length > 155 && 
                                    <Link to={`/news/details/${newsItem.id}`}>... Leia mais</Link>
                                } 

                                <button
                                
                                    onClick={(userNews) => { removeNewsById(newsItem.id) }}
                                    className='d-block btn btn-danger'
                                >Excluir</button>
                                {/* <button
                                
                                    onClick={(userNews) => { updateNews(newsItem.id) }}
                                    className='d-block btn btn-danger'
                                >Editar</button> */}
                            </figcaption>
                        </figure>
                    ))
                ) : (
                    <p>Você ainda não postou nada <Link to='/news/create' >Cadastre uma agora!</Link></p>
                )}
    
                
            </div>
            <Pagination 
                    itemsPerPage={itemsPerPage} 
                    totalItems={userNews.length} 
                    paginate={paginate} 
                    currentPage={currentPage} 
                />
        </div>
    );
    
                    

}

export default Profile;
