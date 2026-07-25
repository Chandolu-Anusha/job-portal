import { useState } from "react";
import api from "../services/api";

function CreateJob() {
    const [job, setJob] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: ""
    });

    const handleChange = (e) => {
        setJob({
            ...job,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/jobs", job);
            alert(response.data.message);
        } catch (error) {
            console.log(error.response?.data || error);
        }
    };

    return (
        <div>
            <h2>Create Job</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    value={job.title}
                    onChange={handleChange}
                /><br/><br/>

                <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={job.company}
                    onChange={handleChange}
                /><br/><br/>

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={job.location}
                    onChange={handleChange}
                /><br/><br/>

                <input
                    type="number"
                    name="salary"
                    placeholder="Salary"
                    value={job.salary}
                    onChange={handleChange}
                /><br/><br/>

                <textarea
                    name="description"
                    placeholder="Description"
                    value={job.description}
                    onChange={handleChange}
                /><br/><br/>

                <button type="submit">
                    Create Job
                </button>

            </form>
        </div>
    );
}

export default CreateJob;