import React from 'react'

export default function About() {
  return (
   
    <div className="py-16 px-8 md:px-16 lg:px-32">
    <div className="max-w-7xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-emerald-950 mb-6">Welcome to UrbanNest!</h1>
      <p className="text-lg text-gray-700  mb-12">
        At UrbanNest, we are passionate about helping you find the perfect home. Whether you’re a first-time buyer, a seasoned investor, or looking to rent, our platform is designed to make your real estate journey seamless, transparent, and enjoyable. With an extensive range of listings and a user-friendly interface, UrbanNest empowers you to explore, discover, and decide with confidence.
      </p>
    </div>

    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      <div className="bg-teal-100  shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-emerald-950 mb-4">Our Mission</h2>
        <p className="text-gray-800">
          <strong>Connecting People with Their Dream Homes</strong> – At UrbanNest, we believe that everyone deserves a place to call home, and our mission is to connect you with properties that best match your needs, lifestyle, and budget.
        </p>
      </div>

      <div className="bg-teal-950 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-emerald-100 mb-4">Our Story</h2>
        <p className="text-gray-400">
          UrbanNest was founded with a simple idea: to make finding a home easier, more efficient, and more enjoyable. Frustrated by the outdated processes of traditional real estate, our founders set out to create a platform that combines innovative technology with a deep understanding of the market.
        </p>
      </div>

      <div className="bg-teal-950 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-emerald-100 mb-4">What We Offer</h2>
        <ul className="text-gray-400 list-disc list-inside space-y-2">
          <li>Extensive Listings for every lifestyle and budget.</li>
          <li>Expert Guidance from experienced real estate professionals.</li>
          <li>Advanced Search Tools to find properties based on your criteria.</li>
          <li>Market Insights to make well-informed decisions.</li>
        </ul>
      </div>

      <div className="bg-teal-100 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-emerald-950 mb-4">Why Choose UrbanNest?</h2>
        <p className="text-gray-800">
          We are your trusted partner in real estate, providing a user-friendly experience, comprehensive support, innovative technology, and a community-focused approach to help you not only find a home but also connect with your new community.
        </p>
      </div>
    </div>

    <div className="mt-16 text-center">
      <h2 className="text-3xl font-bold text-emerald-950 mb-6">Join the UrbanNest Community</h2>
      <p className="text-lg text-gray-600 mb-8">
        We invite you to join the UrbanNest community and start your journey to finding your dream home today. Whether you are looking to buy, sell, or rent, we are here to help you every step of the way. Let’s find your perfect nest together!
      </p>
      <a
        href="/sign-up"
        className="bg-emerald-950 text-white py-3 px-6 rounded-full text-lg hover:bg-emerald-900 transition duration-300"
      >
        Get Started
      </a>
    </div>
  </div>
);
}
