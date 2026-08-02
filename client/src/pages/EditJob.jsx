import { useParams } from "react-router-dom";
import {useState,useEffect}from"react";
import api from"../services/api";

function EditJob() {
    const { id } = useParams();

    const [job,setJob]=useState({
        title:"",
        company: "",
        companyLogo:null,
        location: "",
        salary: "",
        description: "",
        requirements:"",
        jobType:"",
        experience:""

    });

    useEffect(() => {
    fetchJob();
}, []);

const fetchJob = async () => {

    try {
        const response = await api.get(`/jobs/${id}`);
        setJob(response.data.job);
    } catch (error) {
        console.log(error.response?.data);
    }
};

const handleChange=(e)=>{
    const {name,value,type,files} = e.target;

        setJob({
            ...job,
            [name]:type === "file" ? files[0] : value,
        });
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();

        try{
            const data = new FormData();
            data.append("title", job.title);
            data.append("company", job.company);
            data.append("location", job.location);
            data.append("salary", job.salary);
            data.append("description", job.description);
            data.append("requirements", job.requirements);
            data.append("jobType", job.jobType);
            data.append("experience", job.experience);
            
            if (job.companyLogo instanceof File) {
                data.append("companyLogo", job.companyLogo);
            }

            for(let pair of data.entries()){
                console.log(pair[0],pair[1]);
            }

            const response = await api.put(`/jobs/${id}`, data);
            alert(response.data.message);
            
        }catch(error){
            console.log(error.response?.data);
        }
    };

    return (
        <div>
            <h2>Edit Job</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                    name="title" 
                    value={job.title}
                    onChange={handleChange}
                    placeholder="Job Title"
                />
                <br/><br/>
                <input type="text" 
                    name="company" 
                    value={job.company}
                    onChange={handleChange}
                    placeholder="Company"
                />
                <br/><br/>
                <label>Company Logo</label><br />
                <input
                    type="file"
                    name="companyLogo"
                    accept="image/*"
                    onChange={handleChange}
                />
                <br /><br />

                <input type="text" 
                    name="location" 
                    value={job.location}
                    onChange={handleChange}
                    placeholder="Location"
                />
                <br/><br/>

                <input
                    type="number"
                    name="salary"
                    placeholder="Salary"
                    value={job.salary}
                    onChange={handleChange}
                />
                <br /><br />

                <textarea 
                    name="description"
                    value={job.description}
                    onChange={handleChange}
                    placeholder="description"
                /><br/><br/>

                <textarea
                    name="requirements"
                    placeholder="Requirements"
                    value={job.requirements}
                    onChange={handleChange}
                />
                <br /><br />
                
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
                <br /><br />

                <input
                    type="text"
                    name="experience"
                    placeholder="Experience"
                    value={job.experience}
                    onChange={handleChange}
                />
                <br /><br />

                <button type="Submit">
                    Update Job
                </button>

            </form>
        </div>
    );
}

export default EditJob;