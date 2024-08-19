import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React from "react";
import { useState } from "react";
import { app } from "../firebase";
export default function CreateListing() {
  const [file, setfile] = useState([]);
  const [formData, setformData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setimageUploadError] = useState(false);
const [uploading, setuploading] = useState(false)
  const handleImageSubmit = (e) => {
    // e.preventDefault();
    if (file.length > 0 && file.length + formData.imageUrls.length < 7) {
      setuploading(true)
      setimageUploadError(false)
      const promises = [];
      for (let i = 0; i < file.length; i++) {
        promises.push(storeImage(file[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setformData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setimageUploadError(false);
          setuploading(false)
        })
        .catch((err) => {
          setimageUploadError("Image upload is failed(2MB max per image");
          setuploading(false)
        });
    } else {
      setimageUploadError("You can only upload 6 images per listing");
      setuploading(false)
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            resolve(downloadURL)
          );
        }
      );
    });
  };

  const handleremoveImage=(index)=>{
    setformData({
      ...formData,
      imageUrls:formData.imageUrls.filter((_,i)=>i!==index),
    })
  }
  return (
    <main className="rounded-xl my-3 p-5 max-w-4xl mx-auto backdrop-blur-xl bg-white/30 ... ">
      <h1 className="text-3xl font-bold text-center text-green-950 my-3">
        CREATE LISTING
      </h1>
      <form className="flex flex-col sm:flex-row gap-4 ">
        <div className="flex flex-col gap-2 flex-1 ">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="63"
            minLength="10"
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />

          <div className="flex gap-6 flex-wrap font-bold">
            <div className="flex gap-2 ">
              <input type="checkbox" id="sale" className="w-5 " />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5 " />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5 " />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5 " />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5 " />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 font-bold">
            <div className="flex items-center  gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-400 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center  gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-400 rounded-lg"
              />
              <p>Bath</p>
            </div>
            <div className="flex items-center  gap-2">
              <input
                type="number"
                id="regularprice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-400 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($ /Month)</span>
              </div>
            </div>
            <div className="flex items-center  gap-2">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-400 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">($ /Month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-5">
          <p className="font-bold text-lg flex flex-col p-2">
            <span className="text-2xl">Upload Images</span>
            <span className="font-medium text-gray-700 ">
              The first image will be the cover(max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setfile(e.target.files)}
              className="p-3 border-2 border-gray-300 rounded w-full font-medium"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              disabled={uploading}
              className="p-4 bg-teal-950 font-semibold text-green-50 border border-green-900 rounded uppercase hover:shadow-lg 
            hover:opacity-90 disabled:opacity-80"
            >
              {uploading?"Uploading...":"UPLOAD"}
            </button>
          </div>
          <p className="text-red-950 font-semibold">{imageUploadError && imageUploadError}</p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url,index) => (
              <div key={url} className="flex justify-between p-3 border-2 border-gray-300 items-center">
                <img
                  src={url}
                  alt="listing image"
                  className="w-30 h-20 object-contain rounded-lg"
                />
                <button type="button" onClick={()=>handleremoveImage(index)} className="text-red-100 bg-red-950 font-medium p-3 rounded-lg uppercase hover:opacity-75">
                  Delete
                </button>
              </div>
            ))}
          <button className="p-3 font-semibold bg-slate-900 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
