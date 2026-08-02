import { useEffect, useState } from "react";
import api from "../services/api";

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
    <div>
        <h2>Dashboard</h2>

        {dashboard.totalJobs !== undefined && (
            <h3>Total Jobs: {dashboard.totalJobs}</h3>
        )}

        {dashboard.totalApplications !== undefined && (
            <h3>Total Applications: {dashboard.totalApplications}</h3>
        )}

        {dashboard.totalAppliedJobs !== undefined && (
            <h3>Total Applied Jobs: {dashboard.totalAppliedJobs}</h3>
        )}

        {dashboard.totalSavedJobs !== undefined && (
            <h3>Total Saved Jobs: {dashboard.totalSavedJobs}</h3>
        )}

        <h3>Recent Applications</h3>

        {dashboard.recentApplication?.length > 0 ? (
            dashboard.recentApplication.map((application) => (
                <div key={application._id}>
                    <p>
                        <strong>Name:</strong>{application.firstName} {application.lastName}
                    </p>

                    <p>
                        <strong>Email:</strong>{application.email}
                    </p>

                    <p>
                        <strong>Job:</strong>{application.job?.title}
                    </p>
                    <p>
                        <strong>Status:</strong>{application.status}
                    </p>
                    
                </div>
            ))
        ) : (
            <p>No Recent Applications</p>
        )}

        <h3>Recent Jobs</h3>

        {dashboard.recentJobs?.length > 0 ? (
            dashboard.recentJobs.map((job) => (
                <div key={job._id}>
                    <p>{job.title}</p>
                </div>
            ))
        ) : (
            <p>No Recent Jobs</p>
        )}
    </div>
);
}
export default Dashboard;