"use client";
import { useState } from "react";
import { FiMenu, FiHome, FiSettings, FiUser, FiBookmark } from "react-icons/fi";
import Link from "next/link";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    { icon: <FiHome size={24} />, label: "Dashboard", href: "/dashboard" },
    { icon: <FiUser size={24} />, label: "Agents", href: "/agents" },
    { icon: <FiSettings size={24} />, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="fixed top-0 flex-col h-full bg-amber-200 mt-2 ml-2 w-64 p-8 rounded-xl">
      <div className="font-extrabold text-3xl mb-15">Verbalize</div>
      <div className="flex flex-col items-start justify-center gap-10">
        {menuItems.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            className="flex items-center justify-start gap-3 p-4 w-full rounded-lg transition-all duration-200 
            hover:bg-amber-300 hover:shadow-md 
            active:bg-amber-400 active:scale-95"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
