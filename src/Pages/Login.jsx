import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Login = () => {
  const { signInWithEmail, setUser, handleSignInWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);

    try {
      const res = await signInWithEmail(email, password);
      const user = res.user;
      setUser(user);
      Swal.fire({
        icon: "success",
        title: "Login successful!",
        text: "You will be redirected shortly.",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      let errorMessage;

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No user found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/user-disabled":
          errorMessage = "This user account has been disabled.";
          break;
        default:
          errorMessage = "Login unsuccessful. Please try again.";
      }

      Swal.fire({
        icon: "error",
        title: "Login failed",
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
      setUser(user);
      Swal.fire({
        icon: "success",
        title: "Login successful with Google!",
        text: "You will be redirected shortly.",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google login unsuccessful",
        text: "Please try again.",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="card bg-sky-100 w-full max-w-lg p-10 shadow-lg rounded-lg border border-gray-300">
        <h2 className="text-2xl font-semibold text-center text-sky-900 mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleLoginSubmit} className="space-y-4">
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
              <span className="label-text font-semibold">Password</span>
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="w-full border font-semibold border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
                aria-label="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>
            <label className="label mt-2">
              <Link
                to="/forgotPassword"
                className="label-text-alt link link-hover font-semibold"
              >
                Forgot password?
              </Link>
            </label>
          </div>
          <div className="form-control mt-6">
            <button
              className={`inline-block cursor-pointer rounded-lg bg-sky-800 px-4 py-3 text-center text-sm font-semibold text-white transition duration-200 ease-in-out hover:bg-sky-900 w-full ${
                loading ? "loading" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <div className="text-center my-4">
          <p className="font-semibold">Or login with:</p>
          <div className="flex justify-center items-center">
            <button
              className="btn btn-outline bg-blue-200 w-full"
              onClick={handleGoogleLogin}
              aria-label="Login with Google"
            >
              <FaGoogle className="mr-2 " />
              Google
            </button>
          </div>
        </div>
        <p className="text-center font-semibold">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-800">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
