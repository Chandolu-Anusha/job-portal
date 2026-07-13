const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const jobRoutes=require("./routes/jobRoutes");
const applicationRoutes=require("./routes/applicationRoutes");
const {authMiddleware}=require("./middleware/authMiddleware");
const uploadRoutes=require("./routes/uploadRoutes");
const savedJobRoutes=require("./routes/savedJobRoutes");
const dashboardRoutes=require("./routes/dashboardRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Job Portal API");
});
app.get("/profile",authMiddleware);
const errorHandler=require("./middleware/errorMiddleware");

app.use("/api/auth", authRoutes);

app.use("/api/jobs",jobRoutes);

app.use("/api/applications",applicationRoutes);

app.use("/api/upload",uploadRoutes);

app.use("/api/saved",savedJobRoutes);

app.use("/api/dashboard",dashboardRoutes);


app.use(errorHandler);

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};

startServer();