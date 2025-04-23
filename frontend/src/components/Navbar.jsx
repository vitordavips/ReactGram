import './Navbar.css';

//components
import { NavLink, Link } from 'react-router-dom';
import {BsSearch, BsHouseDoorFill, BsFillCameraFill, BsFillPersonFill} from "react-icons/bs";

// Hooks
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//Redux
import {logout, reset} from '../slices/authSlice.jsx';

const Navbar = () => {
    // Hook para obter informações de autenticação
    const { auth } = useAuth();

    // Seleciona o estado atual do usuário autenticado
    const { user } = useSelector((state) => state.auth);

    const [query, setQuery] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());

        navigate("/login");
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if(query){
            return navigate(`/search?q=${query}`);
        }
    };

    return (
        <nav id='nav'>
            {/* Link principal para a página inicial */}
            <Link to="/">ReactGram</Link>

            {/* Formulário para realizar a pesquisa */}
            <form>
                {/* Ícone de pesquisa */}
                <BsSearch />
                {/* Campo de entrada para pesquisa */}
                <input 
                    type="text" 
                    placeholder='Pesquisar' 
                    onChange={(e) => setQuery(e.target.value)
                }/>
            </form>

            {/* Links de navegação */}
            <ul id="nav-links">
                {/* Renderização condicional baseada na autenticação */}
                {auth ? (
                    <>
                        {/* Link para a página inicial */}
                        <li>
                            <NavLink to="/">
                                <BsHouseDoorFill />
                            </NavLink>
                        </li>

                        {/* Link para a página do usuário, exibido somente se o usuário estiver definido */}
                        {user && (
                            <li>
                                <NavLink to={`/users/${user._id}`}>
                                    <BsFillCameraFill />
                                </NavLink>
                            </li>
                        )}

                        {/* Link para o perfil do usuário */}
                        <li>
                            <NavLink to="/profile">
                                <BsFillPersonFill />
                            </NavLink>
                        </li>

                        {/* Opção para sair */}
                        <li>
                            <span onClick={handleLogout}>Sair</span>
                        </li>
                    </>
                ) : (
                    <>
                        {/* Links para login e registro, exibidos quando o usuário não está autenticado */}
                        <li>
                            <NavLink to="/login">Entrar</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">Cadastrar</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
