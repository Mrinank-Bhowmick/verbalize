"use client";
import { useUser, SignOutButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Mail, User, Calendar, Shield, LogOut } from "lucide-react";
import { Card } from "@/components/ui/card";

const AccountSettings = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      <div className="flex flex-col min-h-full">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-amber-200 to-amber-300 shadow-md rounded-2xl">
          <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Account Settings
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Manage your profile and account preferences
                </p>
              </div>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-12 h-12",
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Profile Card */}
            <Card className="p-6 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start space-x-4">
                {user?.imageUrl && (
                  <Image
                    className="rounded-full ring-4 ring-amber-200 shadow-lg"
                    alt="Profile picture"
                    src={user.imageUrl}
                    width={80}
                    height={80}
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Profile Information
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <User className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-medium">Name:</span>
                      <span className="text-sm">
                        {user?.fullName || "Not provided"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <User className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-medium">Username:</span>
                      <span className="text-sm">
                        {user?.username || "Not set"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact Information Card */}
            <Card className="p-6 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-amber-600" />
                Contact Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Primary Email
                  </p>
                  <p className="text-sm text-gray-900 mt-1">
                    {user?.primaryEmailAddress?.emailAddress || "No email"}
                  </p>
                  {user?.primaryEmailAddress?.verification?.status ===
                    "verified" && (
                    <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Phone Number
                  </p>
                  <p className="text-sm text-gray-900 mt-1">
                    {user?.primaryPhoneNumber?.phoneNumber || "Not provided"}
                  </p>
                </div>
              </div>
            </Card>

            {/* Account Details Card */}
            <Card className="p-6 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-amber-600" />
                Account Details
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">User ID</p>
                  <p className="text-xs text-gray-900 mt-1 font-mono bg-gray-100 p-2 rounded">
                    {user?.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Member Since
                  </p>
                  <p className="text-sm text-gray-900 mt-1">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Last Sign In
                  </p>
                  <p className="text-sm text-gray-900 mt-1">
                    {user?.lastSignInAt
                      ? new Date(user.lastSignInAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "N/A"}
                  </p>
                </div>
              </div>
            </Card>

            {/* Actions Card */}
            <Card className="p-6 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-amber-600" />
                Account Actions
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">
                    Update your profile information, change password, or manage
                    security settings.
                  </p>
                  <button
                    onClick={() => {
                      document
                        .querySelector<HTMLButtonElement>(
                          '[aria-label*="user"], [data-testid="userButton-trigger"]'
                        )
                        ?.click();
                    }}
                    className="w-full px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors font-medium text-sm"
                  >
                    Edit Profile
                  </button>
                </div>
                <div className="p-4 bg-white rounded-lg border border-red-200">
                  <p className="text-sm text-gray-600 mb-3">
                    Sign out of your account on this device.
                  </p>
                  <SignOutButton>
                    <button className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium text-sm flex items-center justify-center">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </SignOutButton>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
