import { useEffect, useState } from "react";
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
    return <h2>Loading...</h2>
}

return (
    <div className="dashboard">

        <h2 className="dashboard-title">Dashboard</h2>

        <div className="stats-container">

            {dashboard.totalJobs !== undefined && (
                <div className="stat-card jobs-card">
                    <h3>Total Jobs</h3>
                    <h2>{dashboard.totalJobs}</h2>
                </div>
            )}

            {dashboard.totalApplications !== undefined && (
                <div className="stat-card applications-card">
                    <h3>Total Applications</h3>
                    <h2>{dashboard.totalApplications}</h2>
                </div>
            )}

            {dashboard.totalAppliedJobs !== undefined && (
                <div className="stat-card applied-card">
                    <h3>Total Applied Jobs</h3>
                    <h2>{dashboard.totalAppliedJobs}</h2>
                </div>
            )}

            {dashboard.totalSavedJobs !== undefined && (
                <div className="stat-card saved-card">
                    <h3>Saved Jobs</h3>
                    <h2>{dashboard.totalSavedJobs}</h2>
                </div>
            )}

        </div>

        <h3 className="section-title">Recent Applications</h3>

        {dashboard.recentApplication?.length > 0 ? (
            dashboard.recentApplication.map((application) => (
                <div className="application-card" key={application._id}>

                    <p><strong>Name:</strong> {application.firstName} {application.lastName}</p>

                    <p><strong>Email:</strong> {application.email}</p>

                    <p><strong>Job:</strong> {application.job?.title}</p>

                    <p><strong>Status:</strong> {application.status}</p>

                </div>
            ))
        ) : (
            <div className="Empty-message">No Recent Applications</div>
        )}

        <h3 className="section-title">Recent Jobs</h3>

        {dashboard.recentJobs?.length > 0 ? (
            dashboard.recentJobs.map((job) => (
                <div className="job-card" key={job._id}>
                    <p>{job.title}</p>
                </div>
            ))
        ) : (
            <div className="empty-message">No Recent Jobs</div>
        )}

    </div>
);
}
export default Dashboard;