import { useEffect, useState } from "react";
import api from "../services/api";
import "./SavedJobs.css";
function SavedJobs() {
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        fetchSavedJobs();
    }, []);

    const fetchSavedJobs = async () => {
        try {
            const response = await api.get("/saved");
            setSavedJobs(response.data.savedJobs);
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    return (
        <div className="saved-page">
            <h2 className="saved-title">Saved Jobs</h2>

            {savedJobs.map((item) => (
                <div className="saved-card" key={item._id}>
                    <h3 className="saved-job">{item.job.title}</h3>
                    <p className="saved-company">{item.job.company}</p>
                    <p className="saved-location">{item.job.location}</p>
                </div>
            ))}
        </div>
    );
}

export default SavedJobs;