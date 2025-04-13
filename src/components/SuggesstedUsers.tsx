"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import API from "@/utils/api";
import { useAuth } from "@/utils/authContext";

const SuggestedUsers = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingRequests, setPendingRequests] = useState(new Set()); // Track pending requests
  const [friends, setFriends] = useState(new Set()); // Track user's friends
  const { user } = useAuth();

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const [usersResponse, friendsResponse] = await Promise.all([
          API.get("/users/all"),
          API.get("/friends/list"), // Fetch the user's friends list
        ]);

        const filteredUsers = usersResponse.data.filter(
          (u) => u._id !== user?.userId,
        );
        const randomUsers = filteredUsers
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        setSuggestedUsers(randomUsers);

        // Convert friends list into a Set for quick lookup
        const friendIds = new Set(
          friendsResponse.data.friends.map((f) => f._id),
        );
        setFriends(friendIds);
      } catch (error) {
        console.error("Error fetching suggested users or friends list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedUsers();
  }, [user]);

  const handleAddFriend = async (friendId) => {
    try {
      await API.post(`/friends/request/${friendId}`);
      setPendingRequests((prevRequests) => new Set(prevRequests.add(friendId)));
      console.log("Friend request sent!");
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  if (loading) {
    return <div>Loading suggested users...</div>;
  }

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="p-4">
        <h1 className="text-[#263b70] text-center">Add to your feed</h1>
      </div>
      {suggestedUsers.map((suggestedUser) => {
        const isPending = pendingRequests.has(suggestedUser._id);
        const isFriend = friends.has(suggestedUser._id); // Check if user is already a friend

        return (
          <div
            key={suggestedUser._id}
            className="p-4 flex flex-col gap-3 border-b-2 border-gray-300">
            <div className="flex gap-2">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                {suggestedUser.profilePicture && (
                  <Image
                    src={suggestedUser.profilePicture}
                    alt="profile"
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-[#263b70] text-lg font-bold">
                  {suggestedUser.firstName} {suggestedUser.lastName}
                </h2>
                <p className="text-[#263b70] font-medium">
                  {suggestedUser.headline}
                </p>
                <button
                  onClick={() => handleAddFriend(suggestedUser._id)}
                  className={`h-8 text-white font-semibold text-lg rounded-full px-8 w-42 ${
                    isPending || isFriend
                      ? "bg-gray-400 cursor-not-allowed" // Disable button if already a friend or pending
                      : "bg-[#263b70]"
                  }`}
                  disabled={isPending || isFriend}>
                  {isFriend
                    ? "Already a Friend"
                    : isPending
                    ? "Pending"
                    : "+ Follow"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestedUsers;
