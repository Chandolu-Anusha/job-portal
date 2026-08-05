import { useEffect, useState } from "react";
import api from "../services/api";
import "./SavedJobs.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function SavedJobs() {
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        fetchSavedJobs();
    }, []);

    const fetchSavedJobs = async () => {
        try {
            const response = await api.get("/saved-jobs");
            setSavedJobs(response.data.savedJobs);
        } catch (error) {
            toast.error(error.response?.data);
        }
    };

    const handleRemove = async (jobId) => {
    try {
        const response = await api.delete(`/saved-jobs/${jobId}`);
        toast.success(response.data.message);
        fetchSavedJobs();
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to remove job");
    }
};

    return (
        <div className="saved-page">
            <h2 className="saved-title">Saved Jobs</h2>

            {savedJobs.map((item) => (
                <div className="saved-card" key={item._id}>
                    <h3 className="saved-job-title">{item.job.title}</h3>
                    <p className="saved-company">{item.job.company}</p>
                    <p className="saved-location">{item.job.location}</p>

                    <Link to={`/jobs/${item.job._id}`}
                    className="saved-view-btn">
                        View Details   
                    </Link>
              
                    

                    <button className="saved-remove-btn" onClick=
                        {()=>handleRemove(item.job._id)}>
                            Remove Job
                    </button>
                    
                </div>
            ))}
        </div>
    );
}

export default SavedJobs;