import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

// Dedupes the warning toast when React StrictMode double-invokes effects in dev
let lastDeniedAt = 0;

function AccessDeniedRedirect({ role }) {
    useEffect(() => {
        const now = Date.now();
        if (now - lastDeniedAt > 1000) {
            toast.warning(`This page is only available to ${role}s.`);
            lastDeniedAt = now;
        }
    }, [role]);

    return <Navigate to="/" replace />;
}

function RoleProtectedRoute({ children, role }) {

    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== role) {
        return <AccessDeniedRedirect role={role} />;
    }

    return children;
}

export default RoleProtectedRoute;