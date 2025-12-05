import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import axios from "../store/axiosInstance";
import toast from "react-hot-toast";

const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, fetchUser } = useAuthStore();

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
      <p className="text-2xl font-medium m-auto">
        <span className="text-indigo-500 dark:text-purple-400">User</span>{" "}
        <span className="text-gray-900 dark:text-white">{state === "login" ? "Login" : "Sign Up"}</span>
      </p>
      {state === "register" && (
        <div className="w-full">
          <p className="text-gray-700 dark:text-gray-300">Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="type here"
            className="border border-gray-200 dark:border-[#80609F]/30 rounded w-full p-2 mt-1 outline-indigo-500 dark:outline-purple-500 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            type="text"
            required
          />
        </div>
      )}
      <div className="w-full ">
        <p className="text-gray-700 dark:text-gray-300">Email</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="type here"
          className="border border-gray-200 dark:border-[#80609F]/30 rounded w-full p-2 mt-1 outline-indigo-500 dark:outline-purple-500 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
          type="email"
          required
        />
      </div>
      <div className="w-full ">
        <p className="text-gray-700 dark:text-gray-300">Password</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="type here"
          className="border border-gray-200 dark:border-[#80609F]/30 rounded w-full p-2 mt-1 outline-indigo-500 dark:outline-purple-500 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
          type="password"
          required
        />
      </div>
      {state === "register" ? (
        <p>
          Already have account?{" "}
          <span
            onClick={() => setState("login")}
            className="text-indigo-500 dark:text-purple-400 cursor-pointer hover:underline"
          >
            click here
          </span>
        </p>
      ) : (
        <p>
          Create an account?{" "}
          <span
            onClick={() => setState("register")}
            className="text-indigo-500 dark:text-purple-400 cursor-pointer hover:underline"
          >
            click here
          </span>
        </p>
      )}
      <button type="submit" className="bg-indigo-500 dark:bg-purple-600 hover:bg-indigo-600 dark:hover:bg-purple-700 transition-all text-white w-full py-2 rounded-md cursor-pointer">
        {state === "register" ? "Create Account" : "Login"}
      </button>
    </form>
  );
};

export default Login;
