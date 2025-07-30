import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { user, SetShowLogin, logout, credit } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between py-4 px-4 sm:px-8">
      <Link to="/">
        <img
          src={assets.logo}
          alt="image logo"
          className="w-28 sm:w-32 lg:w-40"
        />
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3 relative">
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img className="w-5" src={assets.credit_star} alt="star" />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Credits left: {credit}
              </p>
            </button>
            <p className="text-gray-600 max:sm-hidden pl-4">Hi, {user.name}</p>
            <div className="relative group">
              <img
                className="w-10 drop-shadow cursor-pointer"
                src={assets.profile_icon}
                alt="profile"
              />
              <div className="absolute right-0 py-2 bg-transparent hidden group-hover:block  rounded z-10">
                <ul className="p-2 m-0 bg-white rounded-md border text-sm list-none ">
                  <li
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p onClick={() => navigate("/buy")} className="cursor-pointer">
              Pricing
            </p>
            <button
              onClick={() => SetShowLogin(true)}
              className="bg-zinc-800 text-white px-7 py-2 sm:px-8 text-sm rounded-full cursor-pointer"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
