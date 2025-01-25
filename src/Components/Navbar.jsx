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
    <nav className="navbar bg-[#1d3557] text-white flex justify-between items-center p-4 px-14">
      <div className="navbar-start">
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
              className={`font-bold hover:text-white ${activeLink === "/" ? "active" : ""}`}
              onClick={() => handleLinkClick("/")}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/lost-and-found-items"
              className={`font-bold hover:text-white ${activeLink === "/lost-and-found-items" ? "active" : ""}`}
              onClick={() => handleLinkClick("/lost-and-found-items")}
            >
              Lost & Found Items
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        {user && user.email ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL || ProfileIcon} alt="Profile Pic" />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link
                  to="/add-lost-item"
                  onClick={() => handleLinkClick("/add-lost-item")}
                  className="justify-between"
                >
                  Add Lost Item
                </Link>
              </li>
              <li>
                <Link
                  to="/add-found-item"
                  onClick={() => handleLinkClick("/add-found-item")}
                  className="justify-between"
                >
                  Add Found Item
                </Link>
              </li>
              <li>
                <Link
                  to="/my-lost-items"
                  onClick={() => handleLinkClick("/my-lost-items")}
                  className="justify-between"
                >
                  My Lost Items
                </Link>
              </li>
              <li>
                <Link
                  to="/my-found-items"
                  onClick={() => handleLinkClick("/my-found-items")}
                  className="justify-between"
                >
                  My Found Items
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
            className="menu menu-xs bg-gray-500 dropdown-content w-48 rounded-box z-[1] mt-3 p-2 shadow right-[-55px]"
          >
            <li>
              <Link to="/" onClick={() => handleLinkClick("/") }>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/lost-and-found-items"
                onClick={() => handleLinkClick("/lost-and-found-items")}
              >
                Lost & Found Items
              </ Link>
            </li>
            <li>
              {user && user.email ? (
                <button
                  onClick={handleLogOut}
                  className="inline-block cursor-pointer rounded-lg bg-sky-800 px-4 py-3 text-center text-sm font-semibold text-white transition duration-200 ease-in-out hover:bg-sky-900"
                >
                  Log Out
                </button>
              ) : (
                <Link
                  to="/login"
                  className="inline-block cursor-pointer rounded-lg bg-sky-800 px-4 py-3 text-center text-sm font-semibold text-white transition duration-200 ease-in-out hover:bg-sky-900"
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