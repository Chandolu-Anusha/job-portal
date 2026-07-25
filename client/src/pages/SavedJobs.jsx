import { useEffect, useState } from "react";
import api from "../services/api";

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
        <div>
            <h2>Saved Jobs</h2>

            {savedJobs.map((item) => (
                <div key={item._id}>
                    <h3>{item.job.title}</h3>
                    <p>{item.job.company}</p>
                    <p>{item.job.location}</p>
                </div>
            ))}
        </div>
    );
}

export default SavedJobs;