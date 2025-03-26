"use client";
import { useUser, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

const AccountSettings = () => {
  const { user } = useUser();

  return (
    <div className="h-full">
      <div className="flex flex-col">
        <div className="flex justify-center items-center">
          <div className="fixed top-6 bg-amber-200/90 transition-all w-4/6 py-2 px-4 rounded-2xl">
            <div className="text-2xl font-bold p-2">Account Settings</div>
          </div>
          <div className="fixed bottom-6 bg-amber-200/90 transition-all w-4/6 py-2 px-4 rounded-2xl">
            <SignOutButton />
          </div>
        </div>
        <div className="flex flex-col items-start w-full px-[10vw] py-[15vh]">
          <div className="font-bold text-2xl md:text-3xl mb-4">
            Profile Details
          </div>
          <div className="text-base md:text-lg border-2 w-full p-8 rounded-2xl bg-amber-200/90 font-semibold">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div>Avatar</div>
                {user && (
                  <Image
                    className="rounded-full"
                    alt=""
                    src={user?.imageUrl}
                    width={100}
                    height={100}
                  />
                )}
              </div>
              <div className="flex justify-between items-center">
                <div>Username</div>
                {user && <div>{user.username}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
