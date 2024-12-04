import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import UserDashboard from './Pages/UserDashboard';
import RoleList from './Pages/Role-List';
import AddRole from './Pages/AddRole';
import AdminDashboard from './Pages/AdminDashboard';
import UploadResume from './Pages/upload';
import ResetPassword from './Pages/ResetPassword';
import ForgotPassword from './Pages/ForgetPassword';
import EditUser from './Pages/EditUser';
import OnlineJobPortal from './Pages/indx';

function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route path="/" element={<OnlineJobPortal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/UserDashboard" element={<UserDashboard />} />
          <Route path="/Role-List" element={<RoleList />} />
          <Route path="/AddRole" element={<AddRole />} />
          <Route path="/AdminDaschboard" element={<AdminDashboard />} />
          <Route path="/Upload" element={<UploadResume />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/ForgetPassword" element={<ForgotPassword />} />
          <Route path="/EditUser" element={<EditUser />} />
          <Route path="/indx" element={<OnlineJobPortal />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;