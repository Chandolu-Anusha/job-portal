import { useParams } from "react-router-dom";
import {useState,useEffect}from"react";
import api from"../services/api";

function EditJob() {
    const { id } = useParams();

    const [job,setJob]=useState({
        title:"",
        company: "",
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
        setJob({
            ...job,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await api.put(`/jobs/${id}`,job);
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
                /><br/><br/>
                 <input type="text" 
                name="company" 
                value={job.company}
                onChange={handleChange}
                placeholder="Company"
                /><br/><br/>
                 <input type="text" 
                name="location" 
                value={job.location}
                onChange={handleChange}
                placeholder="Location"
                /><br/><br/>
                <textarea 
                name="description"
                value={job.description}
                onChange={handleChange}
                placeholder="description"
                /><br/><br/>
                <br /><br />
                <textarea
                name="requirements"
                placeholder="Requirements"
                value={job.requirements}
                onChange={handleChange}
                /><br /><br />
                
                <select
                name="jobType"
                value={job.jobType}
                onChange={handleChange}
                >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                </select><br /><br />
                <input
                type="text"
                name="experience"
                placeholder="Experience"
                value={job.experience}
                onChange={handleChange}
                /><br /><br />
                <button type="Submit">
                    Update Job
                </button>
            </form>
        </div>
    );
}

export default EditJob;