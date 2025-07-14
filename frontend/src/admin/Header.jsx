import { Link, } from 'react-router-dom';

function Header() {
  
  return (
    <div className="w-full bg-gray-800 text-white px-8 py-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Project Tracker App</div>
        <div className="flex gap-6">
          <Link to="/admin" className="hover:text-gray-300">Home</Link>
          <Link to="/ProjectCreate" className="hover:text-gray-300">Project Create</Link>
          <Link to="/ProjectManagement" className="hover:text-gray-300">Project Management</Link>
          <Link to="/ProjectAssignPage" className="hover:text-gray-300">Project AssignPage</Link>
          <Link to="/user-create" className="hover:text-gray-300">User Create</Link>
          <Link to="/UserManagement" className="hover:text-gray-300">User Management</Link>
          
        </div>
      </div>
    </div>
  );
}

export default Header;
