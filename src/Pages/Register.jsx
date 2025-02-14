import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { FaGoogle } from 'react-icons/fa';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Register = () => {
  const { createUser, handleSignInWithGoogle, handleUpdateProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    if (!hasUpperCase || !hasLowerCase || !isValidLength) {
      setPasswordError("Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;

    // Validate password
    if (!validatePassword(password)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password',
        text: passwordError,
      });
      return;
    }

    setLoading(true);

    try {
      const res = await createUser(email, password);
      const user = res.user;

      await handleUpdateProfile({ displayName: name, photoURL });

      Swal.fire({
        icon: 'success',
        title: 'Registration successful!',
        text: 'You will be redirected shortly.',
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      const errorMessage = error.message;
      Swal.fire({
        icon: 'error',
        title: 'Registration failed',
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await handleSignInWithGoogle();
      const user = res.user;
      Swal.fire({
        icon: 'success',
        title: 'Login successful with Google!',
        text: 'You will be redirected shortly.',
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Google login unsuccessful',
        text: 'Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center p-4 sm:p-6 md:p-8 lg:p-16 items-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="bg-sky-50 w-full max-w-md p-6 sm:p-8 md:p-10 shadow-lg rounded-lg border border-gray-300">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-sky-900 mb-4 sm:mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleRegisterSubmit} className="space-y-3 sm:space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              className="w-full border font-semibold border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              aria-label="Name"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full border font-semibold border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              aria-label="Email"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Photo URL</span>
            </label>
            <input
              name="photoURL"
              type="url"
              placeholder="Photo URL (optional)"
              className="w-full border font-semibold border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Photo URL"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border font-semibold border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                aria-label="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>
            {passwordError && <p className="text-red-600 text-sm">{passwordError}</p>}
          </div>
          <div className="form-control mt-4 sm:mt-6">
            <button
              type="submit"
              className={`btn bg-sky-900 rounded-lg text-white w-full ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
        <div className="divider font-bold">OR</div>
        <div className="form-control flex justify-center">
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline bg-blue-200 w-full"
          >
            <FaGoogle className="mr-2" /> Sign up with Google
          </button>
        </div>

        <p className="mt-4 text-center text-sm sm:text-base">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-bold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;