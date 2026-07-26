import {useState}from "react";
import api from "../services/api";

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
            alert(response.data.message);
            setPassword({
                oldPassword:"",
                newPassword:""
            });
        }catch(error){
            console.log(error.response?.data);
        }
    };
    return(
        <div>
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <input 
                type="password"
                name="oldPassword"
                placeholder="Current Password"
                value={password.oldPassword}
                onChange={handleChange}
                /><br/><br/>
                 <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={password.newPassword}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Change Password
                </button>

            </form>
        </div>
    )
}
export default ChangePassword;