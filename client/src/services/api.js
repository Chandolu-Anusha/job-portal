import axios from "axios";

// Backend origin (single source of truth for API + uploaded files)
export const API_ORIGIN = "https://job-portal-1-48xe.onrender.com";

const api=axios.create({
    baseURL:`${API_ORIGIN}/api`,
});
api.interceptors.request.use((config)=>{
    const token =localStorage.getItem("token");
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
});
export default api;                   