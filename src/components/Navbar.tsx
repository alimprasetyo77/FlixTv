"use client";
import { CookieValueTypes, getCookie } from "cookies-next";

import { LucideLogIn, Moon, SearchIcon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ModalBoxProfile from "./ModalBoxProfile";

const Navbar = () => {
  const [sessionId, _] = useState<CookieValueTypes>(getCookie("sessionID"));
  const [isActive, setIsActive] = useState(false);
  const { setTheme, theme } = useTheme();
  function handleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  return (
    <header className="w-full bg-primary sticky z-50 shadow-2xl">
      <nav className="container flex items-center justify-between  text-sm text-[#e0e0e0] font-medium h-[100px] ">
        <Link href={"/"}>
          <Image
            src={"https://flixtv.volkovdesign.com/main/img/logo.svg"}
            alt="img-logo"
            width={80}
            height={30}
          />
        </Link>
        {/* <ul className="flex items-center gap-x-10 ">
          <Link href={"/"}>
            <li className="cursor-pointer hover:text-font duration-200 ease-in">
              Home
            </li>
          </Link>
          <li className="cursor-pointer hover:text-font duration-200 ease-in">
            About us
          </li>
        </ul> */}
        <div className="flex items-center gap-x-8">
          <div className="flex items-center relative bg-[#151f30] shadow-lg px-10 py-2 rounded-2xl">
            <input
              type="text"
              className="bg-[#151f30] outline-none"
              placeholder="I'm looking for..."
            />
            <SearchIcon className="text-font absolute right-2 cursor-pointer  w-5 h-5" />
          </div>
          {sessionId ? (
            <div className="relative">
              <div
                className="bg-black/20 inset-0 fixed"
                hidden={!isActive}
                onClick={() => setIsActive(false)}></div>
              <div className="cursor-pointer" onClick={() => setIsActive(!isActive)}>
                Profile
              </div>
              {isActive && <ModalBoxProfile close={() => setIsActive(false)} />}
            </div>
          ) : (
            <Link
              href={"/login"}
              className="flex items-center gap-x-2 hover:text-font duration-200 ease-in">
              Sign in
              <LucideLogIn className="text-font rotate-180 w-5 h-5" />
            </Link>
          )}
          <button onClick={() => handleTheme()}>{theme === "dark" ? <Sun /> : <Moon />}</button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
