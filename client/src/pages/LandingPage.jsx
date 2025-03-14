import React from 'react';
import { Link } from 'react-router-dom';
const LandingPage = () => {
    return (
        <div className="min-h-screen overflow-hidden bg-gray-50">
            {/* ================================= */}
            {/* Navigation */}
            {/* ================================= */}
            <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                        {/* Inline SVG Logo */}
                        <svg
                            className="w-12 h-12 text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 64 64"
                            fill="currentColor"
                        >
                            <circle cx="32" cy="32" r="32" />
                            <path d="M32 16L20 48h24L32 16z" fill="white" />
                        </svg>
                        <span className="ml-3 text-3xl font-bold text-gray-800">
                            DriveClone
                        </span>
                    </div>
                    <ul className="hidden md:flex space-x-8 text-lg">
                        <li>
                            <a href="#home" className="text-gray-600 hover:text-blue-600 transition duration-300">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#about" className="text-gray-600 hover:text-blue-600 transition duration-300">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#services" className="text-gray-600 hover:text-blue-600 transition duration-300">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition duration-300">
                                Contact
                            </a>
                        </li>
                    </ul>
                    <div className="md:hidden">
                        <button className="text-gray-600 focus:outline-none">
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* ================================= */}
            {/* Hero Section */}
            {/* ================================= */}
            <section
                id="hero"
                className="relative h-screen flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage: "url('/back.jpg')"
                }}

            >
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="relative z-10 text-center px-6">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 animate-slideInDown">
                        Save Your Data to <br /> 
                        Yash and Siddhi Space,
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fadeInUp delay-200">
                        Experience the future of cloud storage with lightning-fast speed, ironclad security, and intuitive design.
                    </p>
                    <Link
                        to="/signup"
                        className="inline-block bg-blue-600 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 animate-bounce"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Decorative Animated Elements */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-blue-300 rounded-full opacity-50 animate-pulse"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-300 rounded-full opacity-50 animate-pulse delay-300"></div>
            </section>
        </div>
    );
};

export default LandingPage;
