import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Student/Register";
import Login from "./pages/Student/Login";
import MentorRegister from "./pages/Mentor/MentorRegister";
import MentorLogin from "./pages/Mentor/MentorLogin";
import Dashboard from "./pages/Student/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Common/Home";
import { AuthProvider } from "./context/AuthContext";
import { MentorProvider } from "./context/MentorContext";
import MentorList from "./pages/Student/MentorList";
import MentorDashboard from "./pages/Mentor/MentorDashboard";
import MainLogin from "./pages/Common/MainLogin";
import About from "./pages/Common/About";
import Contact from "./pages/Common/Contact";
import StudentProfile from "./pages/Student/Profile";
import MentorProfile from "./pages/Mentor/Profile";
import AddProject from "./pages/Student/AddProject";
import FunderRegister from "./pages/Funder/FunderRegister";
import FunderLogin from "./pages/Funder/FunderLogin";
import FunderDashboard from "./pages/Funder/FunderDashboard";
import FunderList from "./pages/Funder/FunderList"; 



function App() {
  return (
    // Wrap the entire app in AuthProvider and MentorProvider
    <AuthProvider>
      <MentorProvider>
        {/* Wrap the app in Router for routing functionality */}
        <Router>
          {/* Header for navigation */}
          <Header />
          {/* Main content section */}
          <div className="container mx-auto p-6">
            <Routes>
              {/* Define routes for each page */} <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/login" element={<MainLogin />} />

  {/* Student Routes */}
  <Route path="/student/login" element={<Login />} />
  <Route path="/student/register" element={<Register />} />
  <Route path="/student/dashboard" element={<Dashboard />} />
  <Route path="/student/profile" element={<StudentProfile />} />
  
  <Route path="/mentors/:projectId" element={<MentorList />} />
  <Route path="/add-project" element={<AddProject />} />

  {/* Mentor Routes */}
  <Route path="/mentor/login" element={<MentorLogin />} />
  <Route path="/mentor/register" element={<MentorRegister />} />
  <Route path="/mentor/dashboard" element={<MentorDashboard />} />
  <Route path="/mentor/profile" element={<MentorProfile />} />

{/* Funder Routes */}
<Route path="/funder-register" element={<FunderRegister />} />
<Route path="/funder-login" element={<FunderLogin />} />
<Route path="/funder-dashboard" element={<FunderDashboard />} />
<Route path="/funders" element={<FunderList />} />

          
            </Routes>
          </div>
          {/* Footer of the page */}
          <Footer />
        </Router>
      </MentorProvider>
    </AuthProvider>
  );
}

export default App;