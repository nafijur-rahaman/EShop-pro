import React from "react";

const teamMembers = [
  {
    id: 1,
    name: "Nafisur Rahaman",
    role: "Founder & CEO",
    image: "../images/Nafis.jpg",
    bio: "Visionary leader with 10+ years in e-commerce.",
    linkedin: "https://www.linkedin.com/in/nafijur-rahaman/",
    github: "https://github.com/nafijur-rahaman",
  },
  {
    id: 2,
    name: "Alhanullah Sajib",
    role: "Head of Design",
    image: "../images/Sajib.jpg",
    bio: "Creative mind behind our unique user experiences.",
    linkedin: "https://www.linkedin.com/in/alhanullah-sajib-473078277/",
    github: "https://github.com/Alhanullah",
  },
  {
    id: 3,
    name: "Vasha Quddus",
    role: "Lead Developer",
    image: "../images/Vasha.jpg",
    bio: "Tech enthusiast ensuring our platform runs smoothly.",
    linkedin: "https://www.linkedin.com/in/vasha-quddus-ba5402270/",
    github: "https://github.com/vqsplash",
  },
  {
    id: 4,
    name: "Afrin Khan",
    role: "Marketing Director",
    image: "../images/Afrin_khan.jpg",
    bio: "Connecting our products with the people who need them.",
    linkedin: "https://www.linkedin.com/in/sadia-afrin-khan/",
    github: "https://github.com/afrinKhan16",
  },
  {
    id: 5,
    name: "Shad Mohammad",
    role: "Co-Marketing Director",
    image: "../images/shad.jpg",
    bio: "Connecting our products with the people who need them.",
    linkedin: "https://www.linkedin.com/in/shad-mohammad/",
    github: "https://github.com/petterpan07",
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
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* Header */}
        <div className="text-center space-y-5">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
              Us
            </span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl">
            We are dedicated to bringing you the best products with a seamless
            shopping experience. Quality, speed, and customer satisfaction are
            at our core.
          </p>
        </div>

        {/* Our Story & Stats */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Story Card */}
          <div className="bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Founded in 2020, we started with a simple mission: to make
              high-quality products accessible to everyone. What began as a
              small garage operation has grown into a global community. We
              believe in sustainable sourcing, transparent pricing, and treating
              every customer like family.
            </p>
            <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all">
              Read Full Story
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`bg-white ${stat.color} rounded-3xl p-6 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300`}
              >
                <span className="text-xs md:text-sm px-3 py-1 rounded-full font-medium mb-2">
                  {stat.label}
                </span>
                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-10">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">Meet the Team</h2>
            <p className="text-gray-500 mt-2 text-lg">
              The passionate people behind the brand
            </p>
          </div>

          {/* Centered Team Cards */}
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 p-5 flex flex-col items-center text-center w-64"
              >
                {/* Image */}
                <div className="w-40 h-40 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 ring-4 ring-indigo-200 shadow-lg group relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                </div>

                {/* Content */}
                <h3 className="font-bold text-lg text-gray-900 mt-5">{member.name}</h3>
                <span className="text-indigo-500 font-medium text-sm">{member.role}</span>
                <p className="text-gray-500 text-sm mt-2 line-clamp-3">{member.bio}</p>

                {/* Social Buttons */}
                <div className="flex gap-3 mt-4 w-full">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-gray-300 py-2 rounded-2xl font-semibold hover:bg-gray-50 transition-all text-sm text-gray-600 text-center"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-900 text-white py-2 rounded-2xl font-semibold shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all text-sm text-center"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl shadow-2xl p-12 text-center overflow-hidden">
          <h2 className="text-4xl font-bold text-white">Ready to shop with us?</h2>
          <p className="text-indigo-100 max-w-xl mx-auto mt-4 text-lg">
            Explore our latest collection and experience the quality firsthand.
          </p>
          <button className="mt-6 bg-white text-indigo-600 px-10 py-3 rounded-2xl font-bold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all text-lg">
            Browse Products
          </button>

          {/* Decorative Circles */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-white opacity-10 rounded-full animate-pulse"></div>
        </div>

      </div>
    </div>
  );
}
