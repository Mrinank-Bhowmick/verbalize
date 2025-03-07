"use client";
import { useEffect, useState } from "react";
import { FiHome, FiSettings, FiUser } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";
import Link from "next/link";

const Sidebar = () => {
  const [desktop, setDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setDesktop(window.innerWidth > 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { icon: <FiHome size={24} />, label: "Dashboard", href: "/dashboard" },
    { icon: <FiUser size={24} />, label: "Agents", href: "/agents" },
    { icon: <FiSettings size={24} />, label: "Settings", href: "/settings" },
  ];

  return desktop ? (
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
  ) : (
    <div className="fixed top-0 flex-col h-full bg-amber-200 mt-2 ml-2 w-16 rounded-xl">
      <div className="flex justify-center items-center mt-4 mb-8">
        <BsRobot size={40} />
      </div>
      {menuItems.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className="flex items-center justify-center p-4 w-full rounded-lg transition-all duration-200
          hover:bg-amber-300 hover:shadow-md
          active:bg-amber-400 active:scale-95"
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
