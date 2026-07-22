import {useState}from "react";
import api from "../services/api";


function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", { email, password });
            console.log(response.data);

            localStorage.setItem("token",response.data.token);
        } catch (error) {
            console.error(error);
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