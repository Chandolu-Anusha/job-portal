import {useState}from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import {useNavigate}from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[loginSuccess,setLoginSuccess]=useState("");

    const navigate=useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim before validating empty required fields.
    const emailTrimmed = email.trim();

    if (!emailTrimmed || !password.trim()) {
        toast.error("Please enter your email and password.");
        return;
    }

    try {
        const response = await api.post("/auth/login", {
            email: emailTrimmed,
            password,
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setLoginSuccess(true);

        setTimeout(() => {
            navigate("/", { replace: true });
            window.location.reload();
        }, 1000);

    } catch (error) {
        if (error.response) {
            toast.error(
                error.response.data?.message || "Invalid email or password."
            );
        } else {
            toast.error("Unable to connect to the server. Please try again.");
        }
    }
};

if (loginSuccess) {
    return (
        <div className="logout-page">
            <div className="logout-card">
                <h2>Login Successful</h2>
                <p>Redirecting...</p>
            </div>
        </div>
    );
}
    return (
    <div className="auth-page">

        <div className="auth-card">

            <h2 className="auth-title">Welcome back</h2>

            <p className="auth-subtitle">Login to your account to continue</p>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="Enter Email"
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                    />
                </div>

                <div className="forgot-row">
                    <Link to="/forgot-password" className="forgot-link">
                        Forgot Password?
                    </Link>
                </div>

                <button className="auth-btn" type="submit">
                    Login
                </button>

            </form>

            <p className="auth-footer">
                Don't have an account? <Link to="/register">Register</Link>
            </p>

        </div>

    </div>
);
}
export default Login;