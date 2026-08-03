import {Link} from "react-router-dom";
import {useState,useEffect}from "react";
import api from "../services/api";
import "./Home.css";

function Home(){
    const [featuredJobs,setFeaturedJobs] = useState([]);

    useEffect(()=>{
        fetchFeaturedJobs();
    },  [] );


    const fetchFeaturedJobs = async () => {
    try {
        const response = await api.get("/jobs");
        setFeaturedJobs(response.data.jobs.slice(0, 3));

    } catch (error) {
        console.log(error.response?.data);
    }
};


    return(
        <div className="home"> 
            <section className="hero">
                <h1>Find your Dream Job Today</h1>
                <p>
                   Discover thousands of opportunities from trusted companies
                    and take the next step in your career.  
                </p>

                <Link to="/jobs">
                <button>Browse Jobs</button>
                </Link>

                 <Link to="/register">
                <button>Register</button>
                </Link>

            </section>

          <section className="featured-section">
            <h2 className="tile">Featured Jobs</h2>

            <div className="featured-jobs">

                {featuredJobs.map((job) => (
                    <div className="job-card" key={job._id}>
                        <h3>{job.title}</h3>

                        <p>{job.company}</p>

                        <p>{job.location}</p>

                        <Link
                            to={`/jobs/${job._id}`}
                            className="view-btn"
                        >
                            <button>View Details</button>
                        </Link>
                    </div>
                ))}

            </div>

            </section>
            <section>
                <h2>Why Choose Us</h2>
                <div>
                    <h3>Verified Recruiters</h3>
                    <p>Apply to jobs posted by trusted companies.</p>
                </div>

                <div>
                    <h3>Easy Job Application</h3>
                    <p>Apply for jobs with just a few clicks.</p>
                </div>

                <div>
                    <h3>Track Applications</h3>
                    <p>Monitor the status of all your applications.</p>
                </div>

                <div>
                    <h3>Secure Platform</h3>
                    <p>Your personal information is protected.</p>
                </div>
            </section>
            <footer>
                <h2>Job Portal</h2>

                <p>Helping students and recruiters connect easily.</p>

                <p>Email: support@jobportal.com</p>

                <p>Phone: +91 9876543210</p>

                <p>© 2026 Job Portal. All Rights Reserved.</p>
            </footer>
        </div>
        
    );
}
export default Home;