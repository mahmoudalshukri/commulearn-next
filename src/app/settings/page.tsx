import SettingsNavbar from "@/components/SettingsNavbar";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className="">
      <SettingsNavbar />
      <div className="flex bg-gray-50 h-screen">
        <div className="w-1/4 bf-white">
          <div className=" bg-white h-screen flex flex-col items-start px-4 py-6 gap-4">
            <div className="flex w-full items-center gap-2">
              <div className="bg-[#263B70] text-white px-4 py-2 text-lg font-medium rounded-full h-10 w-10"></div>
              <p className="text-[#263b70] text-lg font-bold">Settings</p>
            </div>
            <Link
              href=""
              className="flex justify-center items-center gap-4 font-semibold py-2">
              <Image src="/People.png" alt="people" width={16} height={16} />
              Account referrences
            </Link>
            <Link
              href=""
              className="flex justify-center items-center gap-4 font-semibold py-2">
              <Image src="/LockKey.png" alt="people" width={16} height={16} />
              Sign in & security
            </Link>
            <Link
              href=""
              className="flex justify-center items-center gap-4 font-semibold py-2">
              <Image src="/eye.png" alt="people" width={16} height={16} />
              Visibility
            </Link>
            <Link
              href=""
              className="flex justify-center items-center gap-4 font-semibold py-2">
              <Image
                src="/ShieldCheckered.png"
                alt="people"
                width={16}
                height={16}
              />
              Data privacy
            </Link>
            <Link
              href=""
              className="flex justify-center items-center gap-4 font-semibold py-2">
              <Image src="/layout.png" alt="people" width={16} height={16} />
              Advertising data
            </Link>
            <Link
              href=""
              className="flex justify-center items-center gap-4 font-semibold py-2">
              <Image src="/bell.png" alt="people" width={16} height={16} />
              Notifications
            </Link>
          </div>
        </div>
        <div className="w-3/4 flex  justify-center">
          <div className="w-[60%] py-6 flex flex-col gap-4">
            <div className="flex flex-col rounded-lg bg-white ring-1 ring-gray-300  pt-6 pb-4">
              <h1 className="text-[#263b70] px-2 text-2xl font-bold">
                Profile information
              </h1>
              <div className="flex justify-between items-center border-b-1 border-gray-300 py-2">
                <Link
                  href="/edit-profile"
                  className=" text-[#263b70] px-2 font-semibold">
                  Name, location, and industry
                </Link>
                <Image
                  src="/ArrowRight.png"
                  alt="arrow"
                  width={20}
                  height={20}
                  className="mr-4"
                />
              </div>
              <div className="flex justify-between items-center border-b-1 border-gray-300 py-2">
                <p className=" text-[#263b70] px-2 font-semibold">
                  Personal demographic information
                </p>
                <Image
                  src="/ArrowRight.png"
                  alt="arrow"
                  width={20}
                  height={20}
                  className="mr-4"
                />
              </div>
              <div className="flex justify-between items-center  py-2">
                <p className=" text-[#263b70] px-2 font-semibold">
                  Verification
                </p>
                <Image
                  src="/ArrowRight.png"
                  alt="arrow"
                  width={20}
                  height={20}
                  className="mr-4"
                />
              </div>
            </div>
            <div className="flex flex-col rounded-lg bg-white ring-1 ring-gray-300  pt-6 pb-4">
              <h1 className="text-[#263b70] px-2 text-2xl font-bold">
                Display
              </h1>
              <div className="flex justify-between items-center  py-2">
                <p className=" text-[#263b70] px-2 font-semibold">White mode</p>
                <Image
                  src="/ArrowRight.png"
                  alt="arrow"
                  width={20}
                  height={20}
                  className="mr-4"
                />
              </div>
            </div>
            <div className="flex flex-col rounded-lg bg-white ring-1 ring-gray-300  pt-6 pb-4">
              <h1 className="text-[#263b70] px-2 text-2xl font-bold">
                General preferences
              </h1>
              <div className="flex justify-between items-center border-b-1 border-gray-300 py-2">
                <p className=" text-[#263b70] px-2 font-semibold">Language</p>
                <Image
                  src="/ArrowRight.png"
                  alt="arrow"
                  width={20}
                  height={20}
                  className="mr-4"
                />
              </div>
              <div className="flex justify-between items-center border-b-1 border-gray-300 py-2">
                <p className=" text-[#263b70] px-2 font-semibold">
                  Content language
                </p>
                <Image
                  src="/ArrowRight.png"
                  alt="arrow"
                  width={20}
                  height={20}
                  className="mr-4"
                />
              </div>
              <div className="flex justify-between items-center border-b-1 border-gray-300 py-2">
                <p className=" text-[#263b70] px-2 font-semibold">
                  Autoplay videos
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-[#263b70] font-light text-sm">On</p>
                  <Image
                    src="/ArrowRight.png"
                    alt="arrow"
                    width={20}
                    height={20}
                    className="mr-4"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center border-b-1 border-gray-300 py-2">
                <p className=" text-[#263b70] px-2 font-semibold">
                  Sound effects
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-[#263b70] font-light text-sm">On</p>
                  <Image
                    src="/ArrowRight.png"
                    alt="arrow"
                    width={20}
                    height={20}
                    className="mr-4"
                  />
                </div>
              </div>
              <div className="flex justify-between  py-2">
                <p className=" text-[#263b70] px-2 font-semibold">
                  Showing profile photo
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-[#263b70] font-light text-sm">
                    All Commulearn members
                  </p>
                  <Image
                    src="/ArrowRight.png"
                    alt="arrow"
                    width={20}
                    height={20}
                    className="mr-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
