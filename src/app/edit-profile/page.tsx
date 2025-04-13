"use client";
import MainNavbar from "@/components/MainNavbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import API from "@/utils/api";
import { useAuth } from "@/utils/authContext";
import { useRouter } from "next/navigation";

const Page = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const response = await API.get("/profile/me");
          const userData = response.data;
          setFirstName(userData.firstName || "");
          setLastName(userData.lastName || "");
          setCountry(userData.country || "");
          setCity(userData.city || "");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await API.put("/profile/update", {
        firstName,
        lastName,
        country,
        city,
      });

      if (response.status === 200) {
        router.push("/profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="">
      <MainNavbar />
      <div className="bg-gray-200 flex items-center justify-center relative pt-6 pb-24 px-4">
        <div className="w-full md:w-[50%] rounded-lg bg-white flex flex-col gap-4 py-6 px-4">
          <h1 className="text-3xl font-bold text-[#263B70] border-b-2 border-gray-300 pb-2">
            Edit Profile
          </h1>
          <div className="flex gap-4 items-center border-b-2 border-gray-300 pb-2">
            <button className="text-[#263B70] font-semibold text-xl">
              Arabic
            </button>
            <button className="text-[#263B70] font-semibold text-xl">
              English
            </button>
          </div>
          <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="fname"
                className="text-[#263B70] font-semibold text-lg">
                First Name
              </label>
              <input
                type="text"
                id="fname"
                className="h-10 rounded-lg border-1 border-gray-300"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="lname"
                className="text-[#263B70] font-semibold text-lg">
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                className="h-10 rounded-lg border-1 border-gray-300"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="additionalName"
                className="text-[#263B70] font-semibold text-lg">
                Additional Name
              </label>
              <input
                type="text"
                id="additionalName"
                className="h-10 rounded-lg border-1 border-gray-300"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="headline"
                className="text-[#263B70] font-semibold text-lg">
                Headline
              </label>
              <input
                type="text"
                id="headline"
                className="h-10 rounded-lg border-1 border-gray-300"
              />
            </div>
            <h1 className="text-2xl font-bold text-[#263B70] ">
              Current position
            </h1>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="position"
                className="text-[#263B70] font-semibold text-lg">
                Position
              </label>
              <input
                type="text"
                id="position"
                className="h-10 rounded-lg border-1 border-gray-300"
              />
              <button className="text-[#263b70] w-fit font-semibold text-sm">
                + Add new position
              </button>
              <div className="flex gap-2 py-4 font-semibold text-sm items-center">
                <input type="checkbox" id="company" className="w-5 h-5" />
                <label htmlFor="company" className="text-[#263b70]">
                  Show current company in my intro
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="industry"
                className="text-[#263B70] font-semibold text-lg">
                Industry
              </label>
              <input
                type="text"
                id="industry"
                className="h-10 rounded-lg border-1 border-gray-300"
              />
              <p className="font-medium text-sm text-[#263b70]">
                Learn more about industry options
              </p>
            </div>
            <h1 className="text-2xl font-bold text-[#263B70] ">Education</h1>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="school"
                className="text-[#263B70] font-semibold text-lg">
                School
              </label>
              <input
                type="text"
                id="school"
                className="h-10 rounded-lg border-1 border-gray-300"
              />
              <button className="text-[#263b70] w-fit font-semibold text-sm">
                + Add new education
              </button>
              <div className="flex gap-2 py-4 font-semibold text-sm items-center">
                <input type="checkbox" id="company" className="w-5 h-5" />
                <label htmlFor="company" className="text-[#263b70]">
                  Show school in my intro
                </label>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#263B70] ">Location</h1>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="country"
                className="text-[#263B70] font-semibold text-lg">
                Country
              </label>
              <input
                type="text"
                id="country"
                className="h-10 rounded-lg border-1 border-gray-300"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="city"
                className="text-[#263B70] font-semibold text-lg">
                City
              </label>
              <input
                type="text"
                id="city"
                className="h-10 rounded-lg border-1 border-gray-300"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <h1 className="text-2xl font-bold text-[#263B70] ">Contact info</h1>
            <p className="font-medium text-sm text-[#263b70]">
              Add or edit your profile URL, email, and more
            </p>
            <button className="text-[#263b70] font-bold textsm w-fit py-2">
              Edit contact info
            </button>
            <h1 className="text-2xl font-semibold text-[#263B70] ">Website</h1>
            <p className="font-medium text-sm text-[#263b70]">
              Add a link that will appear at the top of your profile
            </p>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="link"
                className="text-[#263B70] font-semibold text-lg">
                Link
              </label>
              <input
                type="text"
                id="link"
                className="h-10 rounded-lg border-1 border-gray-300"
              />
            </div>
          </form>
        </div>
        <button
          onClick={handleUpdateProfile}
          type="submit"
          className="cursor-pointer bg-[#263b70] absolute bottom-5 right-50 text-white px-2 py-4 w-32 h-10 flex items-center justify-center text-lg rounded-4xl">
          Save
        </button>
      </div>
    </div>
  );
};

export default Page;
