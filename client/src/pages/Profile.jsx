import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser}=useSelector((state)=>state.user)
  return (
    <div className='p-3 max-w-lg mx-auto my-3 rounded-lg backdrop-blur-xl bg-white/40 ...'>
      <h1 className='text-3xl font-bold text-teal-950 text-center my-3 '>PROFILE</h1>

      <form className='flex flex-col gap-4' >
        <img src={currentUser.avatar}alt='' className='rounded-full h-24 w-24 object-cover text-teal-950 cursor-pointer self-center mt-2'/>
        <input type="text" placeholder='username' id='username' className='border p-3 rounded-lg ' />
        <input type="text" placeholder='email' id='email' className='border p-3 rounded-lg ' />
        <input type="text" placeholder='password' id='password' className='border p-3 rounded-lg ' />
        <button className='bg-slate-900 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5 '>
        <span className='text-red-900 font-bold cursor-pointer'>Delete Account </span>
        <span className='text-blue-900 font-bold cursor-pointer'>Sign Out </span>

      </div>
    </div>
  )
}
