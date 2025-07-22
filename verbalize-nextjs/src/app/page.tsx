"use client";

import Demo from "@/components/Home/Demo";
import Footer from "@/components/Home/Footer";
import FAQ from "@/components/Home/FAQ";
import Features from "@/components/Home/Features";
import Hero from "@/components/Home/Hero";
//import Mascot from "@/components/Home/Mascot";

const page = () => {
  return (
    <>
      <Hero />
      <Features />
      <Demo />
      <FAQ />
      <Footer />
      {/* <Mascot /> */}
    </>
  );
};

export default page;
