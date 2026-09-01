import {Link, NavLink} from "react-router-dom";
import HistoryControls from "./HistoryControls";
import "./Navbar.css";

function Navbar(){
    const user=JSON.parse(localStorage.getItem("user"));
    const linkClass = ({isActive}) => "nav-link" + (isActive ? " active" : "");
    return(
        <nav className="navbar">
            <div className="navbar-inner">
                <div className="nav-left">
                    <HistoryControls />
                    <Link to="/" className="logo">
                        <span className="logo-mark">JP</span>
                        <span className="logo-text">Job Portal</span>
                        {user?.role && (
                            <span className="logo-role">{user.role}</span>
                        )}
                    </Link>
                </div>
                <ul className="nav-links">
                    <li>
                        <NavLink to="/" className={linkClass} end>Home</NavLink>
                    </li>
                    {!user && (
                        <>
                        
                        <li>
                            <NavLink to="/register" className={linkClass}>Register</NavLink>
                        </li>
                         <li>
                            <NavLink to="/login" className={linkClass}>Login</NavLink>
                        </li>
                        </>
                    )} 
                    {user?.role === "student" && (
                         <>
                         <li>
                            <NavLink to="/my" className={linkClass}>My Applications</NavLink>
                        </li>
                        <li>
                            <NavLink to="/saved-jobs" className={linkClass}>Saved Jobs</NavLink>
                        </li>

                        </>
                    )}
                   
                    {user?.role === "recruiter" && (
                        <>
                        <li>
                            <NavLink to="/create-job" className={linkClass}>Create Job</NavLink>
                        </li>

                        <li>
                            <NavLink to="/manage-jobs" className={linkClass}>Manage Jobs</NavLink>
                        </li>
                        </>
                    )}
                    
        
                    {user && (
                        <>
                        <li>
                            <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
                        </li>

                        <li>
                            <NavLink to="/jobs" className={linkClass}>Jobs</NavLink>
                        </li>

                        <li>
                            <NavLink to="/profile" className={linkClass}>Profile</NavLink>
                        </li>

                        <li>
                            <NavLink to="/logout" className={linkClass}>Logout</NavLink>
                        </li>
                       
                        </>
                        
                    )}
                    
                    
                </ul>
            </div>
        </nav>
    );
}
export default Navbar;