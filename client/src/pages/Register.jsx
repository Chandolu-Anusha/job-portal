import { useState} from "react";
import api from "../services/api";

function Register(){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

   const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const response=await api.post("/auth/register",{name,email,password});
        console.log(response.data);
    } catch (error) {
        console.error("Error registering user:", error);
    }
};
    return(
        <div>
            <h2>Register Page</h2>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name</label><br/>
                    <input type="text" placeholder="Enter your name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />

                </div>
                <br/>
                <div>
                    <label>Email</label><br/>
                    <input type="email" placeholder="Enter your email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <br/>
                <div>
                    <label>Password</label><br/>
                    <input type="password" placeholder="Enter password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <br/>
                
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
export default Register;