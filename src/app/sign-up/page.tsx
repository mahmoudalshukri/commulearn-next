"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import API from "@/utils/api";
import { useRouter } from "next/navigation";

const Page = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // New state for phone number
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/auth/register", {
        firstName,
        lastName,
        email: email,
        phone: phoneNumber,
        password,
      });

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        router.push("/interesting");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber(""); // Clear phone number field
        setPassword("");
      } else {
        setError(response.data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      <div className="flex flex-col items-center justify-center w-[55%] relative hidden md:flex">
        <Image
          src="/logo.png"
          alt="logo"
          width={270}
          height={70}
          className="absolute left-0 top-0.5"
        />
        <Image
          src="/sign-up-img.png"
          alt="sign-in img"
          width={500}
          height={400}
        />
      </div>
      <div className="w-full md:w-[45%] bg-gradient-to-br from-[#D24074] to-[#263B70] flex items-center justify-center">
        <div className="bg-white w-[90%] md:w-[75%] py-6 px-8 rounded-lg flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-[#263B70]">Sign Up</h1>
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <input
                type="text"
                placeholder="First Name"
                className="h-[58px] border-2 border-[#263B70] rounded-md px-4 w-full md:w-[50%]"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="h-[58px] border-2 border-[#263B70] rounded-md px-4 w-full md:w-[50%]"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="h-[58px] border-2 border-[#263B70] rounded-md px-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="h-[58px] border-2 border-[#263B70] rounded-md px-4"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="h-[58px] border-2 border-[#263B70] rounded-md px-4 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-between items-center text-[#263B70] font-semibold">
              <div className="flex gap-2 items-center">
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox">Remember Me</label>
              </div>
            </div>
            <p className="text-center text-[#263b70]">
              By clicking Continue, you agree to LinkedIn’s User Agreement,
              Privacy Policy, and Cookie Policy.
            </p>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-[#263B70] text-white rounded-md h-[40px]">
              Create account
            </button>
          </form>
          <div className="text-[#263B70] font-semibold text-center flex items-center justify-around">
            <div className="h-0.5 w-[45%] bg-[#263B70]"></div>
            <p>Or</p>
            <div className="h-0.5 w-[45%] bg-[#263B70]"></div>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <Image
              src="/google-icon.png"
              alt="google icon"
              width={16}
              height={16}
            />
            <Image
              src="/four-squers.png"
              alt="four squers icon"
              width={16}
              height={16}
            />
            <Image
              src="/apple-logo.png"
              alt="apple icon"
              width={16}
              height={16}
            />
          </div>
          <div className="flex items-center justify-center gap-1 font-medium text-[#263b70]">
            <p>Already on Commulearn?</p>
            <Link href="/sign-in">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
