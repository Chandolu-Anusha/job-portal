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
        description: ""

    });
    useEffect(() => {
    fetchJob();
}, []);
const fetchJob = async () => {
    console.log ("fetchjob called");
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
                <button type="Submit">
                    Update Job
                </button>
            </form>
        </div>
    );
}

export default EditJob;