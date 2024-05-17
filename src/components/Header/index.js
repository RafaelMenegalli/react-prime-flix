import {Link} from 'react-router-dom'
import './header.css'

function Header(){
    return (
        <header>
            <Link to="/" className="logo">Prime Filx</Link>
            <Link to="/favoritos" className="favorito">Meus Filmes</Link>
        </header>
    )
}

export default Header