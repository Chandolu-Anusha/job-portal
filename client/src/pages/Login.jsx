import {useState}from "react";
import api from "../services/api";
import {useNavigate}from "react-router-dom";
import { toast} from 'react-toastify';

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", { email, password });

            localStorage.setItem("token",response.data.token);
            localStorage.setItem("user",JSON.stringify(response.data.user));
            
            toast.success("Login successful!");
            setTimeout(() => {
                navigate("/");
                window.location.reload();
            },1500);

        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed.");
        }
    };

    return(
        <div>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br/>
                <br/>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br/><br/>
                <button type="submit">Login</button>
            </form >
        </div>
    );
}
export default Login;