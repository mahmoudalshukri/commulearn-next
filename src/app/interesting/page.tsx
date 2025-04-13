import InterestingNavbar from "@/components/InterestingNavbar";
import Link from "next/link";

const categories = [
  "Technology",
  "Cooking",
  "Design",
  "Life style",
  "Art",
  "Languages",
  "Home",
  "Personal development",
  "Programming",
  "Sport",
  "Cars",
  "Time management",
];
const Page = () => {
  return (
    <div className="relative h-screen">
      <InterestingNavbar />
      <div className="flex flex-col justify-center gap-6 px-8 py-16">
        <h1 className="text-4xl text-[#263B70] font-bold">
          Choose your favorite categories
        </h1>
        <div className="flex gap-6 flex-wrap">
          {categories.map((category, index) => (
            <button
              key={index}
              className="text-[#263b70] font-semibold text-lg border-2 border-[#263b70] rounded-md px-4 py-2">
              {category}
            </button>
          ))}
        </div>
      </div>
      <Link
        href="/feed"
        className=" bg-[#263B70] text-white rounded-md h-[50px] w-[150px] font-bold absolute right-10 bottom-10 flex items-center justify-center">
        Done
      </Link>
    </div>
  );
};

export default Page;
