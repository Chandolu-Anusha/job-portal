import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Logout.css";

function Logout() {
    const navigate = useNavigate();
    const shown = useRef(false);

    useEffect(() => {
        
        if (shown.current) return;
        shown.current = true;
        setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
            window.location.reload();
        }, 1000);
    }, []);

    return (
    <div className="logout-page">
        <div className="logout-card">
            <h2>Logging Out...</h2>
            <p>Please wait...</p>
        </div>
    </div>
);
}

export default Logout;