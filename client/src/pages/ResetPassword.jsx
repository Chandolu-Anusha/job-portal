import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import "./ResetPassword.css";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword) {
            toast.error("Please enter a new password.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            // Use the EXISTING backend reset-password endpoint.
            const response = await api.put(`/auth/reset-Password/${token}`, {
                newPassword,
            });
            toast.success(
                response.data?.message ||
                    "Password reset successfully. You can now log in."
            );
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => navigate("/login"), 1500);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "This reset link is invalid or has expired."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-page">
            <div className="reset-card">

                <h2 className="reset-title">Reset Password</h2>

                <p className="reset-subtitle">
                    Choose a strong new password for your account.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>New Password</label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Re-enter new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="reset-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>

                <p className="reset-back">
                    <Link to="/login">← Back to Login</Link>
                </p>

            </div>
        </div>
    );
}

export default ResetPassword;
