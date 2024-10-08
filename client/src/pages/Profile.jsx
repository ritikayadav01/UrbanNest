import React from "react";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setfile] = useState(undefined);
  const [fileper, setfileper] = useState(0);
  const [fileUploadError, setfileUploadError] = useState(false);
  // keep the state of the data
  const [formData, setformData] = useState({});
  console.log(file);
  const [updateSuccess, setupdateSuccess] = useState(false);
  const [showListingError, setshowListingError] = useState(false);
  const [userListings, setuserListings] = useState([]);

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
  const handleDeleteUser = async () => {
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
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }

      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setshowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setshowListingError(true);
        return;
      }
      setuserListings(data);
    } catch (error) {
      setshowListingError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      // update the piece of state
      setuserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-row">
    <div className="flex-1 p-3 max-w-lg mx-auto my-3 rounded-lg backdrop-blur-xl bg-white/40 ...">
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
        <button
          disabled={loading}
          className="bg-slate-900 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "update"}
        </button>
        <Link
          className="bg-green-950 text-teal-50 p-3 rounded-lg uppercase text-center hover:opacity-95"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5 ">
        <span
          onClick={handleDeleteUser}
          className="text-red-900 font-bold cursor-pointer"
        >
          Delete Account{" "}
        </span>
        <span
          onClick={handleSignOut}
          className="text-blue-900 font-bold cursor-pointer"
        >
          Sign Out{" "}
        </span>
      </div>
      <p className="text-red-950 font-bold">{error ? error : ""}</p>
      <p className="text-green-950 font-bold">
        {updateSuccess ? "User is updated successfully!!" : ""}
      </p>





      

      
      <div className="flex-1 justify-center py-4">
        <button
          onClick={handleShowListings}
          className="text-green-50 font-semibold hover:opacity-95 bg-teal-950 w-full  text-center uppercase p-3  rounded-lg"
        >
          Show Lisiting
        </button>
      </div>
      <p className="text-red-950 mt-5">
        {showListingError ? "Error showing Listing" : ""}
      </p>
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl text-green-950 font-bold uppercase">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className=" border-2 rounded-lg flex justify-between p-3 gap-5 items-center"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-18 object-contain rounded-lg "
                />
              </Link>
              <Link
                to={`/listing/${listing._id}`}
                className="text-slate-800 font-bold flex-1 hover:underline truncate"
              >
                <p className="">{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-900 font-bold uppercase"
                >
                  Delete
                </button>

                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-blue-950 font-bold uppercase">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
