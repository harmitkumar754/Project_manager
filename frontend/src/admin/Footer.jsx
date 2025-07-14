import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white px-8 py-6">
      <div className="flex justify-between items-center">
        <div className="text-sm">&copy; 2025 Project Tracker App. All rights reserved.</div>
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-gray-300">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300">Terms of Service</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
