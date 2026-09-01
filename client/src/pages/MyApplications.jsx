import { useState, useEffect } from "react";
import api from "../services/api";
import CompanyLogo from "../components/CompanyLogo";
import "./MyApplications.css";

function MyApplications() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await api.get("/applications/my");
            setApplications(response.data.applications);
        } catch (error) {
            console.log(error.response.data);
        }
    };
    const handleWithdraw = async (applicationId) => {
        const confirm=window.confirm(
            "Are you sure want to withdraw this application?"
        );
        if(!confirm) return;
                    

    try {
        const response = await api.delete(`/applications/${applicationId}`);

        alert(response.data.message);

        fetchApplications();
    } catch (error) {
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
        <div className="my-applications-page">
            <div className="page-container">
                <h2 className="page-heading">My Applications</h2>
                <p className="page-subheading">
                    Track the status of all the jobs you have applied to.
                </p>

                {applications.length === 0 ? (
                    <div className="empty-state">You have not applied to any jobs yet.</div>
                ) : (
                    <div className="applications-grid">
                        {applications.map((application) => (
                            <div className="my-applications-card" key={application._id}>
                                <div className="application-card-head">
                                    <CompanyLogo
                                        src={application.job?.companyLogo}
                                        alt={application.job?.company}
                                    />
                                    <div>
                                        <h3 className="my-job-title">{application.job.title}</h3>
                                        <p className="my-company-name">{application.job.company}</p>
                                    </div>
                                </div>

                                <div className="application-card-body">
                                    <span className={`badge badge-${application.status}`}>
                                        {application.status}
                                    </span>
                                    {application.createdAt && (
                                        <span className="applied-date">
                                            Applied on {formatDate(application.createdAt)}
                                        </span>
                                    )}
                                </div>

                                <button className="my-cancel-btn" onClick={()=>handleWithdraw(application._id)}>
                                    Withdraw Application
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyApplications;