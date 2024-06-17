import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbLock } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Spinner } from "flowbite-react";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessge, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setErrorMessage("Passwords do not match");
    }
    if (formData.password.length < 6) {
      return setErrorMessage("Password must be at least 6 characters");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setErrorMessage("User already exists");
      }

      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage("An error occurred");
      setLoading(false);
    }
  };
  return (
    <>
      <h2 className="w-full text-center bg-emerald-700 text-white py-4 font-bold">
        SIGN UP
      </h2>
      <div className="mt-5 flex justify-between w-full container mx-auto">
        <div className="hidden md:flex mx-auto items-center font-bold text-emerald-700">
          WELCOME TO ZENE!!! <br />
          You must sign in to see other features
        </div>
        <div className="w-full md:w-2/4 text-center">
          <form onSubmit={handleSubmit}>
            <div className=" px-3">
              <p className="text-start text-emerald-700">Name</p>
              <div className="flex items-center justify-center">
                <div className="border-2 border-emerald-700 border-e-0 py-3 px-3 rounded rounded-r-none">
                  <FaRegUser className="text-emerald-700" />
                </div>
                <div className="w-full">
                  <span></span>
                  <input
                    className="border-emerald-700 border-2 focus:border-none text-emerald-700 rounded rounded-l-none w-full dark:bg-gray-800 dark:text-white"
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className=" mt-3 px-3">
              <p className="text-start text-emerald-700">Email</p>
              <div className="flex items-center justify-center">
                <div className="border-2 border-emerald-700 border-e-0 py-3 px-3 rounded rounded-r-none">
                  <MdOutlineAlternateEmail className="text-emerald-700" />
                </div>
                <div className="w-full">
                  <input
                    className="w-full border-emerald-700 border-2 focus:border-none text-emerald-700 rounded rounded-l-none dark:bg-gray-800 dark:text-white"
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className=" mt-3 px-3">
              <p className="text-start text-emerald-700">
                Password( Minimum 6 characters )
              </p>
              <div className="flex items-center justify-center">
                <div className="border-2 border-emerald-700 border-e-0 py-3 px-3 rounded rounded-r-none">
                  <TbLock className="text-emerald-700" />
                </div>
                <div className="w-full">
                  <input
                    className="w-full border-emerald-700 border-2 focus:border-none text-emerald-700 rounded rounded-l-none dark:bg-gray-800 dark:text-white"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className=" mt-3 px-3">
              <p className="text-start text-emerald-700">Confirm password</p>
              <div className="flex items-center justify-center">
                <div className="border-2 border-emerald-700 border-e-0 py-3 px-3 rounded rounded-r-none">
                  <TbLock className="text-emerald-700" />
                </div>
                <div className="w-full">
                  <input
                    className="w-full border-emerald-700 border-2 focus:border-none text-emerald-700 rounded rounded-l-none dark:bg-gray-800 dark:text-white"
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="w-full px-3">
              <button
                className="border-2 py-2 w-full mt-3 bg-emerald-700 text-white hover:bg-transparent hover:text-emerald-700 hover:border-emerald-700 rounded"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
              <OAuth />
            </div>
            <div className="w-full px-3">
              {/* <button className="flex items-center justify-center border-2 py-2 w-full mt-3 bg-emerald-700 text-white hover:bg-transparent hover:text-emerald-700 hover:border-emerald-700 rounded">
                <FaGoogle />
                &nbsp; Continue with Google
              </button> */}
            </div>
            {errorMessge && (
              <Alert className="mt-3 mx-3" color="failure">
                {errorMessge}
              </Alert>
            )}
            <div>
              <p className="mt-2 text-start px-3">
                Have an account?&nbsp;
                <Link
                  to="/sign-in"
                  className="hover:underline text-emerald-700"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
