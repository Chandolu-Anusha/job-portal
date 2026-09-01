import { useState, useEffect } from "react";
import api, { API_ORIGIN } from "../services/api";
import { toast } from "react-toastify";
import "./JobApplications.css";

function AllApplications() {
    const [keyword,setKeyword] = useState("");
    const [status,setStatus] = useState("");
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, [keyword,status]);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const response = await api.get(
                `/applications/recruiter/all?keyword=${keyword}&status=${status}`
            );
            setApplications(response.data.applications);
            setCount(response.data.count);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to load applications."
            );
            setApplications([]);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (applicationId, newStatus) => {
        try {
            const response = await api.put(
                `/applications/${applicationId}`,
                { status: newStatus }
            );
            toast.success(response.data.message);
            fetchApplications();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Something went wrong. Please try again."
            );
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
    <div className="applications-page">
        <div className="page-container">

        <h2 className="applications-title">All Applications</h2>
        <p className="applications-subtitle">
            {loading
                ? "Loading applications..."
                : `${count} ${count === 1 ? "application" : "applications"} received across all your jobs.`}
        </p>

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

        {!loading && applications.length === 0 && (
            <div className="empty-state">
                No applications received yet.
            </div>
        )}

        {applications.map((application) => (
            <div className="application-card" key={application._id}>

                <div className="applicant-job-row">
                    <span className="job-chip">{application.job?.title}</span>
                    {application.job?.company && (
                        <span className="job-company">{application.job.company}</span>
                    )}
                    <span className="applicant-date">
                        Applied on {formatDate(application.createdAt)}
                    </span>
                </div>

                <div className="applicant-head">
                    <div className="applicant-avatar">
                        {application.firstName?.charAt(0)?.toUpperCase()}
                    </div>
                    <div className="applicant-id">
                        <h3 className="applicant-name">
                            {application.firstName} {application.lastName}
                        </h3>
                        <p className="applicant-email">{application.email}</p>
                    </div>
                    <span className={`badge badge-${application.status}`}>
                        {application.status}
                    </span>
                </div>

                <div className="applicant-details">
                    <div className="detail-item">
                        <span className="detail-label">Applied On</span>
                        <span className="detail-value">
                            {formatDate(application.createdAt)}
                        </span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Degree</span>
                        <span className="detail-value">{application.degree}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Education</span>
                        <span className="detail-value">
                            {application.educationStatus}
                            {application.educationStatus === "Pursuing" && application.graduationYear
                                ? ` · ${application.graduationYear}`
                                : ""}
                        </span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Phone</span>
                        <span className="detail-value">{application.phone}</span>
                    </div>
                </div>

                {application.coverLetter && (
                    <div className="cover-letter">
                        <span className="detail-label">Cover Letter</span>
                        <p>{application.coverLetter}</p>
                    </div>
                )}

                <div className="application-buttons">

                    {application.student?.resume || application.resume ? (
                        <a
                            href={`${API_ORIGIN}/${((application.student && application.student.resume) || application.resume || "").replace(/\\/g, "/")}`}
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
                        disabled={application.status !== "pending"}
                        onClick={() => updateStatus(application._id, "accepted")}
                    >
                        Accept
                    </button>

                    <button
                        className="reject-btn"
                        disabled={application.status !== "pending"}
                        onClick={() => updateStatus(application._id, "rejected")}
                    >
                        Reject
                    </button>

                </div>

            </div>
        ))}

        </div>
    </div>
);
}

export default AllApplications;
