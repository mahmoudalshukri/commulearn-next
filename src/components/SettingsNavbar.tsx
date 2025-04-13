import Image from "next/image";

const SettingsNavbar = () => {
  return (
    <div className="flex justify-between items-center bg-white h-[70px] pr-16 border-b-2 border-gray-300 ">
      <Image src="/logo.png" alt="logo" width={270} height={70} />
      <div className="bg-[#263B70] text-white px-4 py-2 text-lg font-medium rounded-full h-12 w-12"></div>
    </div>
  );
};

export default SettingsNavbar;
