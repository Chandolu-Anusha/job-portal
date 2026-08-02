import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function JobApplications() {
    const { id } = useParams();
    const [keyword,setKeyword] = useState("");
    const [status,setStatus] = useState("");
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, [keyword,status]);

    const fetchApplications = async () => {
        try {

            const response = await api.get(`/applications/job/${id}?keyword=${keyword}&status=${status}`);
            setApplications(response.data.applications);

        } catch (error) {

            console.log(error);
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

            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Search by applicant name..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
               />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{ marginLeft: "10px" }}
                >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>


            {applications.map((application) => (
                <div key={application._id}>
                    <h3>{application.firstName}{application.lastName}</h3>

                    <p>
                        <strong>Email:</strong>{application.email}
                    </p>

                    <p>
                        <strong>Degree:</strong>{application.degree}
                    </p>

                    <p>
                        <strong>Status:</strong>{application.educationStatus}
                    </p>

                    {application.educationStatus === "Pursuing" && (
                        <p>
                            <strong>Graduation Year:</strong>{application.graduationYear}
                        </p>
                    )}

                    <p>
                        <strong>Phone:</strong>{application.phone}
                    </p>

                    <p>
                        <strong>Cover Letter:</strong>{application.coverLetter}
                    </p>

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