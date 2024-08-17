import React from "react";
import { Link } from "react-router-dom";
import { RiShieldUserFill } from "react-icons/ri";
export default function SignOut() {
  return (
    <div className="p-2 max-w-lg mx-auto my-4 rounded-lg backdrop-blur-xl bg-white/30 ... ">
      <RiShieldUserFill className="text-emerald-950 text-center mx-auto h-16 w-16"  />
      <h1 className="text-3xl text-center font-bold my-4 text-emerald-950">SIGN UP</h1>
      <form className="flex flex-col gap-4 p-3 ">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg  "
          id="username"
        />
        <input
          type="text"
          placeholder="Email"
          className="border p-3 rounded-lg  "
          id="email"
        />
        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-lg  "
          id="password"
        />
        <button className="bg-slate-900 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5 px-3">
        <p>Have an Account? </p>
        <Link to={"/sign-in"}>
          <span className="text-blue-800 font-semibold">Sign In</span>
        </Link>
      </div>
    </div>
  );
}
