"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import API from "@/utils/api"; // Import your Axios instance
import { useRouter } from "next/navigation";

const Page = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await API.post("/auth/login", {
        emailOrPhone,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        // Redirect to feed page or another page
        router.push("/feed"); // Or another route
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
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
          src="/sign-in-img.png"
          alt="sign-in img"
          width={500}
          height={400}
        />
      </div>
      <div className="w-full md:w-[45%] bg-gradient-to-br from-[#D24074] to-[#263B70] flex items-center justify-center">
        <div className="bg-white w-[90%] md:w-[75%] py-6 px-8 rounded-lg flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-[#263B70]">Sign In</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Email or Phone"
              className="h-[58px] border-2 border-[#263B70] rounded-md px-4"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
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
              <p>Forgot Password?</p>
              <div className="flex gap-2 items-center">
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox">Keep me logged in</label>
              </div>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-[#263B70] text-white rounded-md h-[40px]">
              <Image
                src="/sign-in-w.png"
                alt="sign in icon"
                width={24}
                height={24}
              />
              <p>Login</p>
            </button>
          </form>
          <div className="text-[#263B70] font-semibold text-center flex items-center justify-around">
            <div className="h-0.5 w-[45%] bg-[#263B70]"></div>
            <p>Or</p>
            <div className="h-0.5 w-[45%] bg-[#263B70]"></div>
          </div>
          <p className="text-center text-[#263b70]">
            By clicking Continue, you agree to LinkedIn’s User Agreement,
            Privacy Policy, and Cookie Policy.{" "}
          </p>
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
        </div>
      </div>
    </div>
  );
};

export default Page;
