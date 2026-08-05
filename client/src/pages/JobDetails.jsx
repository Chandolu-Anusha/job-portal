import {useState}from"react";
import {useEffect} from "react";
import {useParams,useNavigate} from "react-router-dom";
import api from "../services/api";
import "./JobDetails.css";
import {toast } from "react-toastify";


function JobDetails(){
    const{id}=useParams();
    const navigate=useNavigate();
    const[job,setJob]=useState(null);
    useEffect(()=>{
        fetchJob();
    },[]);

    const fetchJob=async()=>{      
        try{
            const response=await api.get(`/jobs/${id}`);
            setJob(response.data.job);
            console.log(response.data.job);

        }catch(error){
            console.error("Error fetching job details:",error);
        }
    }
  const handleApply = async () => {
    try {
        const response = await api.post(`/applications/${id}`);

        alert(response.data.message);
    } catch (error) {
        console.log(error);

        if (error.response) {
            alert(error.response.data.message);
        } else {
            alert("Something went wrong!");
        }
    }
};
const handleSave = async () => {
    try {
        const response = await api.post(`/saved-jobs/${job._id}`);

        toast.success(response.data.message);
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Something went wrong");
        }
    }
};

    return(
        <div className="job-details">
            {job && (
                <>
                <h2 className="job-title">{job.title}</h2>
                <div className="job-info">
                    <p><strong>Company: </strong>{job.company}</p>
                    <p><strong>Location: </strong>{job.location}</p>
                    <p><strong>Salary: </strong>{job.salary}</p>
                    <p><strong>Description: </strong>{job.description}</p>
                    <p><strong>Requirements: </strong> {job.requirements}</p>
                    <p><strong>Job Type: </strong> {job.jobType}</p>
                    <p><strong>Experience: </strong> {job.experience}</p>
                </div>
                {job.applied   ?  (
                    <button className="disabled-btn"  disabled>
                        Applied
                    </button>
                ) : job.status === "Closed"  ?(
                    <button disabled>
                        Job Closed
                    </button>
                ) : (
                    <div className="job-btn">
                    <button className="appli-btn" onClick={()=> navigate(`/apply/${job._id}`)} className="apply-btn">
                        Apply
                    </button>

                    <button className="save-btn" onClick={handleSave}>
                        Save Job
                    </button>
                    </div>
                )}
                </>
            )}
            </div>
    );
}
export default JobDetails;