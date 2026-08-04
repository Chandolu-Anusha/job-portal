import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
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
    return (
        <div className="jobs-title">
            <h2>All Jobs</h2>
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
                    <h3>No Jobs Found</h3>
                ) : (
                    filteredJobs.map((job) => (
                        <div className="job-card" key={job._id}>
                            <Link to={`/jobs/${job._id}`}>
                                <h3>{job.title}</h3>
                            </Link>
                            {job.companyLogo && (
                                <img className="company-logo"
                                    src={`http://localhost:5000/${job.companyLogo.replace(/\\/g, "/")}`}
                                    alt="Company Logo"
                                    width="80"
                                    height="80"
                                    onError={()=>console.log("Image failed to load")}
                                    onLoad={()=>console.log("Image loaded")}
                                />
                            )}

                            <p>{job.company}</p>
                            <p>{job.location}</p>
                            <p>{job.salary}</p>

                            <Link to={`/jobs/${job._id}`}>
                             <button className="details-btn">View Details</button>
                            </Link>
                        </div>
                ))
            )}
            </div>
        </div>
    );
}

export default Jobs;