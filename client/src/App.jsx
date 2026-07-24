import {Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from"./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import profile from "./pages/login";
import Jobs from "./pages/Jobs";
import JobDetails from"./pages/JobDetails";
import MyApplications from "./pages/MyApplications";

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
      </Routes>
    </>
  );
 }
 export default App;