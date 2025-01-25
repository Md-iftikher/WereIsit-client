import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { AuthContext } from "../Provider/AuthProvider"; 
import Swal from "sweetalert2";
import { FaGoogle } from 'react-icons/fa';

const Register = () => {
  const { createUser , handleSignInWithGoogle, handleUpdateProfile } = useContext(AuthContext); 
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
      const res = await createUser (email, password);
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
    <div className="min-h-screen flex justify-center items-center  bg-blue-100">
      <div className="bg-white w-full max-w-lg p-10 shadow-lg rounded-lg my-5">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Create an Account
        </h2>
        <form onSubmit={handleRegisterSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              className="input input-bordered"
              required
              aria-label="Name"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered"
              required
              aria-label="Email"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              name="photoURL"
              type="url"
              placeholder="Photo URL (optional)"
              className="input input-bordered"
              aria label="Photo URL"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type={showPassword ? "text" : "password"} 
              placeholder="Password"
              className="input input-bordered"
              required
              aria-label="Password"
            />
            {passwordError && <p className="text-red-600">{passwordError}</p>}
            <label className="label cursor-pointer">
              <span className="label-text">Show Password</span>
              <input
                type="checkbox"
                className="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
            </label>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className={`btn bg-blue-500 btn-outline text-white ${loading ? 'loading' : ''}`} disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
        <div className="divider">OR</div>
        <div className="form-control grid justify-center">
          <button onClick={handleGoogleLogin} className="btn btn-outline bg-blue-200 md:w-[368px]">
            <FaGoogle className="mr-2" /> Sign in with Google
          </button>
        </div>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-600 font-bold">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;