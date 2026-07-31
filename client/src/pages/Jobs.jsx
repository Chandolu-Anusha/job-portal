import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [company, setCompany] = useState("");

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
            location === "" || job.location === location;

        const matchesCompany =
            company === "" || job.company === company;

        return matchesSearch && matchesLocation && matchesCompany;
    });

    return (
        <div>
            <h2>All Jobs</h2>

            <input
                type="text"
                placeholder="Search by title, company or location"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <input
                type="text"
                placeholder="Search by location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

            <input
                type="text"
                placeholder="Search by company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />

            <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            >
                <option value="">All Locations</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
            </select>

            <select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            >
                <option value="">All Companies</option>
                <option value="Infosys">Infosys</option>
                <option value="TCS">TCS</option>
                <option value="Wipro">Wipro</option>
            </select>

            {filteredJobs.length === 0 ? (
                <h3>No Jobs Found</h3>
            ) : (
                filteredJobs.map((job) => (
                    <div key={job._id}>
                        <Link to={`/jobs/${job._id}`}>
                            <h3>{job.title}</h3>
                        </Link>

                        <p>{job.company}</p>
                        <p>{job.location}</p>
                        <p>{job.salary}</p>

                        <Link to={`/jobs/${job._id}`}>
                            <button>View Details</button>
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
}

export default Jobs;