import React, { useEffect, useState } from "react";
import Link from "next/link";

import { SearchIcon, BellIcon } from "@heroicons/react/solid";
import useAuth from "../hooks/useAuth";

function Header() {
  const { logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${isScrolled && "bg-black"}`}>
      <div className="flex items-center space-x-2 md:space-x-10 ">
        <img
          src="https://rb.gy/ulxxee"
          alt="#"
          width={120}
          height={120}
          className="cursor-pointer object-contain"
        />

        <ul className="hidden md:flex space-x-4">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden sm:inline h-6 w-6" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        <Link onClick={logout} href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt="#"
            className="cursor-pointer object-contain"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
