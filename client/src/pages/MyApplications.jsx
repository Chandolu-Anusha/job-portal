import { useState, useEffect } from "react";
import api from "../services/api";
import "./MyApplications.css";

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
        <div className="my-applications-page">
            <h2 className="my-applications-title">My Applications</h2>

            {applications.map((application) => (
                <div className="my-applications-card" key={application._id}>
                    <h3 className="my-job-title">{application.job.title}</h3>

                    <p className="my-company-name">{application.job.company}</p>

                    <p className="my-status">Status: {application.status}</p>

                    <button className="my-cancel-btn" onClick={()=>handleWithdraw(application._id)}>
                        Cancel
                    </button>
                </div>
            ))}
        </div>
    );
}

export default MyApplications;