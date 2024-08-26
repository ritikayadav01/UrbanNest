import React from "react";
import { FaSearch } from "react-icons/fa";
import { MdMapsHomeWork } from "react-icons/md";
import { Link,useNavigate } from "react-router-dom";
import {useSelector} from "react-redux"
import { useEffect, useState } from 'react';
export default function Header() {
  const {currentUser}=useSelector(state=>state.user)
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  // we want to keep the search term form the url in the search bar 
 useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);



  return (
    <header className="bg-cyan-950 shadow-lg">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-2">
        <Link to="/">
          <div className="flex items-center gap-2">
            <MdMapsHomeWork className="text-cyan-200 text-3xl sm:text-xl" />
            {/* <img src="house.png" alt="" className="h-10 w-10 p-1" /> */}
            <h1 className="font-bold text-xl sm:text-xl flex flex-wrap ">
              <span className="text-cyan-300"> Urban</span>
              <span className="text-cyan-200">Nest</span>
            </h1>
          </div>
        </Link>

        <form 
        onSubmit={handleSubmit}
        className="bg-sky-50 p-3 rounded-lg flex place-items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
          <FaSearch className="text-indigo-950" />
          </button>
        </form>

        <ul className="flex gap-4 font-bold text-lg p-2">
          <Link to="/">
            <li className="hidden sm:inline text-cyan-100 hover:text-xl slow-text cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-cyan-100 hover:text-xl slow-text cursor-pointer">
              About
            </li>
          </Link>
          <Link to="/profile">
          {currentUser?(
            <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt='profile'/>
          ):(
            <li className=" text-cyan-100 hover:text-xl slow-text cursor-pointer">
              Sign In
            </li>
          )}
          </Link>
          
        </ul>
      </div>
    </header>
  );
}
