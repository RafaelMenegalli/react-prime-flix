import { useState, useEffect } from 'react';
import api from './../../services/api';
import { Link } from 'react-router-dom';
import './home.css'

function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get('discover/movie', {
                params: {
                    api_key: '927ae0433845ac266478c8a41bed6d66',
                    language: 'pt-BR',
                    page: 1
                }
            });
            setFilmes(response.data.results.slice(0, 15));
            setLoading(false)
            // console.log(response.data.results.slice(0, 15));
        }

        loadFilmes();
    }, []);

    if(loading){
        return(
            <div>
                <h1>Carregando Filmes...</h1>
            </div>
        )
    }

    return (
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filme, index) => (
                    <article key={index}>
                        <strong className="titulo">{filme.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={"img-" + filme.title} className='capa' />
                        <Link to={`filme/${filme.id}`} className='acessar'>Acessar</Link>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Home;
