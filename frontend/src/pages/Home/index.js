//index.js do HOME
import React from 'react'
import api from '../../utils/api'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'



function Home() {

  const [news, setNews] = useState([])

  useEffect(() => {
    api.get('/news').then((response) => {
      setNews(response.data.news)
    })
  }, [])
  return (
    <section>
    <div >
        <h1>NOTICIAS</h1>
        <p>Veja as melhores noticias</p>
    </div>
    <div className='d-flex justify-content-around flex-wrap'>
        {news.length > 0 ? (
            news.map((newsItem) => (
                <figure className='card' style={{ width: '18rem' }} key={newsItem.id}>
                    <img
                        src={`http://localhost:5000/images/news/${newsItem.ImageNews && newsItem.ImageNews[0] && newsItem.ImageNews[0].image}`}
                        className='card-img-top'
                        style={{height: '300px'}}
                    />
                    <figcaption className='card-body'>
                        <h3 className='card-title'>{newsItem.title}</h3>
                        <p className='card-text'>
                            <span>Caption:</span> {newsItem.caption}
                        </p>
                        <div dangerouslySetInnerHTML={{ __html: newsItem.article }} />
                        
                    </figcaption>
                </figure>
            ))
        ) : (
            <p>Não há noticias disponíveis para visualizar no momento!</p>
        )}
    </div>
</section>
  
  )
}

export default Home