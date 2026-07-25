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
                <li>
                    <Link to="/manage-jobs">ManageJobs</Link>
                </li>
                <li>
                    <Link to="/create-job">Create Job</Link>
                </li>
                <li>
                    <Link to="/Saved-jobs">Saved Jobs</Link>
                </li>
                <li>
                    <Link to="/Upload-Resume">Upload Resume</Link>
                </li>
            </ul>
        </nav>
    );
}
export default Navbar;