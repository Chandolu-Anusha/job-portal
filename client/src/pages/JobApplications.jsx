import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function JobApplications() {
    const { id } = useParams();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await api.get(`/applications/job/${id}`);
            setApplications(response.data.applications);
        } catch (error) {
            console.log(error.response.data);
        }
    };
    const updateStatus=async(applicationId,status)=>{
        try{
            const response=await api.put(
                `/applications/${applicationId}`,
                {status}
            );
            alert(response.data.message);
            fetchApplications();
        }catch(error){
            console.log(error.response.data);
        }
    };

    return (
        <div>
            <h2>Applicants</h2>

            {applications.map((application) => (
                <div key={application._id}>
                    <h3>{application.student.name}</h3>
                    <p>{application.student.email}</p>

                    {application.student.resume ?(
                        <a
                            href={`http://localhost:5000/${application.student.resume.replace(/\\/g, "/")}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <button>View Resume</button>
                        </a>
                    ) : (
                        <p>Resume Not Uploaded</p>
                    )}

                    <p>Status: {application.status}</p>
                    <button onClick={()=> updateStatus(application._id,"accepted")}>
                        Accept
                    </button>
                    <button onClick={()=> updateStatus(application._id,"rejected")}>
                        Reject
                    </button>
                </div>
            ))}
        </div>
    );
}

export default JobApplications;