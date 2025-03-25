// React Router Link
import { NavLink } from "react-router-dom";

// Style files
import "./navbar.css";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                <NavLink to="/" className={({ isActive }) => isActive ? "NavbarActive" : ""}>Home</NavLink>
                </li>
                <li>
                <NavLink to="/universities" className={({ isActive }) => isActive ? "NavbarActive" : ""}>Universities</NavLink>
                </li>
            </ul>
        </nav>
    );
};
  
export default Navbar;