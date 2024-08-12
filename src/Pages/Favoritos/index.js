import { useState, useEffect } from 'react'
import './favoritos.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Favoritos() {

    const [filmesFavoritos, setFilmesFavoritos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const meusFavoritos = localStorage.getItem("@primeFlix")
        setFilmesFavoritos(JSON.parse(meusFavoritos))
        setLoading(false)
        // console.log("Meus Favoritos",meusFavoritos)
    }, [])

    function excluirFilme(id) {
        toast.success("Filme excluido com sucesso!", {
            autoClose: 2500
        })
        const filmesFavoritosFiltrados = filmesFavoritos.filter((filme) => {
            return (filme.id !== id)
        })

        setFilmesFavoritos(filmesFavoritosFiltrados)
        localStorage.setItem("@primeFlix", JSON.stringify(filmesFavoritosFiltrados))
    }

    if (loading) {
        return (
            <div className='meus-favoritos-container'>
                <h1>Carregando filmes favoritos...</h1>
            </div>
        )
    }

    return (
        <div className='meus-favoritos-container'>
            <h1>Meus Filmes Favoritos</h1>

            {filmesFavoritos.length === 0 && <span>Sua lista de favoritos está vazia :(</span>}
            <ul>
                {filmesFavoritos.map(filme => {
                    return (
                        <li key={filme.id}>
                            <strong>{filme.title}</strong>
                            <div>
                                <Link to={`/filme/${filme.id}`}>Ver Detalhes</Link>
                                <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}

            </ul>
        </div>
    )
}

export default Favoritos