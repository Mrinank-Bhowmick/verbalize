"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Verbalize"
            width={30}
            height={30}
          />
          <p className="text-lg font-semibold text-white">Verbalize</p>
        </div>
        <div className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Verbalize. All rights reserved.
        </div>
        <div className="flex gap-4">
          <Link
            href="https://github.com/Mrinank-Bhowmick/verbalize"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
            aria-label="GitHub repository"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
