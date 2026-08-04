import { useState, useEffect } from "react";
import api from "../services/api";
import "./MyApplication.css";
function MyApplications() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await api.get("/applications/my");
            setApplications(response.data.applications);
        } catch (error) {
            console.log(error.response.data);
        }
    };
    const handleWithdraw = async (applicationId) => {
        const confirm=window.confirm(
            "Are you sure want to withdraw this application?"
        );
        if(!confirm) return;
                    

    try {
        const response = await api.delete(`/applications/${applicationId}`);

        alert(response.data.message);

        fetchApplications();
    } catch (error) {
        console.log(error.response?.data);
    }
};

    return (
        <div className="application-page">
            <h2 className="application-title">My Applications</h2>

            {applications.map((application) => (
                <div className="application-card" key={application._id}>
                    <h3 className="job-title">{application.job.title}</h3>

                    <p className="company-name">{application.job.company}</p>

                    <p className="status">Status: {application.status}</p>

                    <button className="cancel-btn" onClick={()=>handleWithdraw(application._id)}>
                        Cancel
                    </button>
                </div>
            ))}
        </div>
    );
}

export default MyApplications;