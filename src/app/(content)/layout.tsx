"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBowlFood } from "react-icons/fa6";

const NavigationBar = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentDate = new Date();
  const formatDate = currentDate.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-green-500 border-b-2 border-green-500">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex flex-col items-start">
            <h1 className="text-2xl font-bold">
              de <span className="text-white">Authentic</span>
            </h1>
            <p className="text-gray-700">{formatDate}</p>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 focus:outline-none"
            >
              <FaBowlFood className="text-white text-3xl" />
            </button>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link href="/" className="font-semibold text-white hover:text-gray-600">
              Home
            </Link>
            <Link href="/about" className="font-semibold text-white hover:text-gray-600">
              About
            </Link>
            <Link
              href="/contact"
              className="font-semibold text-white hover:text-gray-600"
            >
              Contact
            </Link>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-2 border-t-2 border-gray-200">
            <Link href="/" className="block text-gray-600 hover:text-green-600">
              Home
            </Link>
            <Link
              href="/about"
              className="block text-gray-600 hover:text-green-600"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-gray-600 hover:text-green-600"
            >
              Contact
            </Link>
          </div>
        )}
      </nav>
      {children}
    </>
  );
};

export default NavigationBar;
