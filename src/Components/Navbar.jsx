import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileIcon from "../assets/image.png";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, handleLogOut } = useContext(AuthContext);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLinkClick = (path) => {
    setActiveLink(path);
    setIsSidebarOpen(false);
  };

  return (
    <nav className="navbar bg-[#1d3557] text-white flex justify-between items-center p-4 px-14">
      <div className="navbar-centre md:navbar-start">
        <Link to="/" className="flex justify-center items-center gap-2">
          <div className="grid gap-0 font-bold md:text-xl">
            <h2>WhereIsIt</h2>
          </div>
        </Link>
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              to="/"
              className={`font-bold hover:text-white ${
                activeLink === "/" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("/")}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/lost-and-found-items"
              className={`font-bold hover:text-white ${
                activeLink === "/lost-and-found-items" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("/lost-and-found-items")}
            >
              Lost & Found Items
            </Link>
          </li>
          <li>
            <Link
              to="/how_it_works"
              className={`font-bold hover:text-white ${
                activeLink === "/lost-and-found-items" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("/lost-and-found-items")}
            >
              How It Works
            </Link>
          </li>
          <li>
            <Link
              to="/About_us"
              className={`font-bold hover:text-white ${
                activeLink === "/lost-and-found-items" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("/lost-and-found-items")}
            >
              About Us
            </Link>
          </li>
        </ul>
      </div>

      {/* mobile drop down  */}
      <div className="navbar-end flex items-center gap-3">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden inline-flex items-center justify-center p-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* profile dropdown */}

      <div className="navbar-end hidden md:flex items-center gap-3">
        {user && user.email ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL || ProfileIcon} alt="Profile Pic" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact bg-gray-600 dropdown-content mt-3 p-2 shadow rounded-box w-52"
            >
              <li>
                <Link
                  to="/add-lost-item"
                  className="block py-2 font-semibold px-4 hover:bg-gray-700"
                  onClick={() => handleLinkClick("/add-lost-item")}
                >
                  Add Lost & Found Item
                </Link>
              </li>
            
              <li>
                <Link
                  to="/Recovered-Items"
                  className="block py-2 font-semibold px-4 hover:bg-gray-700"
                  onClick={() => handleLinkClick("/my-lost-items")}
                >
                  Recovered Items
                </Link>
              </li>
              <li>
                <Link
                  to="/my-items"
                  className="block py-2 font-semibold px-4 hover:bg-gray-700"
                  onClick={() => handleLinkClick("/my-found-items")}
                >
                  My Items
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="inline-block cursor-pointer rounded-lg bg-sky-800 px-4 py-3 text-center text-sm font-semibold text-white transition duration-200 ease-in-out hover:bg-sky-900"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login">
            <button className="inline-block cursor-pointer rounded-lg bg-sky-800 px-4 py-3 text-center text-sm font-semibold text-white transition duration-200 ease-in-out hover:bg-sky-900">
              Login
            </button>
          </Link>
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      <div
        className={`fixed left-0 top-0 w-64 h-full bg-gray-700 text-white transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">WhereIsIt</h2>
          <ul className="mt-4">
            <li>
              <Link
                to="/"
                className={`block py-2 px-4 hover:bg-gray-600 ${
                  activeLink === "/" ? "bg-gray-600" : ""
                }`}
                onClick={() => handleLinkClick("/")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/lost-and-found-items"
                className={`block py-2 px-4 hover:bg-gray-600 ${
                  activeLink === "/lost-and-found-items" ? "bg-gray-600" : ""
                }`}
                onClick={() => handleLinkClick("/lost-and-found-items")}
              >
                Lost & Found Items
              </Link>
            </li>
            <li>
              <Link
                to="/add-lost-item"
                className="block py-2 px-4 hover:bg-gray-600"
                onClick={() => handleLinkClick("/add-lost-item")}
              >
                Add Lost Item
              </Link>
            </li>
            <li>
              <Link
                to="/add-found-item"
                className="block py-2 px-4 hover:bg-gray-600"
                onClick={() => handleLinkClick("/add-found-item")}
              >
                Add Found Item
              </Link>
            </li>
            <li>
              <Link
                to="/my-lost-items"
                className="block py-2 px-4 hover:bg-gray-600"
                onClick={() => handleLinkClick("/my-lost-items")}
              >
                My Lost Items
              </Link>
            </li>
            <li>
              <Link
                to="/my-found-items"
                className="block py-2 px-4 hover:bg-gray-600"
                onClick={() => handleLinkClick("/my-found-items")}
              >
                My Found Items
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogOut}
                className="btn block w-full text-left py-2 px-4 hover:bg-gray-600"
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
