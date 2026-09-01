import { useEffect, useState } from "react";
import api from "../services/api";
import CompanyLogo from "../components/CompanyLogo";
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
            <div className="page-container">
                <h2 className="page-heading">Saved Jobs</h2>
                <p className="page-subheading">
                    Jobs you have saved for later. Apply when you are ready.
                </p>

                {savedJobs.length === 0 ? (
                    <div className="empty-state">You have no saved jobs yet.</div>
                ) : (
                    <div className="saved-grid">
                        {savedJobs.map((item) => (
                            <div className="saved-card" key={item._id}>
                                <div className="saved-card-head">
                                    <CompanyLogo src={item.job.companyLogo} alt={item.job.company} />
                                    <div>
                                        <h3 className="saved-job-title">{item.job.title}</h3>
                                        <p className="saved-company">{item.job.company}</p>
                                    </div>
                                </div>

                                <div className="job-meta">
                                    <span className="meta-chip">{item.job.location}</span>
                                    {item.job.jobType && (
                                        <span className="meta-chip">{item.job.jobType}</span>
                                    )}
                                    {item.job.experience && (
                                        <span className="meta-chip">{item.job.experience}</span>
                                    )}
                                </div>

                                <div className="saved-actions">
                                    <Link to={`/jobs/${item.job._id}`}
                                        className="saved-view-btn">
                                        View Details   
                                    </Link>
                         

                                    <button className="saved-remove-btn" onClick=
                                        {()=>handleRemove(item.job._id)}>
                                            Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SavedJobs;