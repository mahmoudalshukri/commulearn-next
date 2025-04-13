import Image from "next/image";
import Link from "next/link";

const InterestingNavbar = () => {
  return (
    <div className="flex justify-between items-center bg-white h-[70px] pr-16 border-b-gray-300 border-b-2">
      <Image src="/logo.png" alt="logo" width={270} height={70} />
      <div className="flex gap-4 font-medium text-lg text-[#263B70]">
        <Link href="/about-us">About Us</Link>
        <Link href="/services">Services</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <div className="hidden md:flex items-center gap-2 text-xs rounded-md ring-[1.5px] ring-[#263B70] px-2 h-[40px]">
        <Image src="/search.png" alt="search icon" width={14} height={14} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>
      <Link
        href="/settings"
        className="bg-[#263B70] text-white px-4 py-2 text-lg font-medium rounded-full h-12 w-12"></Link>
    </div>
  );
};

export default InterestingNavbar;
