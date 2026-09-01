import { Link } from "react-router-dom";
import "./GuestJobs.css";

function GuestJobs() {
    return (
        <div className="guest-page">
            <div className="guest-card">
                <h1>Login Required</h1>

                <p>
                    Please login or create an account to explore jobs,
                    apply for opportunities, and track your applications.
                </p>

                <div className="guest-buttons">
                    <Link to="/login">
                        <button className="login-btn">
                            Login
                        </button>
                    </Link>

                    <Link to="/register">
                        <button className="guest-register-btn">
                            Create Account
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default GuestJobs;