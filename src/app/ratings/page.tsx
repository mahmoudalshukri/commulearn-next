import MainNavbar from "@/components/MainNavbar";
import Image from "next/image";

const Reviews = () => {
  return (
    <div className="">
      <MainNavbar />
      <div className="bg-gray-100 p-8 rounded-lg">
        {/* Header */}
        <h2 className="text-3xl font-semibold text-[#1E2A5A]">Reviews</h2>

        {/* Stats */}
        <div className="flex justify-between items-center my-6 bg-white p-6 rounded-lg shadow">
          <div>
            <p className="text-lg text-gray-600">Total Reviews</p>
            <p className="text-2xl font-bold text-[#1E2A5A]">
              15.2K{" "}
              <span className="text-sm bg-gray-300 text-[#1E2A5A] px-2 py-1 rounded">
                18%
              </span>
            </p>
            <p className="text-sm text-gray-400">
              Growth in reviews on the year
            </p>
          </div>
          <div>
            <p className="text-lg text-gray-600">Average Rating</p>
            <p className="text-2xl font-bold text-[#1E2A5A]">3.5 ⭐⭐⭐✨</p>
            <p className="text-sm text-gray-400">Average Rating on the year</p>
          </div>
          <div className="bg-gray-300 px-4 py-2 rounded-lg text-[#1E2A5A] font-semibold">
            March 2024 - April 2025
          </div>
        </div>

        {/* Review List */}
        <div className="bg-white p-6 rounded-lg shadow">
          {/* Single Review */}
          <div className="border-b pb-6 mb-6">
            <div className="flex items-center gap-4">
              <Image
                src="/user1.jpg"
                alt="Sarah Johnson"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <p className="font-bold text-[#1E2A5A]">Sarah Johnson</p>
                <p className="text-sm text-gray-500">
                  Total Spend:{" "}
                  <span className="font-semibold text-[#1E2A5A]">320$</span>
                </p>
                <p className="text-sm text-gray-500">Total Review: 15</p>
              </div>
            </div>
            <p className="text-yellow-500 mt-2">
              ⭐⭐⭐⭐⭐{" "}
              <span className="text-gray-500 text-sm">01-03-2025</span>
            </p>
            <p className="text-gray-700 mt-2">
              I absolutely loved this app! The interface is clean and intuitive,
              and it made managing my day-to-day tasks so much easier. Highly
              recommend it to anyone looking for productivity tools.
            </p>
            <div className="flex gap-4 mt-4">
              <button className="bg-[#1E2A5A] text-white px-4 py-2 rounded">
                Public Comment
              </button>
              <button className="bg-[#1E2A5A] text-white px-4 py-2 rounded">
                Direct Message
              </button>
              <button className="border border-gray-300 p-2 rounded">❤️</button>
            </div>
          </div>
          {/* Single Review */}
          <div className="border-b pb-6 mb-6">
            <div className="flex items-center gap-4">
              <Image
                src="/user1.jpg"
                alt="Sarah Johnson"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <p className="font-bold text-[#1E2A5A]">Sarah Johnson</p>
                <p className="text-sm text-gray-500">
                  Total Spend:{" "}
                  <span className="font-semibold text-[#1E2A5A]">320$</span>
                </p>
                <p className="text-sm text-gray-500">Total Review: 15</p>
              </div>
            </div>
            <p className="text-yellow-500 mt-2">
              ⭐⭐⭐⭐⭐{" "}
              <span className="text-gray-500 text-sm">01-03-2025</span>
            </p>
            <p className="text-gray-700 mt-2">
              I absolutely loved this app! The interface is clean and intuitive,
              and it made managing my day-to-day tasks so much easier. Highly
              recommend it to anyone looking for productivity tools.
            </p>
            <div className="flex gap-4 mt-4">
              <button className="bg-[#1E2A5A] text-white px-4 py-2 rounded">
                Public Comment
              </button>
              <button className="bg-[#1E2A5A] text-white px-4 py-2 rounded">
                Direct Message
              </button>
              <button className="border border-gray-300 p-2 rounded">❤️</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
