import { useState,useEffect } from"react";
import {Link}from "react-router-dom";
import api from "../services/api";

function ManageJobs(){
    const [jobs,setJobs]=useState([]);
     useEffect(()=>{
        fetchJobs();
     },[]);
     const fetchJobs=async()=>{
        try{
            const response=await api.get("/jobs");
            setJobs(response.data.jobs);
        }catch(error){
            console.log(error.response.data);
        }
     };

     const updateStatus = async (jobId, status) => {
    try {
        const response = await api.put(`/jobs/status/${jobId}`, {
            status
        });

        alert(response.data.message);

        fetchJobs();

    } catch (error) {
        console.log(error.response?.data);
    }
};

     const deleteJob=async(id)=>{
        const confirmDelete=window.confirm(
            "Are you sure ! You want to delete this job?"
        );
        if(!confirmDelete) return;
        try{
            const response=await api.delete(`/jobs/${id}`);
            alert(response.data.message);
            fetchJobs();
        }catch(error){
            console.log(error.response?.data);
        }
     };
     return(
        <div>
            <h2>
                Manage Jobs
            </h2>
            {jobs.map((job)=>(
                <div key={job._id}>
                    <Link to={`/applications/${job._id}`}>
                    <h3>{job.title}</h3>
                    </Link>
                    <p>{job.company}</p>
                    <p>{job.location}</p>
                    <Link to={`/edit-job/${job._id}`}>
                       <button>Edit</button>
                       <button onClick={()=> deleteJob(job._id)}>
                        Delete
                       </button>
                       
                    </Link>
                    <p><strong>Status:</strong>{job.status}</p>
                    {job.status === "Open" ? (
                        <button onClick={() => updateStatus(job._id, "Closed")}>
                            Close Job
                        </button>
                    ) : (
                    <button onClick={() => updateStatus(job._id, "Open")}>
                        Open Job
                    </button>
                )}
                </div>
            ))}
        </div>
     );
}
export default ManageJobs;