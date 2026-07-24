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

    return (
        <div>
            <h2>My Applications</h2>

            {applications.map((application) => (
                <div key={application._id}>
                    <h3>{application.job.title}</h3>

                    <p>{application.job.company}</p>

                    <p>Status: {application.status}</p>
                </div>
            ))}
        </div>
    );
}

export default MyApplications;