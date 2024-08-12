import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './filme.css'
import { toast } from 'react-toastify'

function Filme() {
    const { id } = useParams()
    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        async function loadFilme() {
            await api.get(`movie/${id}`, {
                params: {
                    api_key: '927ae0433845ac266478c8a41bed6d66',
                    language: 'pt-BR'
                }
            }).then((response) => {
                setFilme(response.data)
                setLoading(false)
            }).catch(() => {
                console.log("FILME NÃO ENCONTRADO")
                navigate('/', { replace: true })
                return;
            })

        }

        loadFilme()


        //component unMount
        return () => {
            // console.log("Componente Desmontadado")
        }
    }, [navigate, id])

    function salvarFilme() {
        console.log("Valor do filme :::>>")
        const minhaLista = localStorage.getItem("@primeFlix")
        const filmesSalvos = JSON.parse(minhaLista) || []
        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        if (hasFilme) {
            toast.warn('Filme já está na lista de favoritos!', {
                autoClose: 2500
            })
            return;
        }

        filmesSalvos.push(filme)
        localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos))
        toast.success("Filme adicionado com sucesso!", {
            autoClose: 2500
        })
    }

    if (loading) {
        return (
            <div className='list-filme-info-erro'>
                <h1>Carregando filme...</h1>
            </div>
        )
    }

    return (
        <div className='container-filme-info'>
            <div className='list-filme-info'>
                <h1>{filme.title}</h1>
                <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
                <h3>Sinopse</h3>
                <p>{filme.overview}</p>
                <strong>Avaliação: {filme.vote_average} / 10</strong>
            </div>

            <div className='container-buttton'>
                <button onClick={salvarFilme}>Salvar</button>
                <button><a href={`https://youtube.com/results?search_query=${filme.title} Trailer`} target='blank' rel='external'>Trailer</a></button>
            </div>
        </div>
    )
}

export default Filme