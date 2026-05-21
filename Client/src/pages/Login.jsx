import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import axios from "../store/axiosInstance";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, fetchUser } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token in URL (from Google OAuth callback)
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      setToken(token);
      fetchUser(token).then(() => {
        navigate("/");
      });
    }
  }, [location, setToken, fetchUser, navigate]);

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/api/auth/google`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = state === "login" ? "/api/user/login" : "/api/user/register";

    try {
      const {data} = await axios.post(url, {name, email, password});
      if(data.success){
        // Set token first
        setToken(data.token);
        // Fetch user data immediately with the new token
        await fetchUser(data.token);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 dark:text-gray-300 rounded-lg shadow-xl border border-gray-200 dark:border-[#80609F]/30 bg-white dark:bg-[#242124]/80 backdrop-blur-sm">
      <p className="text-2xl md:text-2xl font-medium m-auto">
        <span className="text-indigo-500 dark:text-purple-400">User</span>{" "}
        <span className="text-gray-900 dark:text-white">{state === "login" ? "Login" : "Sign Up"}</span>
      </p>
      {state === "register" && (
        <div className="w-full">
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="type here"
            className="border border-gray-200 dark:border-[#80609F]/30 rounded w-full p-2.5 md:p-2 mt-1 outline-indigo-500 dark:outline-purple-500 bg-white dark:bg-[#1a1a1a] text-sm md:text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            type="text"
            required
          />
        </div>
      )}
      <div className="w-full ">
        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">Email</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="type here"
          className="border border-gray-200 dark:border-[#80609F]/30 rounded w-full p-2.5 md:p-2 mt-1 outline-indigo-500 dark:outline-purple-500 bg-white dark:bg-[#1a1a1a] text-sm md:text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
          type="email"
          required
        />
      </div>
      <div className="w-full ">
        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">Password</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="type here"
          className="border border-gray-200 dark:border-[#80609F]/30 rounded w-full p-2.5 md:p-2 mt-1 outline-indigo-500 dark:outline-purple-500 bg-white dark:bg-[#1a1a1a] text-sm md:text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
          type="password"
          required
        />
      </div>
      {state === "register" ? (
        <p className="text-sm md:text-base">
          Already have account?{" "}
          <span
            onClick={() => setState("login")}
            className="text-indigo-500 dark:text-purple-400 cursor-pointer hover:underline"
          >
            click here
          </span>
        </p>
      ) : (
        <p className="text-sm md:text-base">
          Create an account?{" "}
          <span
            onClick={() => setState("register")}
            className="text-indigo-500 dark:text-purple-400 cursor-pointer hover:underline"
          >
            click here
          </span>
        </p>
      )}
      <button type="submit" className="bg-indigo-500 dark:bg-purple-600 hover:bg-indigo-600 dark:hover:bg-purple-700 transition-all text-white w-full py-2.5 md:py-2 text-base md:text-base rounded-md cursor-pointer font-medium">
        {state === "register" ? "Create Account" : "Login"}
      </button>

      <div className="flex items-center w-full my-2">
        <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
        <span className="px-3 text-sm text-gray-500 dark:text-gray-400">or</span>
        <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-all text-gray-700 dark:text-gray-200 w-full py-2.5 md:py-2 text-base md:text-base rounded-md cursor-pointer font-medium"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>
    </form>
  );
};

export default Login;
