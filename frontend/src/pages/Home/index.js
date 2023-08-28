import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import styles from './Home.module.css';
import Pagination from '../../components/Pagination'; // Import the Pagination component

function Home() {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        api.get('/news').then((response) => {
            setNews(response.data.news);
        });
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);

    // Function to change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className={styles.container}>
            <div>
                <h1>NOTICIAS</h1>
                <p>Veja as melhores noticias</p>
            </div>
            <div className={styles.newsList}>
                {currentItems.length > 0 ? (
                    currentItems.map((newsItem) => (
                        <figure className={styles.card} key={newsItem.id}>
                            <img
                                src={`http://localhost:5000/images/news/${newsItem.ImageNews?.[0]?.image}`}
                                className={styles.cardImgTop}
                                alt={`Image for ${newsItem.title}`}
                            />
                            <figcaption className={styles.cardBody}>
                                <h3 className={styles.cardTitle}>{newsItem.title}</h3>
                                <p className={styles.cardText}>
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

            <Pagination 
                itemsPerPage={itemsPerPage} 
                totalItems={news.length} 
                paginate={paginate} 
                currentPage={currentPage} 
            />
        </section>
    );
}

export default Home;
