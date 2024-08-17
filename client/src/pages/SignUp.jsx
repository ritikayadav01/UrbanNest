import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiShieldUserFill } from "react-icons/ri";
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate=useNavigate();
  const handleChange = (e) => {
    // everything will be stored in this state (all changes )
    setFormData({
      // keep the old form data : spread operator
      ...formData,
      // whichever is changing change its value
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // this is prevent refreshing the page after the submission
    e.preventDefault();
    try {
      setloading(true);
      // need to put proxy for this in the vite configuration 
      const res = await fetch("/api/auth/signup", {
        // fetch ->used to make a https request ->POST ->submitting  the data 
        method: "POST",
        // request->body in the json format 
        headers: {
          "Content-Type": "application/json",
        },
        // converted into json string 
        body: JSON.stringify(formData),
      });
      // get data from here 
      const data = await res.json();
      if (data.success == false) {
        seterror(data.message);
        setloading(false);
        return;
      }
      // if it is successful then naviagte to the sign in page 
      setloading(false);
      seterror(null);
      navigate("/sign-in");
      // console.log(data);
    } catch (error) {
      seterror(error.message);
    }
  }
    return (
      <div className="p-2 max-w-lg mx-auto my-4 rounded-lg backdrop-blur-xl bg-white/40 ... ">
        <RiShieldUserFill className="text-emerald-950 text-center mx-auto h-16 w-16" />
        <h1 className="text-3xl text-center font-bold my-4 text-emerald-950">
          SIGN UP
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-2 ">
          <input
            type="text"
            placeholder="username"
            className="border p-3 rounded-lg  "
            id="username"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Email"
            className="border p-3 rounded-lg  "
            id="email"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="password"
            className="border p-3 rounded-lg  "
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-900 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <div className="flex gap-2 mt-5 px-3">
          <p>Have an Account? </p>
          <Link to={"/sign-in"}>
            <span className="text-blue-800 font-semibold">Sign In</span>
          </Link>
        </div>
        {/* if found an error then show in a paragraph */}
        {error && <p className="text-red-800 mt-1">{error}</p>}
      </div>
    );
  };

