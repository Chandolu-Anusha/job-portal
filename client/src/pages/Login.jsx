import {useState}from "react";
import api from "../services/api";
import {useNavigate}from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[loginSuccess,setLoginSuccess]=useState("");

    const navigate=useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await api.post("/auth/login", {
            email,
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
        console.error(error.response?.data?.message || "Login failed.");
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

            <h2 className="auth-title">Login</h2>

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

                <button className="auth-btn" type="submit">
                    Login
                </button>

            </form>

        </div>

    </div>
);
}
export default Login;