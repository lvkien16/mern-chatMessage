import React from "react";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbLock } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

export default function SignUp() {
  return (
    <>
      <h2 className="w-full text-center bg-emerald-700 text-white py-4 font-bold">
        SIGN UP
      </h2>
      <div className="mt-5 flex justify-between w-full container mx-auto">
        <div className="hidden md:flex mx-auto items-center font-bold text-emerald-700">
          WELCOME TO ZENE!!!
        </div>
        <div className="w-full md:w-2/4 text-center">
          <div className="flex items-center justify-center px-3">
            <div className="border-2 border-emerald-700 border-e-0 py-3 px-3 rounded rounded-r-none">
              <FaRegUser className="text-emerald-700" />
            </div>
            <div className="w-full">
              <input
                className="border-emerald-700 border-2 focus:border-none text-emerald-700 rounded rounded-l-none w-full"
                type="text"
                placeholder="Name"
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-3 px-3">
            <div className="border-2 border-emerald-700 border-e-0 py-3 px-3 rounded rounded-r-none">
              <MdOutlineAlternateEmail className="text-emerald-700" />
            </div>
            <div className="w-full">
              <input
                className="w-full border-emerald-700 border-2 focus:border-none text-emerald-700 rounded rounded-l-none"
                type="email"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-3 px-3">
            <div className="border-2 border-emerald-700 border-e-0 py-3 px-3 rounded rounded-r-none">
              <TbLock className="text-emerald-700" />
            </div>
            <div className="w-full">
              <input
                className="w-full border-emerald-700 border-2 focus:border-none text-emerald-700 rounded rounded-l-none"
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-3 px-3">
            <div className="border-2 border-emerald-700 border-e-0 py-3 px-3 rounded rounded-r-none">
              <TbLock className="text-emerald-700" />
            </div>
            <div className="w-full">
              <input
                className="w-full border-emerald-700 border-2 focus:border-none text-emerald-700 rounded rounded-l-none"
                type="password"
                placeholder="Confirm password"
              />
            </div>
          </div>
          <div className="w-full px-3">
            <button className="border-2 py-2 w-full mt-3 bg-emerald-700 text-white hover:bg-transparent hover:text-emerald-700 hover:border-emerald-700 rounded">
              Sign up
            </button>
          </div>
          <div className="w-full px-3">
            <button className="flex items-center justify-center border-2 py-2 w-full mt-3 bg-emerald-700 text-white hover:bg-transparent hover:text-emerald-700 hover:border-emerald-700 rounded">
              <FaGoogle />
              &nbsp; Continue with Google
            </button>
          </div>
          <div>
            <p className="mt-2 text-start px-3">
              Have an account?&nbsp;
              <Link to="/sign-in" className="hover:underline text-emerald-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
