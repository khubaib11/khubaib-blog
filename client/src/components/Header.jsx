import React from "react";
import { Navbar, Button } from "flowbite-react";
import { Link,useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

export default function Header() {
  
  const path=useLocation().pathname;
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Khubaib's
        </span>
        Blog
      </Link>

      <form className="relative hidden lg:block">
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
          <AiOutlineSearch />
        </span>
      </form>

      <Button className="w-12 h-10 lg:hidden" color="gray" pill >
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color='gray' pill>
          <FaMoon></FaMoon>
        </Button>
        <Link to='/sign-in'>
          <Button  gradientDuoTone='purpleToBlue' pill>
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle/>
     
      </div>
      <Navbar.Collapse>
          <Navbar.Link  active={path==='/'} as={'div'}>
            <Link to='/'>
              Home
            </Link>
          </Navbar.Link >
            
          <Navbar.Link active={path==='/about'} as={'div'}>
            <Link to='/about'>
              About
            </Link>
          </Navbar.Link >
          <Navbar.Link active={path==='/projects'} as={'div'}>
            <Link to='/projects'>
              Projects
            </Link>
          </Navbar.Link >
        </Navbar.Collapse>

    </Navbar>
  );
}
