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
                </div>
            ))}
        </div>
     );
}
export default ManageJobs;