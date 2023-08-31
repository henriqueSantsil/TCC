import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../../utils/api'
import formatDateToBrazilianFormat from '../../../hooks/dateConvert'


function NewsDetails() {

    const [news, userSetNews] = useState({})
    const { id } = useParams()

    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get(`/news/${id}`).then((response) => {
            userSetNews(response.data.news)
        })
    }, [id])

    
    const formattedDate = formatDateToBrazilianFormat(news.createdAt);

    return (
        <div>
            {news.title && (
                <section>
                    <div>
                        <h3>Veja a noticia: {news.title}</h3>
                        <strong>{news.caption}</strong>
                    </div>
                    <div>
                        {news.ImageNews && news.ImageNews.length > 0 ? (
                            news.ImageNews.map((imageNews, index) => {
                                const imageUrl = `http://localhost:5000/images/news/${news.ImageNews?.[0]?.image}`
                                return (
                                    <img
                                        key={index}
                                        src={imageUrl}
                                        alt={news.title}
                                    />
                                )
                            })

                        ) : (
                            <p>Não há imagens disponiveis para esse cachorro</p>
                        )}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: news.article }} />

                    {token ? (
                        <strong>{formattedDate}</strong>
                    ) : (
                        <p>
                            Você precisa <Link to='/register'>Criar uma conta</Link> para solicitar a visita
                        </p>
                    )}
                </section>
            )}
        </div>
    )
}

export default NewsDetails;