import { useState } from "react";
import api from "../services/api";
import { toast } from 'react-toastify';
import "./CreateJob.css";

function CreateJob() {
    const [job, setJob] = useState({
        title: "",
        company: "",
        companyLogo:null,
        location: "",
        salary: "",
        description: "",
        requirements:"",
        jobType:"Full Time",
        experience:""
    });

    const handleChange = (e) => {
        const {name, value , type, files} = e.target;
        setJob({
            ...job,
            [name]: type === "file" ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append("title", job.title);
            data.append("company", job.company);
            data.append("companyLogo", job.companyLogo);
            data.append("location", job.location);
            data.append("salary", job.salary);
            data.append("description", job.description);
            data.append("requirements", job.requirements);
            data.append("jobType", job.jobType);
            data.append("experience", job.experience);

            const response = await api.post("/jobs", data);
            toast.success(response.data.message);
        } catch (error) {
            toast.error("An error occurred while creating the job.");
        }
    };

    return (
        <div className="create-job-page">
            <div className="page-container">
            <h2 className="create-job-title">Create a New Job</h2>

            <p className="create-job-subtitle">
                Provide the role details below. Your posting will be visible to students immediately.
            </p>

            <form className="create-job-form" onSubmit={handleSubmit}>
                <label>Job Title</label>
                <input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    value={job.title}
                    onChange={handleChange}
                    required
                /><br/><br/>
                
                <label>Company</label>
                <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={job.company}
                    onChange={handleChange}
                    required
                /><br/><br/>

                <label>Company Logo</label>
                <input type="file"
                    name="companyLogo"
                    accept="image/*"
                    onChange={handleChange}
                    required
                />
                <br/><br/>
                <label>Location</label>
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={job.location}
                    onChange={handleChange}
                    required
                /><br/><br/>

                <label>Salary</label>
                <input
                    type="number"
                    name="salary"
                    placeholder="Salary"
                    value={job.salary}
                    onChange={handleChange}
                    required
                /><br/><br/>

                <label>Description</label>
                <textarea
                    name="description"
                    placeholder="Description"
                    value={job.description}
                    onChange={handleChange}
                    required
                /><br/><br/>

                <label>Requirements</label>
                <textarea
                name="requirements"
                placeholder="Requirements"
                value={job.requirements}
                onChange={handleChange}
                required
                /><br/><br/>
                
                <label>Job Type</label>
                <select
                name="jobType"
                value={job.jobType}
                onChange={handleChange}
                required
                >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                </select>
            
                <br/><br/>
                
                <label>Experience</label>
                <input
                type="text"
                name="experience"
                placeholder="Experience (e.g. Fresher, 0-2 Years)"
                value={job.experience}
                onChange={handleChange}
                required
                />
                <br/><br/>

                <button className="create-btn" type="submit">
                    Create Job
                </button>

            </form>
            </div>
        </div>
    );
}

export default CreateJob;
