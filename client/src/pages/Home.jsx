import {Link} from "react-router-dom";
import {useState,useEffect}from "react";
import api from "../services/api";
import CompanyLogo from "../components/CompanyLogo";
import "./Home.css";

function Home(){
    const [featuredJobs,setFeaturedJobs] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    
   useEffect(() => {
    if (user) {
        fetchFeaturedJobs();
    }
}, []);


    const fetchFeaturedJobs = async () => {
    try {
        const response = await api.get("/jobs");
        setFeaturedJobs(response.data.jobs.slice(0, 3));

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
    <div className="home">

        {/* Hero Section */}
        <section className="hero">
            <span className="hero-eyebrow">🚀 Trusted by students &amp; recruiters</span>

            <h1>
                Find Your Next <span className="hero-highlight">Opportunity</span>
            </h1>

            <p>
                Discover thousands of openings from verified companies,
                apply in minutes and track every application — all in one place.
            </p>

            <div className="hero-buttons">
                <Link to="/jobs">
                    <button className="hero-btn">Browse Jobs</button>
                </Link>

                <Link to="/register">
                    <button className="hero-btn register-btn">Create Free Account</button>
                </Link>
            </div>
        </section>

        {/* Featured Jobs */}
        {user && (
<section className="featured-section">
    <div className="section-head">
        <h2 className="tile">Featured Jobs</h2>
        <Link to="/jobs" className="view-all-link">View all jobs →</Link>
    </div>

    <div className="featured-jobs">
        {featuredJobs.map((job) => (
            <div className="job-card" key={job._id}>
                <div className="job-card-top">
                    <CompanyLogo src={job.companyLogo} alt={job.company} />
                    <div className="job-card-heading">
                        <h3>{job.title}</h3>
                        <p className="job-company">{job.company}</p>
                    </div>
                </div>

                <div className="job-meta">
                    <span className="meta-chip">{job.location}</span>
                    {job.jobType && <span className="meta-chip">{job.jobType}</span>}
                    {job.experience && <span className="meta-chip">{job.experience}</span>}
                </div>

                <div className="job-card-bottom">
                    {job.salary ? (
                        <span className="job-salary">₹{Number(job.salary).toLocaleString("en-IN")}</span>
                    ) : (
                        <span />
                    )}
                    <Link to={`/jobs/${job._id}`} className="view-btn">
                        View Details
                    </Link>
                </div>

                {job.createdAt && (
                    <p className="posted-date">Posted on {formatDate(job.createdAt)}</p>
                )}
            </div>
        ))}
    </div>
</section>
)}

        {/* Statistics */}

        <section className="stats-section">

            <div className="stat-box">
                <h2>500+</h2>
                <p>Jobs Posted</p>
            </div>

            <div className="stat-box">
                <h2>100+</h2>
                <p>Recruiters</p>
            </div>

            <div className="stat-box">
                <h2>1000+</h2>
                <p>Students</p>
            </div>

            <div className="stat-box">
                <h2>95%</h2>
                <p>Success Rate</p>
            </div>

        </section>

        {/* Why Choose Us */}

        <section className="why-section">

            <h2 className="why-title">
                Why Choose Us
            </h2>

            <div className="why-grid">

                <div className="why-card">
                    <span className="why-icon">🛡</span>
                    <h3>Verified Recruiters</h3>
                    <p>
                        Apply to jobs posted by trusted companies.
                    </p>
                </div>

                <div className="why-card">
                    <span className="why-icon">⚡</span>
                    <h3>Easy Applications</h3>
                    <p>
                        Apply for jobs with just a few clicks.
                    </p>
                </div>

                <div className="why-card">
                    <span className="why-icon">📊</span>
                    <h3>Track Applications</h3>
                    <p>
                        Monitor every application from your dashboard.
                    </p>
                </div>

                <div className="why-card">
                    <span className="why-icon">🔒</span>
                    <h3>Secure Platform</h3>
                    <p>
                        Your personal information is always protected.
                    </p>
                </div>

            </div>

        </section>

        {/* Testimonials */}

        <section className="testimonial-section">

            <h2 className="why-title">
                What Users Say
            </h2>

            <div className="why-grid">

                <div className="why-card">
                    <h3>⭐⭐⭐⭐⭐</h3>
                    <p>
                        "This portal helped me get my internship easily."
                    </p>
                    <strong>- Student</strong>
                </div>

                <div className="why-card">
                    <h3>⭐⭐⭐⭐⭐</h3>
                    <p>
                        "Posting jobs and managing applicants is very simple."
                    </p>
                    <strong>- Recruiter</strong>
                </div>

            </div>

        </section>

        {/* Footer */}

        <footer className="footer">

            <div className="footer-container">

                <div>
                    <h2>Job Portal</h2>
                    <p>
                        Helping students and recruiters connect easily.
                    </p>
                </div>

                <div>
                    <h3>Quick Links</h3>
                    <p><Link to="/">Home</Link></p>
                    <p><Link to="/jobs">Jobs</Link></p>
                    <p><Link to="/dashboard">Dashboard</Link></p>
                </div>

                <div>
                    <h3>Contact</h3>
                    <p>📧 support@jobportal.com</p>
                    <p>📞 +91 9876543210</p>
                </div>

            </div>

            <hr />

            <p className="copyright">
                © 2026 Job Portal. All Rights Reserved.
            </p>

        </footer>

    </div>
);

  
}
export default Home;