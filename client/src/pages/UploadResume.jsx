import { useState } from "react";
import api from "../services/api";

function UploadResume() {
    const [resume, setResume] = useState(null);

    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("resume", resume);

        try {
            const response = await api.post("/upload/resume", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert(response.data.message);
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    return (
        <div>
            <h2>Upload Resume</h2>

            <form onSubmit={handleUpload}>
                <input
                    type="file"
                    onChange={(e) => setResume(e.target.files[0])}
                />

                <br />
                <br />

                <button type="submit">
                    Upload
                </button>
            </form>
        </div>
    );
}

export default UploadResume;