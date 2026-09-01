import { useState,useEffect } from"react";
import {Link}from "react-router-dom";
import api from "../services/api";
import "./ManageJobs.css";

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

     const formatDate = (date) => {
         if (!date) return "";
         return new Date(date).toLocaleDateString("en-IN", {
             day: "numeric",
             month: "short",
             year: "numeric",
         });
     };
return (
    <div className="manage-page">
        <div className="page-container">
        <h2 className="manage-title">Manage Jobs</h2>
        <p className="manage-subtitle">
            Review your postings, view applicants, and keep job statuses up to date.
        </p>

        {jobs.length === 0 && (
            <div className="empty-state">You have not posted any jobs yet.</div>
        )}

        {jobs.map((job) => (
            <div className="manage-card" key={job._id}>

                <div className="manage-head">
                    <Link to={`/applications/${job._id}`} className="job-link">
                        <h3 className="job-title">{job.title}</h3>
                    </Link>
                    <span className={`badge badge-${job.status === "Open" ? "open" : "closed"}`}>
                        {job.status}
                    </span>
                </div>

                <p className="manage-company">{job.company}</p>

                <div className="manage-meta">
                    {job.location && <span className="meta-chip">{job.location}</span>}
                    {job.createdAt && (
                        <span className="meta-chip">Posted {formatDate(job.createdAt)}</span>
                    )}
                </div>

                <div className="manage-footer">

                    <Link to={`/applications/${job._id}`} className="applicants-link">
                        View Applications →
                    </Link>

                    <div className="manage-buttons">

                        <Link to={`/edit-job/${job._id}`}>
                            <button className="edit-btn">
                                Edit
                            </button>
                        </Link>

                        <button
                            className="delete-btn"
                            onClick={() => deleteJob(job._id)}
                        >
                            Delete
                        </button>

                        {job.status === "Open" ? (
                            <button
                                className="close-btn"
                                onClick={() => updateStatus(job._id, "Closed")}
                            >
                                Close Job
                            </button>
                        ) : (
                            <button
                                className="open-btn"
                                onClick={() => updateStatus(job._id, "Open")}
                            >
                                Open Job
                            </button>
                        )}

                    </div>

                </div>

            </div>
        ))}
        </div>
    </div>
);
}
export default ManageJobs;
