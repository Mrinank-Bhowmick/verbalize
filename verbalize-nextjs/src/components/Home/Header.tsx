"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  { name: "Demo", href: "#demo" },
  { name: "Features", href: "#features" },
  { name: "FAQ", href: "#faq" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md">
      <div className="mx-auto flex items-center justify-between px-8 py-4">
        <div className="flex items-center space-x-2">
          <Image
            src="/images/logo.png"
            alt="Verbalize Logo"
            width={50}
            height={40}
            className="h-10 w-8"
          />
          <p className="text-base text-white">
            <span className="font-bold">Verbalize</span>
          </p>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8 text-white">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a href={item.href} className="text-sm font-semibold">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:block">
          <button className="group flex h-10 items-center justify-center rounded-md border border-orange-600 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 px-4 text-neutral-50 shadow-[inset_0_1px_0px_0px_#fdba74] active:[box-shadow:none]">
            <Link href="/sign-in">Login</Link>
          </button>
        </div>
        <div className="lg:hidden flex flex-row justify-center gap-2">
          <Link
            href="/sign-in"
            className="group flex h-10 items-center justify-center rounded-md border border-orange-600 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 px-4 text-neutral-50 shadow-[inset_0_1px_0px_0px_#fdba74] active:[box-shadow:none]"
          >
            <span className="block group-active:[transform:translate3d(0,1px,0)]">
              Login
            </span>
          </Link>
          <Menu onClick={toggleMenu} className="size-6 cursor-pointer mt-2" />
        </div>

        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black/5 dark:bg-gradient-to-b dark:from-neutral-800 dark:to-gray-800 dark:ring-gray-700/5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <svg
                      width="40"
                      height="30"
                      viewBox="0 0 40 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M39.9993 21.0964C40.0255 23.5467 39.2684 25.961 37.8848 27.6365C37.4671 28.141 37.0103 28.5554 36.5143 28.8977C36.2271 29.0779 35.9269 29.24 35.6267 29.3661L35.5614 29.4022C34.8304 29.7085 34.0864 29.8346 33.3424 29.7805C32.2068 29.7085 31.1104 29.168 30.1575 28.3032L29.8965 28.0689L29.8182 27.9969L29.531 27.7446C29.518 27.7446 29.518 27.7266 29.518 27.7266C29.3613 27.5825 29.2177 27.4023 29.0742 27.2402L28.8784 26.9699C28.552 26.5375 28.2518 26.0871 27.9647 25.6186L25.9545 22.3396C25.7196 23.6368 25.315 24.898 24.7276 26.015C24.4926 26.4474 24.2446 26.8438 23.9705 27.2402L23.84 27.4023L23.6311 27.6545C22.861 28.5914 21.9473 29.2761 20.9684 29.6544L20.9031 29.6724C19.7545 30.1228 18.5275 30.1048 17.3789 29.6364C16.1258 29.1139 15.0032 28.0869 14.1809 26.6636L14.1287 26.5735L14.1026 26.5375C12.8756 24.4115 12.4449 21.6009 12.9409 18.9705C12.954 18.9164 12.967 18.8443 12.9801 18.7903C13.1889 17.8354 13.5022 16.9165 13.9329 16.1058L16.1388 11.9079L18.0446 15.0428L16.2563 18.4299C16.0344 18.8804 15.8517 19.3668 15.7473 19.8893C15.4993 21.1325 15.6298 22.4477 16.0997 23.5467C16.0997 23.5647 16.1127 23.5647 16.1127 23.5827C16.7262 25.1142 17.901 26.1411 19.2585 26.1411C20.3288 26.1411 21.2947 25.5105 21.9473 24.4836L21.9734 24.4476C22.3128 23.9611 22.5869 23.4206 22.7958 22.8441C23.4223 21.1325 23.4876 19.0966 22.9655 17.3309C22.861 16.9886 22.7436 16.6463 22.5869 16.322C22.4564 16.0337 22.3128 15.7635 22.1431 15.4932L20.5376 12.9348L18.7233 9.94404L18.0054 8.77294L18.0184 8.73691L16.7915 6.683C16.6348 6.41274 16.4652 6.17853 16.2824 5.94431C15.9822 5.56595 15.6559 5.25967 15.2904 4.98942C14.1679 4.17866 12.8495 3.98048 11.6356 4.46693C11.5312 4.50296 11.4398 4.539 11.3354 4.59305C10.3303 5.0795 9.45581 5.99836 8.85538 7.20548L6.59725 11.7637L3.72564 17.7813C3.68648 17.8534 3.67342 17.9075 3.64732 17.9795C3.16437 18.8263 2.8772 19.8893 2.8772 21.0424C2.8772 23.7809 4.4827 25.997 6.45367 26.015C7.772 26.015 8.92065 25.0421 9.54718 23.5827L10.3042 22.1414C10.239 22.4477 10.2129 22.826 10.2129 23.2404V23.5287C10.2129 25.0962 10.5914 26.5015 11.1527 27.3483L9.49497 28.9878C7.9939 30.0508 6.06209 30.303 4.44354 29.6184L4.37828 29.5823C3.5429 29.24 2.77278 28.6455 2.12014 27.8527C0.279699 25.6547 -0.438205 22.1774 0.266646 18.9705L0.449385 18.1597C0.645177 17.2589 0.932338 16.394 1.31087 15.6013L4.19554 9.5837L6.47978 4.98942C7.276 3.36791 8.38548 2.08871 9.66466 1.25994C9.89961 1.11581 10.1346 0.971671 10.3695 0.86357C11.1527 0.485218 11.975 0.269016 12.7973 0.250999C14.1157 0.196949 15.4209 0.611335 16.6087 1.47614C17.5224 2.14276 18.3448 3.06162 18.9974 4.16064L19.7153 5.36777L20.9292 7.42168L21.7124 8.75493L22.3389 9.7999L22.6 10.2143L25.067 14.3401L27.4034 18.2498L27.6906 18.7362L28.043 19.3128L29.7268 22.1414C29.9879 22.5738 30.2489 23.0242 30.4969 23.4746C31.2148 24.7899 32.2199 25.7628 33.486 25.7628C35.3917 25.7628 36.9842 23.6548 37.0755 21.0244C37.1016 20.0875 36.945 19.1867 36.6317 18.4299C36.5404 18.1237 36.4229 17.8354 36.2793 17.5471L35.5353 15.9977L33.6818 12.088L33.4207 11.5295L31.1626 6.95325C30.5622 5.74612 29.6876 4.82727 28.6826 4.34081C27.3903 3.71022 25.9415 3.85436 24.7406 4.73718C24.4013 4.98942 24.088 5.27769 23.7878 5.63802L21.9343 2.6112C22.3781 2.08871 22.861 1.62028 23.3831 1.24192C25.3019 -0.163387 27.5861 -0.379589 29.6224 0.611335C31.2018 1.36804 32.5723 2.8274 33.5121 4.73718L35.7963 9.33146L38.681 15.3851C38.8899 15.8355 39.0857 16.304 39.2423 16.8084C39.3598 17.1868 39.4642 17.5651 39.5425 17.9435L39.7252 18.7542C39.908 19.529 39.9863 20.3217 39.9993 21.0964Z"
                        fill="#FE6019"
                      />
                    </svg>

                    <span className="font-bold">Verbalize</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:text-white hover:dark:bg-white/10"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="size-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold "
                      >
                        <span className="ml-3 text-base font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
