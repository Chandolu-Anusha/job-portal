import { useState } from "react";
import api from "../services/api";

function CreateJob() {
    const [job, setJob] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
        requirements:"",
        jobType:"Full Time",
        experience:""
    });

    const handleChange = (e) => {
        setJob({
            ...job,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(job);

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

                <br/><br/>
                <textarea
                name="requirements"
                placeholder="Requirements"
                value={job.requirements}
                onChange={handleChange}
                /><br/><br/>
                
                <select
                name="jobType"
                value={job.jobType}
                onChange={handleChange}
                >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                </select>
                <br/><br/>
                
                <input
                type="text"
                name="experience"
                placeholder="Experience (e.g. Fresher, 0-2 Years)"
                value={job.experience}
                onChange={handleChange}
                />
                <br/><br/>

                <button type="submit">
                    Create Job
                </button>

            </form>
        </div>
    );
}

export default CreateJob;