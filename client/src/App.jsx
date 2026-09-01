import {Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from"./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import JobDetails from"./pages/JobDetails";
import MyApplications from "./pages/MyApplications";
import ManageJobs from"./pages/ManageJobs";
import JobApplications from "./pages/JobApplications";
import AllApplications from "./pages/AllApplications";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import SavedJobs from"./pages/SavedJobs";
import ChangePassword from"./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import Logout from"./pages/Logout";
import RoleProtectedRoute  from "./components/RoleProtectedRoute";
import EditProfile from "./pages/EditProfile";
import ApplyJob from "./pages/ApplyJob";
import GuestJobs from "./pages/GuestJobs";


function App(){
  return(
    <>
      <Navbar/>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/login"  element={<Login/>}/>
        <Route path="/register"  element={<Register/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        <Route
              path="/jobs"
              element={
                  localStorage.getItem("token")
                      ? <Jobs />
                      : <GuestJobs />
                    }
        />
        <Route path="/jobs/:id" element={<JobDetails/>}/>
        <Route path="/my" element={
          <RoleProtectedRoute role="student">
            <MyApplications/>
          </RoleProtectedRoute>
          }/>
          <Route path="/apply/:id"element={
            <RoleProtectedRoute role="student">
              <ApplyJob />
            </RoleProtectedRoute>
          }/>
        <Route path="/manage-jobs" element={
          <RoleProtectedRoute role="recruiter">
             <ManageJobs/>
          </RoleProtectedRoute>
          }/>
        <Route path="/applications" element={
          <RoleProtectedRoute role="recruiter">
             <AllApplications/>
          </RoleProtectedRoute>
         }/>
        <Route path="/applications/:id" element={
          <RoleProtectedRoute role="recruiter">
             <JobApplications/>
          </RoleProtectedRoute>
         }/>
        <Route path="/create-job" element={
          <RoleProtectedRoute role="recruiter">
            <CreateJob />
          </RoleProtectedRoute>
        }/>
        <Route path="/edit-job/:id" element={
          <RoleProtectedRoute role="recruiter">
             <EditJob/>
          </RoleProtectedRoute>
        }></Route>

        <Route path="/saved-jobs" element={
          <RoleProtectedRoute role="student">
             <SavedJobs/>
          </RoleProtectedRoute>
        }/>

        <Route path="/profile" element={
          <RoleProtectedRoute role={JSON.parse(localStorage.getItem("user"))?.role}>
            <Profile />
          </RoleProtectedRoute>
          }/>

          <Route path="/edit-profile" element={
            <RoleProtectedRoute role={JSON.parse(localStorage.getItem("user"))?.role}>
              <EditProfile/>
            </RoleProtectedRoute>
          }/>

        <Route path="/dashboard" element={
          <RoleProtectedRoute role={JSON.parse(localStorage.getItem("user"))?.role}>
            <Dashboard />
          </RoleProtectedRoute>
          }/>

        <Route path="/change-password" element={
          <RoleProtectedRoute role={JSON.parse(localStorage.getItem("user"))?.role}>
            <ChangePassword />
          </RoleProtectedRoute>
        }/>

        <Route path="/logout" element={<Logout/>}></Route>
        
      </Routes>
    </>
  );
 }
 export default App;