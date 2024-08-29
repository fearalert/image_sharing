// src/Navbar.tsx
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">MyApp</div>
        <button
          onClick={toggleMenu}
          className="text-white md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <ul
          className={`md:flex md:space-x-6 md:items-center ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-gray-300 hover:text-white rounded-md transition duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-gray-300 hover:text-white rounded-md transition duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-gray-300 hover:text-white rounded-md transition duration-300"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-gray-300 hover:text-white rounded-md transition duration-300"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
