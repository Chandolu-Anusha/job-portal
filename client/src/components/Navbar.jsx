import {Link} from "react-router-dom";
function Navbar(){
    return(
        <nav>
            <h1>Job portal</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>               
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                    <Link to="/my">My Applications</Link>
                </li>
            </ul>
        </nav>
    );
}
export default Navbar;