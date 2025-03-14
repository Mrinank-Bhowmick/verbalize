"use client";
import { SignUp } from "@clerk/nextjs";
export default function Page() {
  return (
    <div className="flex justify-center items-center mt-12">
      <SignUp
        fallbackRedirectUrl={"/dashboard"}
        signInFallbackRedirectUrl={"/dashboard"}
        signInUrl="/sign-in"
      />
    </div>
  );
}
