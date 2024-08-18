import React from "react";

export default function CreateListing() {
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
          <span className="text-2xl">
            Upload Images
            </span> 
            <span className="font-medium text-gray-700 ">
            The first image will be the cover(max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border-2 border-gray-300 rounded w-full font-medium"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-4 bg-teal-950 font-semibold text-green-50 border border-green-900 rounded uppercase hover:shadow-lg 
            hover:opacity-90 disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 font-semibold bg-slate-900 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
