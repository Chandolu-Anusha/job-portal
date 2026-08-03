import { useState } from "react";
import api from "../services/api";
import { toast } from 'react-toastify';

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
                <label htmlFor="companyLogo">Company Logo</label> :
                <input type="file"
                    name="companyLogo"
                    accept="image/*"
                    onChange={handleChange}
                />
                <br/><br/>

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