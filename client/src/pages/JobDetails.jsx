import {useState}from"react";
import {useEffect} from "react";
import {useParams,useNavigate} from "react-router-dom";
import api from "../services/api";
import CompanyLogo from "../components/CompanyLogo";
import "./JobDetails.css";
import {toast } from "react-toastify";


function JobDetails(){
    const{id}=useParams();
    const navigate=useNavigate();
    const[job,setJob]=useState(null);
    const user=JSON.parse(localStorage.getItem("user"));
    const isStudent=user?.role==="student";
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

const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

    return(
        <div className="job-details">
            <div className="page-container">
            {job && (
                <>
                <div className="job-details-head">
                    <CompanyLogo src={job.companyLogo} alt={job.company} />
                    <div className="job-details-heading">
                        <h2 className="job-title">{job.title}</h2>
                        <p className="job-company">{job.company}</p>
                    </div>
                </div>

                <div className="job-meta">
                    <span className="meta-chip">{job.location}</span>
                    {job.jobType && <span className="meta-chip">{job.jobType}</span>}
                    {job.experience && <span className="meta-chip">{job.experience}</span>}
                    {job.salary ? (
                        <span className="meta-chip">₹{Number(job.salary).toLocaleString("en-IN")}</span>
                    ) : null}
                </div>

                <div className="job-info">
                    <div className="info-block">
                        <h4>Description</h4>
                        <p>{job.description}</p>
                    </div>

                    {job.requirements && (
                        <div className="info-block">
                            <h4>Requirements</h4>
                            <p>{job.requirements}</p>
                        </div>
                    )}
                </div>

                {job.createdAt && (
                    <p className="posted-date">Posted on {formatDate(job.createdAt)}</p>
                )}

                {!user ? (
                    /* Guest — send to login instead of a guarded page */
                    job.status === "Closed" ? (
                        <button className="disabled-btn" disabled>
                            Job Closed
                        </button>
                    ) : (
                        <div className="job-btn">
                            <button className="apply-btn" onClick={() => navigate("/login")}>
                                Login to Apply
                            </button>
                        </div>
                    )
                ) : isStudent ? (
                    job.applied ? (
                        <button className="disabled-btn" disabled>
                            Applied
                        </button>
                    ) : job.status === "Closed" ? (
                        <button className="disabled-btn" disabled>
                            Job Closed
                        </button>
                    ) : (
                        <div className="job-btn">
                            <button className="apply-btn" onClick={()=> navigate(`/apply/${job._id}`)}>
                                Apply Now
                            </button>

                            <button className="save-btn" onClick={handleSave}>
                                Save Job
                            </button>
                        </div>
                    )
                ) : (
                    /* Recruiters cannot apply — show a note instead of the button */
                    <p className="recruiter-note">
                        You are signed in as a recruiter. Only students can apply to jobs.
                    </p>
                )}
                </>
            )}
            </div>
            </div>
    );
}
export default JobDetails;