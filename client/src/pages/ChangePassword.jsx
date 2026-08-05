import {useState}from "react";
import api from "../services/api";
import {toast} from 'react-toastify';
import "./ChangePassword.css";

function ChangePassword(){
    const[password,setPassword]=useState({
        oldPassword:"",
        newPassword:""
    });
    const handleChange=(e)=>{
        setPassword({
            ...password,
            [e.target.name]:e.target.value
        });
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();

        try{
            const response=await api.put("/auth/change-password",password);
            toast.success(response.data.message);
            setPassword({
                oldPassword:"",
                newPassword:""
            });
        }catch(error){
            toast.error(error.response?.data);
        }
    };
    return (
    <div className="change-password-page">

        <h2 className="change-password-title">
            Change Password
        </h2>

        <form className="change-password-form" onSubmit={handleSubmit}>

            <div className="form-group">
                <label>Current Password</label>
                <input
                    type="password"
                    name="currentPassword"
                    placeholder="Enter Current Password"
                    value={password.currentPassword}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>New Password</label>
                <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter New Password"
                    value={password.newPassword}
                    onChange={handleChange}
                    required
                />
            </div>

            <button
                className="change-password-btn"
                type="submit"
            >
                Update Password
            </button>

        </form>

    </div>
);
}
export default ChangePassword;