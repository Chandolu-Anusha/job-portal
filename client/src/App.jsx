import {Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from"./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import JobDetails from"./pages/JobDetails";
import MyApplications from "./pages/MyApplications";
import ManageJobs from"./pages/ManageJobs";
import JobApplications from "./pages/JobApplications";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import SavedJobs from"./pages/SavedJobs";
import UploadResume from"./pages/UploadResume";
import ChangePassword from"./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import Logout from"./pages/Logout";
import RoleProtectedRoute  from "./components/RoleProtectedRoute";


function App(){
  return(
    <>
      <Navbar/>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/login"  element={<Login/>}/>
        <Route path="/register"  element={<Register/>}/>
        <Route path="/profile"  element={<Profile/>}/>
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="/jobs/:id" element={<JobDetails/>}/>
        <Route path="/my" element={<MyApplications/>}/>
        <Route path="/manage-jobs" element={<ManageJobs/>}/>
        <Route path="/applications/:id" element={<JobApplications/>}></Route>
        <Route path="/create-job" element={
          <RoleProtectedRoute role="recruiter">
            <CreateJob />
          </RoleProtectedRoute>
    }/>
        <Route path="/edit-job/:id" element={<EditJob/>}></Route>
        <Route path="/saved-jobs" element={<SavedJobs/>}></Route>
        <Route path="/Upload-Resume" element={<UploadResume/>}></Route>
        <Route path="/change-password" element={<ChangePassword/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/logout" element={<Logout/>}></Route>
        
      </Routes>
    </>
  );
 }
 export default App;