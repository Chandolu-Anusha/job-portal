import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        fetchDashboard();
    }, []);
    const fetchDashboard = async () => {

    try {

        const response = await api.get("/dashboard");

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

        <h3>Total Jobs : {dashboard.totalJobs}</h3>

        <h3>Total Applications : {dashboard.totalApplications}</h3>

        {dashboard.recentApplications?.map(application=>(
            <div key={application._id}>
                <p>{application.job.title}</p>
            </div>
        ))}

    </div>
);
}
export default Dashboard;