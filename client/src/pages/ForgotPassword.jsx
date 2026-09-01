import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailTrimmed = email.trim();

        if (!emailTrimmed) {
            toast.error("Please enter your email address.");
            return;
        }

        setLoading(true);
        try {
            // Use the EXISTING backend forgot-password endpoint.
            const response = await api.post("/auth/forgot-Password", {
                email: emailTrimmed,
            });
            toast.success(
                response.data?.message ||
                    "Password reset email sent. Please check your inbox."
            );
            setEmail("");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Unable to send reset email right now. Please try again later."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-page">
            <div className="forgot-card">

                <h2 className="forgot-title">Forgot Password?</h2>

                <p className="forgot-subtitle">
                    Enter your registered email address and we'll send you a
                    link to reset your password.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="forgot-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Submit"}
                    </button>
                </form>

                <p className="forgot-back">
                    <Link to="/login">← Back to Login</Link>
                </p>

            </div>
        </div>
    );
}

export default ForgotPassword;
