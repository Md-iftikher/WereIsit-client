import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mt-2">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
