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
            console.log(response.data.applications);

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
    <div className="applications-page">

        <h2 className="applications-title">Applicants</h2>

        <div className="filter-box">

            <input
                type="text"
                placeholder="Search by applicant name..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
            </select>

        </div>

        {applications.map((application) => (
            <div className="application-card" key={application._id}>

                <h3 className="applicant-name">
                    {application.firstName} {application.lastName}
                </h3>

                <p><strong>Email:</strong> {application.email}</p>

                <p><strong>Degree:</strong> {application.degree}</p>

                <p><strong>Education:</strong> {application.educationStatus}</p>

                {application.educationStatus === "Pursuing" && (
                    <p>
                        <strong>Graduation Year:</strong> {application.graduationYear}
                    </p>
                )}

                <p><strong>Phone:</strong> {application.phone}</p>

                <p><strong>Cover Letter:</strong> {application.coverLetter}</p>

                <p><strong>Application Status:</strong> {application.status}</p>

                <div className="application-buttons">

                    {application.student.resume ? (
                        <a
                            href={`http://localhost:5000/${application.student.resume.replace(/\\/g, "/")}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <button className="resume-btn">
                                View Resume
                            </button>
                        </a>
                    ) : (
                        <button className="resume-btn" disabled>
                            Resume Not Uploaded
                        </button>
                    )}

                    <button
                        className="accept-btn"
                        onClick={() => updateStatus(application._id, "accepted")}
                    >
                        Accept
                    </button>

                    <button
                        className="reject-btn"
                        onClick={() => updateStatus(application._id, "rejected")}
                    >
                        Reject
                    </button>

                </div>

            </div>
        ))}

    </div>
);
}

export default JobApplications;