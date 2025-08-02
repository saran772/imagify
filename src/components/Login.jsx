import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  const { SetShowLogin, backendurl, SetToken, SetUser } =
    useContext(AppContext);
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Login") {
        const { data } = await axios.post(backendurl + "/user/login", {
          email,
          password,
        });
        if (data.success) {
          SetToken(data.token);
          SetUser(data.user);
          localStorage.setItem("token", data.token);
          SetShowLogin(false);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendurl + "/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          SetToken(data.token);
          SetUser(data.user);
          localStorage.setItem("token", data.token);
          SetShowLogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed  top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex items-center justify-center">
      <motion.form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500"
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>
        {state !== "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img width={20} src={assets.profile_icon} alt="" />
            <input
              onChange={(e) => SetName(e.target.value)}
              value={name}
              className="outline-none text-sm"
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
        )}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img width={20} src={assets.email_icon} alt="" />
          <input
            onChange={(e) => SetEmail(e.target.value)}
            value={email}
            className="outline-none text-sm"
            type="email"
            placeholder="Email id"
            required
          />
        </div>
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img width={15} src={assets.lock_icon} alt="" />
          <input
            onChange={(e) => SetPassword(e.target.value)}
            value={password}
            className="outline-none text-sm"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Forgot Password?
        </p>
        <button
          className="bg-blue-600 w-full text-white
        py-2 rounded-full"
        >
          {state === "Login" ? "Login" : "create account"}
        </button>
        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign up")}
              className="text-blue-600 cursor-pointer"
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-600 cursor-pointer"
            >
              Login
            </span>
          </p>
        )}
        <img
          onClick={() => {
            SetShowLogin(false);
          }}
          className="absolute top-5 right-5 cursor-pointer"
          src={assets.cross_icon}
          alt=""
        />
      </motion.form>
    </div>
  );
};

export default Login;
