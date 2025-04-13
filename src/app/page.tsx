import PublicNavbar from "@/components/PublicNavbar";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col">
      <PublicNavbar />
      <div className="text-white text-center bg-[url(/welcome-img.png)] bg-cover w-full h-screen flex items-center justify-center md:justify-start">
        <div className="flex flex-col gap-4 px-8 py-4 md:px-32 md:py-6">
          <h1 className="font-extrabold text-4xl md:text-5xl">
            Welcome to Commulearn
          </h1>
          <p className="text-2xl font-bold md:text-3xl">
            Your Gateway to Learning <br /> and Connection
          </p>
          <div className="flex flex-col gap-4 justify-center items-center md:items-start">
            <button className="bg-white text-[#263B70] h-[40px] rounded-md flex justify-center w-[80%] md:w-[380px]">
              <Link
                href=""
                className="flex items-center gap-4 text-lg font-semibold">
                <Image
                  src="/google-icon.png"
                  alt="google icon"
                  width={16}
                  height={16}
                />
                Continue with Google
              </Link>
            </button>
            <button className="bg-white text-[#263B70] h-[40px] rounded-md flex justify-center w-[80%] md:w-[380px]">
              <Link
                href="/sign-in"
                className="flex items-center gap-4 text-lg font-semibold">
                <Image
                  src="/sign-in.png"
                  alt="sign in icon"
                  width={16}
                  height={16}
                />
                Sign In
              </Link>
            </button>
            <button className="bg-white text-[#263B70] h-[40px] rounded-md flex justify-center w-[80%] md:w-[380px]">
              <Link
                href="/sign-up"
                className="flex items-center gap-4 text-lg font-semibold">
                <Image
                  src="/sign-up.png"
                  alt="sign up icon"
                  width={16}
                  height={16}
                />
                Sign Up
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
