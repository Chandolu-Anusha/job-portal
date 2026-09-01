import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Dashboard.css";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const user=JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchDashboard();
    }, []);
     
    const fetchDashboard = async () => {
    
        
    try {

        const response = await api.get("/dashboard");
        console.log(response.data);
        setDashboard(response.data);

    } catch (error) {

        console.log(error.response?.data);

    }

};
if(!dashboard){
    return (
        <div className="dashboard">
            <div className="page-container">
                <div className="empty-state">Loading dashboard...</div>
            </div>
        </div>
    );
}

const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

return (
    <div className="dashboard">
        <div className="page-container">

        <h2 className="dashboard-title">Dashboard</h2>
        <p className="dashboard-subtitle">
            Welcome back{user?.name ? `, ${user.name}` : ""}. Here is an overview of your activity.
        </p>

        <div className="stats-container">

            {dashboard.totalJobs !== undefined && (
                <div className="stat-card jobs-card">
                    <span className="stat-label">Total Jobs</span>
                    <h2>{dashboard.totalJobs}</h2>
                </div>
            )}

            {dashboard.totalApplications !== undefined && (
                <div className="stat-card applications-card">
                    <span className="stat-label">Total Applications</span>
                    <h2>{dashboard.totalApplications}</h2>
                </div>
            )}

            {dashboard.totalAppliedJobs !== undefined && (
                <div className="stat-card applied-card">
                    <span className="stat-label">Total Applied Jobs</span>
                    <h2>{dashboard.totalAppliedJobs}</h2>
                </div>
            )}

            {dashboard.totalSavedJobs !== undefined && (
                <div className="stat-card saved-card">
                    <span className="stat-label">Saved Jobs</span>
                    <h2>{dashboard.totalSavedJobs}</h2>
                </div>
            )}

        </div>

        <div className="recent-section-head">
            <h3 className="section-title">Recent Applications</h3>
            {user?.role === "recruiter" && (
                <Link to="/applications" className="view-applications-btn">
                    View Applications
                </Link>
            )}
        </div>

        {dashboard.recentApplication?.length > 0 ? (
            <div className="recent-list">
            {dashboard.recentApplication.map((application) => (
                <div className="application-card" key={application._id}>

                    <div className="recent-row-main">
                        <p className="recent-name">{application.firstName} {application.lastName}</p>
                        <p className="recent-detail">{application.email}</p>
                    </div>

                    <div className="recent-row-side">
                        <p className="recent-job">{application.job?.title}</p>
                        <span className={`badge badge-${application.status}`}>
                            {application.status}
                        </span>
                    </div>

                </div>
            ))}
            </div>
        ) : (
            <div className="empty-message">No Recent Applications</div>
        )}

        <h3 className="section-title">Recent Jobs</h3>

        {dashboard.recentJobs?.length > 0 ? (
            <div className="recent-list">
            {dashboard.recentJobs.map((job) => (
                <div className="job-card" key={job._id}>
                    <div className="recent-row-main">
                        <p className="recent-name">{job.title}</p>
                        <p className="recent-detail">{job.company} · {job.location}</p>
                    </div>
                    <div className="recent-row-side">
                        {job.createdAt && (
                            <span className="recent-date">{formatDate(job.createdAt)}</span>
                        )}
                        <span className={`badge badge-${job.status === "Open" ? "open" : "closed"}`}>
                            {job.status}
                        </span>
                    </div>
                </div>
            ))}
            </div>
        ) : (
            <div className="empty-message">No Recent Jobs</div>
        )}

        </div>

    </div>
);
}
export default Dashboard;