import { useState} from "react";
import {useNavigate}from "react-router-dom";
import api from "../services/api";
import {toast} from 'react-toastify';
import { Link } from "react-router-dom";
import "./Register.css";

function Register(){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [role, setRole] = useState("student");

    const navigate=useNavigate();

   const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const response=await api.post("/auth/register",{
            name,
            email,
            password,
            role,
        });
        toast.success("Registration successful! Please login.");
        setName("");
        setEmail("");
        setPassword("");
        navigate("/login");
    } catch (error) {
        toast.error("Error registering user:");
    }
};
   return(
    <div className="auth-page">

        <div className="auth-card">

            <h2 className="auth-title">
                Create your account
            </h2>

            <p className="auth-subtitle">
                Join as a student or recruiter to get started
            </p>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        required
                    />
                </div>


                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />
                </div>


                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>I am a</label>

                    <select
                        value={role}
                        onChange={(e)=>setRole(e.target.value)}
                        required
                    >
                        <option value="student">Student</option>
                        <option value="recruiter">Recruiter</option>

                    </select>
                </div>


                <button className="auth-btn" type="submit">
                    Register
                </button>

            </form>

            <p className="auth-footer">
                Already have an account? <Link to="/login">Login</Link>
            </p>

        </div>

    </div>
);
}
export default Register;