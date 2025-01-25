import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileIcon from "../assets/image.png";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, handleLogOut } = useContext(AuthContext);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <nav className="navbar bg-[#4b5bb8] text-white flex justify-between items-center p-4 px-14">
      <div className="navbar-start">
        <Link to="/" className="flex justify-center items-center gap-2">
          <div className="grid gap-0 font-bold md:text-xl">
            <h2>CrowdCube</h2>
          </div>
        </Link>
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              to="/"
              className={`font-bold hover:text-white ${activeLink === "/" ? "active" : ""}`}
              onClick={() => handleLinkClick("/")}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/all-campaigns"
              className={`font-bold hover:text-white ${activeLink === "/all-campaigns" ? "active" : ""}`}
              onClick={() => handleLinkClick("/all-campaigns")}
            >
              All Campaigns
            </Link>
          </li>
          <li>
            <Link
              to="/add-new-campaign"
              className={`font-bold hover:text-white ${activeLink === "/add-new-campaign" ? "active" : ""}`}
              onClick={() => handleLinkClick("/add-new-campaign")}
            >
              Add New Campaign
            </Link>
          </li>
          <li>
            <Link
              to="/my-campaigns"
              className={`font-bold hover:text-white ${activeLink === "/my-campaigns" ? "active" : ""}`}
              onClick={() => handleLinkClick("/my-campaigns")}
            >
              My Campaigns
            </Link>
          </li>
          <li>
            <Link
              to="/my-donations"
              className={`font-bold hover:text-white ${activeLink === "/my-donations" ? "active" : ""}`}
              onClick={() => handleLinkClick("/my-donations")}
            >
              My Donations
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        <Link to="/" className="hidden md:inline">
          <img
            className="w-12 h-12 rounded-full"
            src={user && user.photoURL ? user.photoURL : ProfileIcon}
            alt="Profile"
          />
        </Link>

        {user && user.email ? (
          <button
            onClick={handleLogOut}
            className="btn bg-blue-600 border-none text-white hidden md:inline"
          >
            Log Out
          </button>
        ) : (
          <Link to="/login">
            <div className="hidden md:inline">
              <button className="btn bg-blue-600 border-none text-white">
                Login
              </button>
            </div>
          </Link>
        )}

        {/* mobile dropdown */}
        <div className="dropdown md:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-xs bg-blue-500 dropdown-content w-48 rounded-box z-[1] mt-3 p-2 shadow right-[-55px]"
          >
            <li>
              <Link to="/" onClick={() => handleLinkClick("/") }>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/all-campaigns"
                onClick={() => handleLinkClick("/all-campaigns")}
              >
                All Campaigns
              </Link>
            </li>
            <li>
              <Link
                to="/add-new-campaign"
                onClick={() => handleLinkClick("/add-new-campaign")}
              >
                Add New Campaign
              </Link>
            </li>
            <li>
              <Link
                to="/my-campaigns"
                onClick={() => handleLinkClick("/my-campaigns")}
              >
                My Campaigns
              </Link>
            </li>
            <li>
              <Link
                to="/my-donations"
                onClick={() => handleLinkClick("/my-donations")}
              >
                My Donations
              </Link>
            </li>
            <li>
              {user && user.email ? (
                <button
                  onClick={handleLogOut}
                  className="btn bg-blue-600 border-none text-white"
                >
                  Log Out
                </button>
              ) : (
                <Link
                  to="/login"
                  className="btn bg-blue-600 border-none text-white flex items-center justify-center"
                >
                  Log In
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;