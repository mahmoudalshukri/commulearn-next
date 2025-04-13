"use client";
import AddFeed from "@/components/AddFeed"; // Assuming you have this component
import MainNavbar from "@/components/MainNavbar";
import Post from "@/components/Post";
import Image from "next/image";
import { useState, useEffect } from "react";
import API from "@/utils/api"; // Assuming your API utility
import { useAuth } from "@/utils/authContext"; // Assuming your Auth Context
import CreatePost from "@/components/CreatePost";

const Page = () => {
  const [posts, setPosts] = useState();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Start loading
      try {
        const response = await API.get("/posts"); // Assuming your API endpoint for fetching posts is "/posts"
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        // Handle error (e.g., show error message to user)
      } finally {
        setLoading(false); // End loading
      }
    };

    const fetchUserData = async () => {
      if (user) {
        try {
          const response = await API.get("/profile/me"); // Assuming your API endpoint for fetching user data is "/profile/me"
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Handle error (e.g., show error message to user)
        }
      }
    };

    fetchPosts();
    fetchUserData();
  }, [user]);

  // Function to handle post creation (you'll need to complete this in AddFeed)
  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Add the new post to the top
  };

  return (
    <div className="">
      <MainNavbar />
      <div className="flex gap-6 bg-gray-200 flex-wrap py-6 px-6 md:px-22 lg:px-42">
        {/* Left */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <div className="bg-white rounded-lg">
            <div>
              <div className="border-b-1 border-gray-300 ">
                <div className="flex flex-col items-center justify-center gap-4 p-4">
                  <div className="w-32 h-32 rounded-full bg-gray-300 relative">
                    {userData?.profilePicture ? (
                      <Image
                        src={userData.profilePicture}
                        alt="profile"
                        width={128}
                        height={128}
                        className="rounded-full"
                        style={{ objectFit: "cover" }} // Ensure image fills the circle
                      />
                    ) : (
                      // Placeholder if no profile picture
                      <div className="w-full h-full rounded-full bg-gray-400" />
                    )}
                  </div>
                  <h1 className="text-[#263b70] text-2xl font-bold text-center">
                    {userData?.firstName} {userData?.lastName}
                  </h1>
                  <p className="text-sm font-semibold text-[#263b70]">
                    {userData?.headline}
                  </p>
                </div>
              </div>
              {/* Rest of the left sidebar content */}
              <div className="border-b-1 border-gray-300 ">
                <div className="p-4 text-[#263b70] flex flex-col gap-2 ">
                  <div className="flex justify-between items-center ">
                    <p>Profile viewers</p>
                    <p>19</p>
                  </div>
                  <p>View all analytics</p>
                </div>
              </div>
              <div className="border-b-1 border-gray-300 ">
                <p className="text-[#263b70] p-4 text-center font-bold">
                  Access exclusive tools & insights <br /> Get hired faster with
                  Premium
                </p>
              </div>
              <div className="border-b-1 border-gray-300 p-4 text-center font-bold flex justify-center items-center">
                <Image
                  src="/BookmarkSimple.png"
                  alt="saved icon"
                  width={22}
                  height={22}
                />
                <p className="text-[#263b70] text-xl">Saved items</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg">
            <div className="p-4">
              <div className="flex flex-col gap-4">
                <p className="text-xl font-semibold text-[#263b70]">Recent</p>
                <div className="flex items-center gap-2">
                  <Image
                    src="/UsersThree.png"
                    alt="people icon"
                    width={20}
                    height={2}
                  />
                  <p className="text-sm text-[#263b70] font-medium">
                    Frontend Developer and Web...
                  </p>
                </div>
                <p className="text-sm text-[#263b70] font-medium">
                  Dream Jobs & Internships: Har...
                </p>
              </div>
              <div className="flex flex-col gap-4 pt-6">
                <p className="text-xl font-semibold text-[#263b70]">Groups</p>
                <div className="flex items-center gap-2">
                  <Image
                    src="/UsersThree.png"
                    alt="people icon"
                    width={20}
                    height={2}
                  />
                  <p className="text-sm text-[#263b70] font-medium">
                    Frontend Developer and Web...
                  </p>
                </div>
                <p className="text-lg text-[#263b70] ">See all</p>
              </div>
            </div>
            <div className="border-b-1 border-gray-300">
              <div className="flex justify-between items-center text-xl font-semibold text-[#263b70] p-4 ">
                <p>Events</p>
                <span>+</span>
              </div>
            </div>
            <p className="text-xl font-semibold text-[#263b70] text-center py-4">
              Discover More
            </p>
          </div>
        </div>
        {/* Middle */}
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <CreatePost onPostCreated={handlePostCreated} />{" "}
          {/* Pass the callback */}
          {loading ? (
            <div>Loading posts...</div> // Or a more sophisticated loading indicator
          ) : (
            posts.map((post) => <Post key={post._id} post={post} />)
          )}
        </div>
        {/* Right */}
        {/* <div className="flex flex-col gap-2 w-full md:w-1/5">
          <div className="bg-white rounded-lg">
            <div className="p-4">
              <h1 className="text-[#263b70] text-center">Add to your feed</h1>
            </div>
            <AddFeed />
            <AddFeed />
            <AddFeed />
            <div className="flex items-center gap-2 p-2">
              <p className="text-[#263b70]">View all recommedations</p>
              <Image src="/ArrowRight.png" alt="arrow" width={16} height={16} />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Page;
