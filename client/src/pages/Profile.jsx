import React from "react";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const [file, setfile] = useState(undefined);
  const [fileper, setfileper] = useState(0);
  const [fileUploadError, setfileUploadError] = useState(false);
  // keep the state of the data
  const [formData, setformData] = useState({});
  console.log(file);

  const [updateSuccess, setupdateSuccess] = useState(false)
  // console.log(formData);
  // firebase storage
  // allow read;
  //     allow write:if
  //     request.resource.size <2 *1024 *1024 &&
  //     request.resource.contentType.matches('image/.*')
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    // will show the percentage of the upload
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('upload id '+progress+'% done ');
        setfileper(Math.round(progress));
      },
      (error) => {
        setfileUploadError(true);
      },
      // get the file
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setformData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setupdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }


  };
  const handleDeleteUser=async()=>{
try {
  dispatch(deleteUserStart());
  const res = await fetch(`/api/user/delete/${currentUser._id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (data.success === false) {
    dispatch(deleteUserFailure(data.message));
    return;
  }
  dispatch(deleteUserSuccess(data));
} catch (error) {
  dispatch(deleteUserFailure(error.message))
}
  }

   

  
  return (
    <div className="p-3 max-w-lg mx-auto my-3 rounded-lg backdrop-blur-xl bg-white/40 ...">
      <h1 className="text-3xl font-bold text-teal-950 text-center my-3 ">
        PROFILE
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setfile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover text-teal-950 cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-950 font-bold">
              Error image Upload(image must be less than 2MB
            </span>
          ) : fileper > 0 && fileper < 100 ? (
            <span className="text-slate-900 font-bold">{`Uplaoding ${fileper}%`}</span>
          ) : fileper === 100 ? (
            <span className="text-green-800 font-bold">
              Image Uploaded Successfully!!{" "}
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg "
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg "
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg "
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-900 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          {loading?'Loading...':'update'}
        </button>
      </form>
      <div className="flex justify-between mt-5 ">
        <span onClick={handleDeleteUser} className="text-red-900 font-bold cursor-pointer">
          Delete Account{" "}
        </span>
        <span className="text-blue-900 font-bold cursor-pointer">
          Sign Out{" "}
        </span>
      </div>
      <p className="text-red-950 font-bold">{error?error:""}</p>
      <p className="text-green-950 font-bold">
        {updateSuccess?'User is updated successfully!!':""}
      </p>
    </div>
  );
}
