import { useState, useEffect } from "react";
import api from "../services/api";

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
        <div>
            <h2>My Applications</h2>

            {applications.map((application) => (
                <div key={application._id}>
                    <h3>{application.job.title}</h3>

                    <p>{application.job.company}</p>

                    <p>Status: {application.status}</p>

                    <button onClick={()=>handleWithdraw(application._id)}>
                        Cancel
                    </button>
                </div>
            ))}
        </div>
    );
}

export default MyApplications;