import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Logout() {
    const navigate = useNavigate();
    const shown = useRef(false);

    useEffect(() => {
        if (shown.current) return;

        shown.current = true;

        toast.success("Logged out successfully");

        setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
            window.location.reload();
        }, 1000);
    }, []);

    return null;
}

export default Logout;