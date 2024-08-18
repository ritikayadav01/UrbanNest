import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart,signInFailure,signInSuccess } from "../redux/user/userSlice";
import { FaCircleUser } from "react-icons/fa6";
import OAuth from "../components/OAuth";
export default function SignIn() {
  const [formData, setFormData] = useState({});
  const dispatch=useDispatch();
  // const [error, seterror] = useState(null);
  // const [loading, setloading] = useState(false);
  // from the global user 
  const {loading,error}=useSelector((state)=>state.user);
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
      // setloading(true);
      dispatch(signInStart());
    
      const res = await fetch("/api/auth/signin", {
    
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }); 
      const data = await res.json();
      if (data.success == false) {
        dispatch(signInFailure(data.message));
        // seterror(data.message);
        // setloading(false);
        return;
      }
      // if it is successful then naviagte to the sign in page 
    dispatch(signInSuccess(data))
      navigate("/");
      // console.log(data);
    } catch (error) {
      // seterror(error.message);
      dispatch(signInFailure(error.message));

    }
  }
    return (
      <div className="p-2 max-w-lg mx-auto my-4 rounded-lg backdrop-blur-xl bg-white/40 ... ">
        <FaCircleUser className="text-emerald-950 text-center mx-auto h-16 w-16" />
        <h1 className="text-3xl text-center font-bold my-4 text-emerald-950">
          SIGN IN
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-2 ">
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
            {loading ? "Loading..." : "Sign In"}
          </button>
          <OAuth/>
        </form>
        <div className="flex gap-2 mt-5 px-3">
          <p>Dont Have an Account? </p>
          <Link to={"/sign-up"}>
            <span className="text-blue-800 font-semibold">Sign Up</span>
          </Link>
        </div>
        {/* if found an error then show in a paragraph */}
        {error && <p className="text-red-800 mt-1">{error}</p>}
      </div>
    );
  };

