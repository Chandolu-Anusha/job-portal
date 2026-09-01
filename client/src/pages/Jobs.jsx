import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import CompanyLogo from "../components/CompanyLogo";
import "./Jobs.css";

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [locationSearch, setLocationSearch] = useState("");
    const [companySearch, setCompanySearch] = useState("");

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await api.get("/jobs");
            setJobs(response.data.jobs);
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.company.toLowerCase().includes(search.toLowerCase()) ||
            job.location.toLowerCase().includes(search.toLowerCase());

            const matchesLocation =
                (locationSearch === "" ||
                    job.location.toLowerCase().includes(locationSearch.toLowerCase()));

            const matchesCompany =
                (companySearch === "" ||
                    job.company.toLowerCase().includes(companySearch.toLowerCase()));

            return matchesSearch && matchesLocation && matchesCompany;
    });

    const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const getSkills = (requirements) => {
        if (!requirements) return [];
        return requirements
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
            .slice(0, 4);
    };

    return (
        <div className="jobs-page">
            <div className="page-container">
                <h2 className="page-heading">All Jobs</h2>
                <p className="page-subheading">
                    Browse {filteredJobs.length} open {filteredJobs.length === 1 ? "position" : "positions"} and find the right fit for you.
                </p>

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by title, company or location"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Search by location"
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Search by company"
                        value={companySearch}
                        onChange={(e) => setCompanySearch(e.target.value)}
                    />

                </div>

                <div className="jobs-grid">
                    {filteredJobs.length === 0 ? (
                        <div className="empty-state">No Jobs Found</div>
                    ) : (
                        filteredJobs.map((job) => (
                            <div className="job-card" key={job._id}>
                                <div className="job-card-top">
                                    <CompanyLogo src={job.companyLogo} alt={job.company} />
                                    <div className="job-card-heading">
                                        <Link to={`/jobs/${job._id}`}>
                                            <h3>{job.title}</h3>
                                        </Link>
                                        <p className="job-company">{job.company}</p>
                                    </div>
                                </div>

                                <div className="job-meta">
                                    <span className="meta-chip">{job.location}</span>
                                    {job.jobType && <span className="meta-chip">{job.jobType}</span>}
                                    {job.experience && <span className="meta-chip">{job.experience}</span>}
                                </div>

                                {getSkills(job.requirements).length > 0 && (
                                    <div className="job-skills">
                                        {getSkills(job.requirements).map((skill, index) => (
                                            <span className="skill-tag" key={index}>{skill}</span>
                                        ))}
                                    </div>
                                )}

                                <div className="job-card-bottom">
                                    {job.salary ? (
                                        <span className="job-salary">₹{Number(job.salary).toLocaleString("en-IN")}</span>
                                    ) : (
                                        <span />
                                    )}
                                    <Link to={`/jobs/${job._id}`}>
                                        <button className="details-btn">View Details</button>
                                    </Link>
                                </div>

                                {job.createdAt && (
                                    <p className="posted-date">Posted on {formatDate(job.createdAt)}</p>
                                )}
                            </div>
                    ))
                )}
                </div>
            </div>
        </div>
    );
}

export default Jobs;