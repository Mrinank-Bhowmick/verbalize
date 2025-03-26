"use client";
import { FiHome, FiSettings, FiUser } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";
import Link from "next/link";

const Sidebar = () => {
  const menuItems = [
    { icon: <FiHome size={24} />, label: "Dashboard", href: "/dashboard" },
    { icon: <FiUser size={24} />, label: "Agents", href: "/agents" },
    { icon: <FiSettings size={24} />, label: "Settings", href: "/settings" },
  ];

  return (
    <div
      className="fixed top-0 flex-col h-full bg-amber-200 mt-2 ml-2 rounded-xl transition-all duration-300
                    w-16 md:w-64 p-2 md:p-8"
    >
      {/* Logo/Title area */}
      <div className="hidden md:block font-extrabold text-3xl mb-15">
        Verbalize
      </div>
      <div className="flex md:hidden justify-center items-center mt-4 mb-8">
        <BsRobot size={40} />
      </div>

      {/* Menu items */}
      <div className="flex flex-col items-center md:items-start justify-center gap-5 md:gap-10 font-semibold">
        {menuItems.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            className="flex items-center justify-center md:justify-start gap-3 p-4 w-full rounded-lg transition-all duration-200 
            hover:bg-amber-300 hover:shadow-md 
            active:bg-amber-400 active:scale-95 "
          >
            {item.icon}
            <span className="hidden md:inline">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
