import {Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from"./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import profile from "./pages/login";
import Jobs from "./pages/Jobs";
import JobDetails from"./pages/JobDetails";
import MyApplications from "./pages/MyApplications";
import ManageJobs from"./pages/ManageJobs";
import JobApplications from "./pages/JobApplications";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import SavedJobs from"./pages/SavedJobs";
import UploadResume from"./pages/UploadResume";


function App(){
  return(
    <>
      <Navbar/>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/login"  element={<Login/>}/>
        <Route path="/register"  element={<Register/>}/>
        <Route path="/profile"  element={<profile/>}/>
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="/jobs/:id" element={<JobDetails/>}/>
        <Route path="/my" element={<MyApplications/>}/>
        <Route path="/manage-jobs" element={<ManageJobs/>}/>
        <Route path="/applications/:id" element={<JobApplications/>}></Route>
        <Route path="/create-job" element={<CreateJob/>}></Route>
        <Route path="/edit-job/:id" element={<EditJob/>}></Route>
        <Route path="/saved-jobs" element={<SavedJobs/>}></Route>
        <Route path="/Upload-Resume" element={<UploadResume/>}></Route>
      </Routes>
    </>
  );
 }
 export default App;