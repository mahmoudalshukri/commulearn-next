"use client";
import MainNavbar from "@/components/MainNavbar";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/utils/authContext";
import { useState, useEffect } from "react";
import API from "@/utils/api";
import SuggestedUsers from "@/components/SuggesstedUsers";

const Page = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  console.log(profilePicture);
  console.log(coverPhoto);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const response = await API.get("/profile/me");
          setProfile(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching profile:", error);
          setLoading(false);
        }
      };
      fetchProfile();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
      uploadProfilePicture(e.target.files[0]);
    }
  };

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverPhoto(e.target.files[0]);
      uploadCoverPhoto(e.target.files[0]);
    }
  };

  const uploadProfilePicture = async (file: File) => {
    const formData = new FormData();
    formData.append("profilePicture", file);
    try {
      const response = await API.post(
        "/profile/upload-profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setProfile({ ...profile, profilePicture: response.data.profilePicture });
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const uploadCoverPhoto = async (file: File) => {
    const formData = new FormData();
    formData.append("coverPhoto", file);
    try {
      const response = await API.post("/profile/upload-cover-photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProfile({ ...profile, coverPhoto: response.data.coverPhoto });
    } catch (error) {
      console.error("Error uploading cover photo:", error);
    }
  };

  if (authLoading || loading) {
    return <p>Loading profile...</p>;
  }

  if (!user || !profile) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="min-h-screen">
      <MainNavbar />
      <div className="flex flex-col md:flex-row gap-4 bg-gray-200 py-6 px-6 md:px-22 lg:px-42">
        {/* Left */}
        <div className="flex flex-col gap-4 w-full md:w-2/3">
          {/* Profile */}
          <div className="bg-white rounded-md w-full">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverPhotoChange}
                className="absolute inset-0 opacity-0"
              />
              <Image
                src={profile.coverPhoto || "/profilecover.png"}
                alt="cover"
                className="object-cover rounded-md w-full"
                width={915}
                height={300}
                style={{
                  width: "915px",
                  height: "300px ",
                }}
              />
            </div>

            <div className="relative p-4">
              <div className="w-42 h-42 rounded-full bg-gray-300 absolute left-5 top-[-90px]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="absolute inset-0 opacity-0"
                />
                {profile.profilePicture && (
                  <Image
                    src={profile.profilePicture}
                    alt="profile"
                    width={168}
                    height={168}
                    className="rounded-full"
                  />
                )}
              </div>
              <div className="flex justify-between items-center pt-[60px]">
                <h1 className="text-[#263b70] font-bold text-xl">
                  {profile.firstName} {profile.lastName}
                </h1>
                <Link href="/settings">
                  <Image
                    src="/PencilSimple.png"
                    alt="pen"
                    width={20}
                    height={20}
                  />
                </Link>
              </div>
              <p className="text-[#263b70] py-2 text-sm md:text-base">
                Frontend Developer | Next.js | Crafting Engaging User <br />
                Experiences through Innovative Frontend Solutions
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <p className="text-[#263b70] text-sm font-semibold">
                    {profile.city}, {profile.country}
                  </p>
                  <Link href="" className="text-[#263b70] text-lg font-medium">
                    Contact info
                  </Link>
                </div>
                <p className="text-[#263b70] text-sm font-semibold">
                  University of Palestine
                </p>
              </div>
              <p className="text-[#263b70] text-lg font-bold">
                461 connections
              </p>
              <div className="flex gap-2 items-center pt-4">
                <button className="bg-[#263b70] w-fit h-8 text-white font-semibold text-lg rounded-full px-6">
                  Open to
                </button>
                <button className="text-[#263b70] w-fit h-8 bg-white font-semibold text-lg rounded-full px-6 border-1 border-[#263b70]">
                  Add profile section
                </button>
                <button className="text-[#263b70] w-fit h-8 bg-white font-semibold text-lg rounded-full px-6 border-1 border-[#263b70]">
                  Enhance profile
                </button>
                <button className="text-[#263b70] w-fit h-8 bg-white font-semibold text-lg rounded-full px-6 border-1 border-[#263b70]">
                  Resources
                </button>
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-md w-full">
            <div className="flex flex-col gap-1 p-4">
              <h1 className="text-[#263b70] text-2xl font-bold">Analytics</h1>
              <div className="flex items-center gap-1">
                <Image src="/eyelight.png" alt="eye" width={14} height={14} />
                <p className="text-sm text-[#263b70]">Private to you</p>
              </div>
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex flex-col md:w-1/3">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/People.png"
                      alt="people"
                      width={16}
                      height={16}
                    />
                    <p className="text-[#263b70] text-lg font-semibold">
                      19 Profile views
                    </p>
                  </div>
                  <p className="text-[#263b70] text-sm">
                    Discover who’s viewed your profile.
                  </p>
                </div>
                <div className="flex flex-col md:w-1/3">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/TextAlignLeft.png"
                      alt="TextAlignLeft"
                      width={16}
                      height={16}
                    />
                    <p className="text-[#263b70] text-lg font-semibold">
                      0 Post impressions
                    </p>
                  </div>
                  <p className="text-[#263b70] text-sm">
                    Start a post to increase engagement. Past 7 days
                  </p>
                </div>
                <div className="flex flex-col md:w-1/3">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/search.png"
                      alt="search"
                      width={16}
                      height={16}
                    />
                    <p className="text-[#263b70] text-lg font-semibold">
                      8 Search appearances
                    </p>
                  </div>
                  <p className="text-[#263b70] text-sm">
                    See how often you appear in search results.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center border-t-1 border-gray-300 py-2">
              <p className="text-[#263b70] text-lg font-semibold">
                Show all analytics
              </p>
              <Image
                className="mt-[5px]"
                src="/ArrowRight.png"
                alt="arrow"
                width={22}
                height={22}
              />
            </div>
          </div>

          {/* About */}
          <div className="bg-white rounded-md w-full">
            <div className="flex flex-col gap-1 p-4">
              <h1 className="text-[#263b70] text-2xl font-bold">About</h1>
              <p className="text-[#263b70] font-semibold text-lg">
                I am dedicated to developing web interfaces and programming. I
                am skilled at solving problems through coding and am committed
                to improving my application development skills. I keep up with
                market trends and new technologies, and I am passionate about
                empowering young minds through technology-focused initiatives
                within educational institutions.
              </p>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-md w-full">
            <div className="flex flex-col gap-1 p-4">
              <div className="flex justify-between items-center">
                <h1 className="text-[#263b70] text-2xl font-bold">Education</h1>
              </div>
            </div>
            <div className="flex flex-col gap-1 px-4 pb-2">
              <p className="text-[#263b70] font-semibold text-lg">
                University of Palestine
              </p>
              <p className="text-[#263b70] font-medium text-sm">
                Bachelor of Applied Science - BASc, Software Engineering <br />{" "}
                2019-2024
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-4 w-full md:w-1/4">
          {/* Profile language */}
          <div className="bg-white rounded-md w-full">
            <div className="flex justify-between items-center p-4">
              <h1 className="text-[#263b70] font-bold text-xl">
                Profile language
              </h1>
            </div>
            <div className="flex justify-between items-center p-4 border-b-1 border-gray-300">
              <button className="bg-[#263b70] w-fit h-8 text-white font-semibold text-lg rounded-full px-6">
                العربية
              </button>
              <button className="text-[#263b70] w-fit h-8 bg-white font-semibold text-lg rounded-full px-6 border-1 border-[#263b70]">
                English
              </button>
            </div>
          </div>

          {/* Viewers */}
          <div className="bg-white rounded-md w-full">
            <div className="flex flex-col gap-1 p-4">
              <h2 className="text-[#263b70] text-lg font-bold">
                Your viewers also viewed
              </h2>
              <SuggestedUsers />
            </div>
          </div>

          {/* You may know */}
          <div className="bg-white rounded-md w-full">
            <div className="flex flex-col gap-1 p-4">
              <h2 className="text-[#263b70] text-lg font-bold">
                People you may know
              </h2>
              <p className="text-[#263b70] font-medium">From your job title</p>
              <SuggestedUsers />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
