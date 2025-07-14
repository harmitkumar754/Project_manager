import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './admin/home';
import Footer from './admin/Footer';
import UserCreate from './pages/Register';
import UserManagement from './admin/UserManagement';
import { ToastContainer } from 'react-toastify';

import Login from './pages/Login';
import ProjectCreate from './admin/ProjectCreate';
import ProjectManagement from './admin/ProjectManagement';
import ProjectAssignPage from './admin/ProjectAssignPage';


import ProtectedRoute from './components/ProtectedRoute';
import Userhome from './user/Home';
import MyProjects from './user/MyProjects';
import Profile from './user/Profile';





function App() {
  

  return (
  
     <div className='min-h-screen flex flex-col'>
 
     <BrowserRouter>
    
      <ToastContainer autoClose={2000} />
     <Routes>
      
        <Route path="/admin" element={<Home />} />
        <Route path="/user-create" element={<UserCreate/>} />
        <Route path="/UserManagement" element={<UserManagement/>} />
        <Route path="/ProjectCreate" element={<ProjectCreate/>} />
        <Route path="/ProjectManagement" element={<ProjectManagement/>} />
        <Route path="/ProjectAssignPage" element={<ProjectAssignPage/>} />


         <Route path="/" element={<Login></Login>}  />
         
         <Route path="/user" element={<ProtectedRoute><Userhome/></ProtectedRoute>} />
         <Route path="/MyProjects" element={<ProtectedRoute><MyProjects/></ProtectedRoute>} />
         <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />

        
     </Routes>

    <Footer></Footer>
      </BrowserRouter>
      </div>
     
  )
}

export default App
