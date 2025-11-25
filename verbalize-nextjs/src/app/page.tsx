import dynamicImport from "next/dynamic";
import Footer from "@/components/Home/Footer";
import FAQ from "@/components/Home/FAQ";
import Features from "@/components/Home/Features";
import Hero from "@/components/Home/Hero";
//import Mascot from "@/components/Home/Mascot";

// Dynamic import for Demo component with loading state
const Demo = dynamicImport(() => import("@/components/Home/Demo"), {
  loading: () => (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-pulse text-orange-500">Loading demo...</div>
    </div>
  ),
});

// Force static generation and cache forever
export const dynamic = "force-static";
export const revalidate = false; // Never revalidate - cache forever

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
