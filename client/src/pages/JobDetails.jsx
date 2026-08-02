import {useState}from"react";
import {useEffect} from "react";
import {useParams,useNavigate} from "react-router-dom";
import api from "../services/api";


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
console.log(job);
    return(
        <div>
            {job && (
                <>
                <h2>{job.title}</h2>
                <p><strong>Company:</strong>{job.company}</p>
                <p><strong>Location:</strong>{job.location}</p>
                <p><strong>Salary:</strong>{job.salary}</p>
                <p><strong>Description:</strong>{job.description}</p>
                <p><strong>Requirements:</strong> {job.requirements}</p>
                <p><strong>Job Type:</strong> {job.jobType}</p>
                <p><strong>Experience:</strong> {job.experience}</p>
                {job.applied   ?  (
                    <button disabled>
                        Applied
                    </button>
                ) : job.status === "Closed"  ?(
                    <button disabled>
                        Job Closed
                    </button>
                ) : (
                    <button onClick={()=> navigate(`/apply/${job._id}`)}>
                        Apply
                    </button>
                )}
                </>
            )}
            </div>
    );
}
export default JobDetails;