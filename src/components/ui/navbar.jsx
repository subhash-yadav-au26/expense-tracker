import {
    MenuButton,
    MenuItem,
    MenuItems,
    Menu
} from "@headlessui/react"
import {signOut} from "firebase/auth";
import React, { useEffect, useState } from "react";
import {MdOutlineKeyboardArrowDown } from "react-icons/md";
import {Link, useLocation } from "react-router-dom";
import { auth } from "../../utils/firebaseConfig"
import useStore from "../../store/index"
import ThemeSwitch from "../wrappers/switch";
import { GiExpense } from "react-icons/gi";

const links = [
    {label: "Dashboard", link: "/overview"}, 
    {label: "Transactions", link: "/transactions"}, 
    {label: "Accounts", link: "/account"},
    {label: "Settings", link: "/settings"},
];

const Navbar = () => {
  const [selected, setSelected] = useState(0);
  const {signOut:userLogOut, user} = useStore((state)=>state) 
  const { pathname } = useLocation();
  
  useEffect(()=>{
    const NavIndex = links.findIndex(({link}) => link === pathname)
    setSelected(NavIndex)
  },[])

  const logout = async () => {
    try {
      localStorage.removeItem("user")
      await signOut(auth);      
      userLogOut()
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div className='w-full  flex items-center justify-between py-6'>
      <div className='flex items-center gap-2 cursor-pointer'>
        <div className='w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-red-700 rounded-xl'>
          <GiExpense className='text-white text-3xl hover:animate-spin' />
        </div>
        <span className='text-xl font-bold text-black dark:text-white'>
          Expense Tracker
        </span>
      </div>

      <div className='hidden md:flex items-center gap-4'>
        {links.map((link, index) => (
          <div
            key={index}
            className={`${
              index === selected
                ? "bg-black dark:bg-slate-800 text-white"
                : "text-gray-700 dark:text-gray-500"
            } px-6 py-2 rounded-full`}
            onClick={() => setSelected(index)}
          >
            <Link to={link.link}>{link.label}</Link>
          </div>
        ))}
      </div>

      <div className='flex items-center gap-10 2xl:gap-20'>
        <ThemeSwitch />
        <div className='flex items-center gap-2'>
          <Menu>
            <MenuButton className='flex items-center gap-2'>
            <div className='hidden md:block'>
              <p className='text-lg font-medium text-black dark:text-gray-400'>
                {user?.firstname} {user?.lastname}
              </p>
              <span className='text-sm text-gray-700 dark:text-gray-500'>
              {user?.email}
              </span>
            </div>
              <MdOutlineKeyboardArrowDown className='hidden md:block text-2xl text-gray-600 dark:text-gray-300 cursor-pointer' />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
               className="w-52 origin-top-right rounded-xl border border-white/5 bg-white text-gray-800 dark:bg-white/5 dark:text-gray-300 p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <MenuItem>
                <button  className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 text-gray-800 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10" onClick={logout}>
                  Log out
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
