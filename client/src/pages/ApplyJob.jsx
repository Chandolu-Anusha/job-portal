import { useState } from "react";
import {useParams,useNavigate} from "react-router-dom";
import api from "../services/api";
import { toast } from 'react-toastify';
import "./ApplyJob.css";

function ApplyJob() {

    const { id } = useParams();
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        degree: "",
        educationStatus: "",
        graduationYear: "",
        phone: "",
        resume:null,
        coverLetter: "",
        agree: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        setFormData({
            ...formData,
            [name]: 
                type === "checkbox" 
                    ? checked 
                    : type === "file" 
                    ? files[0] 
                    : value 
        });
        
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!formData.agree) {
            alert("Please accept Terms & Conditions");
            return;
        }

        // Validate before submitting — show a clear message instead of a
        // server error when any required field is missed.
        const requiredFields = [
            "firstName",
            "lastName",
            "email",
            "degree",
            "educationStatus",
            "phone",
            "coverLetter"
        ];

        const missingFields = requiredFields.filter(
            (field) => !String(formData[field] || "").trim()
        );

        if (missingFields.length > 0 || !formData.resume) {
            toast.error("Please fill all the required fields before submitting.");
            return;
        }

        if (formData.educationStatus === "Pursuing" && !formData.graduationYear) {
            toast.error("Please select your expected graduation year.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
            toast.error("Please enter a valid email address.");
            return;
        }


        try {

            const data = new FormData();

            data.append("firstName", formData.firstName);
            data.append("lastName", formData.lastName);
            data.append("email", formData.email);
            data.append("degree", formData.degree);
            data.append("educationStatus", formData.educationStatus);
            data.append("graduationYear", formData.graduationYear);
            data.append("phone", formData.phone);
            data.append("coverLetter", formData.coverLetter);

            if (formData.resume) {
                data.append("resume", formData.resume);
            }


            const response = await api.post(`/applications/${id}`,data);

            toast.success("Application submitted successfully!");

            navigate("/my");

        } catch (error) {

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert(error.message);
       
            }
    }
};

    return (
        <div className="apply-page">
            <div className="page-container">
            <h2 className="apply-title">Job Application Form</h2>

            <p className="apply-subtitle">
                Fill in your details below to apply for this position.
            </p>

            <form className="apply-form" onSubmit={handleSubmit}>

                <label>First Name</label><br />
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />

                <br />

                <label>Last Name</label><br />
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />

                <br />

                <label>Email</label><br />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <br />

                <label>Degree</label><br />
                <select
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Degree</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="MBA">MBA</option>
                    <option value="MCA">MCA</option>
                    <option value="Degree">Degree</option>
                    
                </select>

                <br />

                <label>Education Status</label><br />
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            name="educationStatus"
                            value="Pursuing"
                            checked={formData.educationStatus === "Pursuing"}
                            onChange={handleChange}
                            required
                        />
                        Pursuing
                    </label>

                    <label>

                        <input
                            type="radio"
                            name="educationStatus"
                            value="Completed"
                            checked={formData.educationStatus === "Completed"}
                            onChange={handleChange}
                            required
                        />
                        Completed
                    </label>
                    <br />
                </div>

                {formData.educationStatus === "Pursuing" && (
                    <>
                        <label>Expected Graduation Year</label><br />

                        <select
                            name="graduationYear"
                            value={formData.graduationYear}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Year</option>
                            <option>2026</option>
                            <option>2027</option>
                            <option>2028</option>
                            <option>2029</option>
                            <option>2030</option>
                        </select>

                        <br /><br />
                    </>
                )}

                <label>Phone Number</label><br />
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <br /><br />

                <label>Resume</label><br/>
                <input 
                    type="file"
                    name="resume"
                    accept=".pdf"
                    onChange={handleChange}
                    required
                />
                <br/><br/>

                <label>Cover Letter</label><br />
                <textarea
                    name="coverLetter"
                    rows="5"
                    cols="40"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    required
                />

                <br /><br />
                <div className="checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            name="agree"
                            checked={formData.agree}
                            onChange={handleChange}
                            required
                        />
                        I agree to the Terms & Conditions
                    </label>
                </div>
                <br />

                <button className="submit-btn" type="submit">
                    Submit Application
                </button>

            </form>
            </div>
        </div>
    );
}

export default ApplyJob;