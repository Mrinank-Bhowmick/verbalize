"use client";

import Image from "next/image";
import Header from "@/components/Home/Header";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div>
      <Header />
      <div
        className="relative isolate px-4 sm:px-6 lg:px-8 min-h-[85vh] mt-[15vh] flex items-center"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255, 165, 0, 0.4) 1.5px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      >
        {/* Left cursors - responsive positioning */}
        <motion.div
          className="absolute left-8 sm:left-16 md:left-32 bottom-32 sm:bottom-52 hidden sm:block"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Image
            src="/images/cursor.png"
            alt=""
            width={30}
            height={30}
            className="transform scale-x-[-1] sm:w-[40px] sm:h-[40px]"
          />
        </motion.div>
        <motion.div
          className="absolute left-20 sm:left-40 md:left-64 bottom-10 sm:bottom-20 hidden sm:block"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Image
            src="/images/cursor.png"
            alt=""
            width={30}
            height={30}
            className="transform scale-x-[-1] sm:w-[40px] sm:h-[40px]"
          />
        </motion.div>

        {/* Right cursors - responsive positioning */}
        <motion.div
          className="absolute right-8 sm:right-16 md:right-32 bottom-32 sm:bottom-52 hidden sm:block"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Image
            src="/images/cursor.png"
            alt=""
            width={30}
            height={30}
            className="sm:w-[40px] sm:h-[40px]"
          />
        </motion.div>
        <motion.div
          className="absolute right-20 sm:right-40 md:right-64 bottom-10 sm:bottom-20 hidden sm:block"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Image
            src="/images/cursor.png"
            alt=""
            width={30}
            height={30}
            className="sm:w-[40px] sm:h-[40px]"
          />
        </motion.div>

        {/* Background blur - yellow theme */}
        <div className="absolute left-1/2 top-1/3 -z-50 h-[30vh] w-[90vw] sm:w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 opacity-80 blur-[100px]" />

        {/* Main content */}
        <div className="mx-auto max-w-2xl md:py-8 py-8 sm:py-16">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <motion.div
            className="text-center"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold">
              <div className="">AI-Powered Chatbots </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-orange-500 to-yellow-500">
                Ready to Deploy
              </span>{" "}
            </h1>

            <motion.p
              className="mt-4 sm:mt-8 font-semibold text-lg sm:text-xl leading-7 sm:leading-8 text-gray-400 max-w-2xl mx-auto px-2"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Seamless AI Chatbots, Instantly Deployable, Scalable, and Ready to
              Power Your Conversations 🚀
            </motion.p>
            <motion.div
              className="mt-8 sm:mt-10 flex items-center justify-center gap-x-4 sm:gap-x-6"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a
                href="#demo"
                className="group flex h-10 items-center justify-center rounded-md border border-orange-600 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 px-4 text-neutral-50 shadow-[inset_0_1px_0px_0px_#fdba74] active:[box-shadow:none]"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("demo")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="block group-active:[transform:translate3d(0,1px,0)]">
                  Demo
                </span>
              </a>
              <a
                href="#features"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300"
              >
                Learn more <span aria-hidden="true"> → </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
