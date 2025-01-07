import './Navbar.css';

//components
import { NavLink, Link } from 'react-router-dom';
import {BsSearch, BsHouseDoorFill, BsFillPersonaFill, BsFillCameraFill} from "react-icons/bs";

const Navbar = () => {
  return (
    <nav>
        <Link to="/">ReactGram</Link>
        <form>
            <BsSearch/>
            <input type="text" />
        </form>
        <ul id="nav-links">
            <NavLink to="/">
                <BsHouseDoorFill/>
            </NavLink>
            <NavLink to="/login">Entrar</NavLink>
            <NavLink to="/register">Cadastrar</NavLink>
        </ul>
    </nav>
  )
}

export default Navbar