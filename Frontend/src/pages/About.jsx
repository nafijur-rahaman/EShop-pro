import React from "react";

const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Visionary leader with 10+ years in e-commerce.",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1573496359-136d4755f324?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Creative mind behind our unique user experiences.",
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Tech enthusiast ensuring our platform runs smoothly.",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Connecting our products with the people who need them.",
  },
];

const stats = [
  { label: "Happy Customers", value: "10k+", color: "bg-green-100 text-green-800" },
  { label: "Products Sold", value: "50k+", color: "bg-blue-100 text-blue-800" },
  { label: "Years Experience", value: "5+", color: "bg-yellow-100 text-yellow-800" },
  { label: "Team Members", value: "20+", color: "bg-purple-100 text-purple-800" },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Us</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            We are dedicated to bringing you the best products with a seamless shopping experience. 
            Quality, speed, and customer satisfaction are at our core.
          </p>
        </div>

        {/* Our Story & Stats Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* Story Card - Matches ProductCard container style */}
          <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Founded in 2020, we started with a simple mission: to make high-quality products accessible to everyone. 
              What began as a small garage operation has grown into a global community. 
              We believe in sustainable sourcing, transparent pricing, and treating every customer like family.
            </p>
            <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all">
              Read Full Story
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center justify-center hover:-translate-y-1 transition-all duration-300"
              >
                <span className={`text-xs md:text-sm px-3 py-1 rounded-full font-medium mb-2 ${stat.color}`}>
                  {stat.label}
                </span>
                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Meet the Team</h2>
            <p className="text-gray-500 mt-2">The passionate people behind the brand</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              // Team Card - Closely replicates the ProductCard structure
              <div 
                key={member.id} 
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 p-5 flex flex-col items-center text-center"
              >
                {/* Image Container */}
                <div className="w-full h-48 rounded-2xl overflow-hidden flex items-center justify-center bg-gray-100 group relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </div>

                {/* Content */}
                <h3 className="font-bold text-lg text-gray-900 mt-4">{member.name}</h3>
                <span className="text-sm text-indigo-500 font-medium">{member.role}</span>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {member.bio}
                </p>

                {/* Action Buttons (Socials) */}
                <div className="flex gap-3 mt-4 w-full">
                  <button className="flex-1 border border-gray-300 py-2 rounded-2xl font-semibold hover:bg-gray-50 transition-all text-sm text-gray-600">
                    LinkedIn
                  </button>
                  <button className="flex-1 bg-gray-900 text-white py-2 rounded-2xl font-semibold shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all text-sm">
                    Twitter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-3xl shadow-lg p-10 text-center space-y-6 relative overflow-hidden">
           {/* Decorative gradient blob */}
           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
           
           <h2 className="text-3xl font-bold text-gray-900">Ready to shop with us?</h2>
           <p className="text-gray-500 max-w-xl mx-auto">
             Explore our latest collection and experience the quality firsthand.
           </p>
           <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all text-lg">
             Browse Products
           </button>
        </div>

      </div>
    </div>
  );
}