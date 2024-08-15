import React from "react";
import { FaSearch } from "react-icons/fa";
import { MdMapsHomeWork } from "react-icons/md";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="bg-indigo-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-2">
        <Link to='/'>
        <div className="flex items-center">

        <MdMapsHomeWork className="text-indigo-950 text-3xl" />
        {/* <img src="house.png" alt="" className="h-10 w-10 p-1" /> */}
        <h1 className="font-bold text-xl sm:text-3xl flex flex-wrap ">
          <span className="text-slate-700">  Urban</span>
          <span className="text-indigo-900">Nest</span>
        </h1>
        </div>
        </Link>
        <form className="bg-sky-50 p-3 rounded-lg flex place-items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-indigo-950" />
        </form>
        <ul className="flex gap-4 font-bold text-lg p-2">
            <Link to="/about">
            <li className="hidden sm:inline text-indigo-900 hover:text-xl slow-text cursor-pointer">Home</li>
            </Link>
            <Link to='/about'>
            <li className="hidden sm:inline text-indigo-900 hover:text-xl slow-text cursor-pointer">About</li>
            </Link>
            <Link to='/sign-in'>
            <li className=" text-indigo-900 hover:text-xl slow-text cursor-pointer">Sign In</li> 
            </Link>
        </ul>
      </div>
    </header>
  );
}
