"use client";

import { useState } from "react";
import Link from "next/link";
import Image from 'next/image';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login - redirect or update state
        console.log("Login successful", data);
        // Redirect user to a different page
        window.location.href = "/dashboard"; // Example redirection
      } else {
        // Handle invalid login (error response from API)
        if (data.message === "Invalid credentials") {
          setError("Invalid User ID or Password");
        } else {
          setError(data.message || "Something went wrong");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-purple-500">
      <div className="w-full max-w-md bg-blue-300 shadow-lg rounded-xl p-8">
        <div className="mb-6 text-center">
        <Image
          className="w-24 h-24 rounded-full mx-auto"
          src="/download.png"
          alt="Profile Picture"
          width={96}
          height={96}
        />
          <h1 className="text-3xl font-semibold text-gray-800">Login</h1>
          <h6 className="w-full flex-none mb-3 text-lg leading-none text-slate-900">
MR.SATYA SAGAR
      </h6>
        </div>
        {error && (
          <div className="mb-4 text-red-600 text-center font-medium">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              User ID
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition  text-black bg-gradient-to-r from-blue-100 to-purple-200 "
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black bg-gradient-to-r from-blue-100 to-purple-200"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-blue-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm text-gray-500">
          Do not have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
  
  
};

export default LoginPage;
