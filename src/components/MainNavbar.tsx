"use client";
import Image from "next/image";
import Link from "next/link";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import { useAuth } from "@/utils/authContext";
import API from "@/utils/api";

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user) {
        try {
          const response = await API.get("/notifications");
          setNotifications(response.data.notifications);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    };

    const fetchFriendRequests = async () => {
      if (user) {
        try {
          const response = await API.get("/friends/friend-requests");
          setFriendRequests(response.data.friendRequests);
        } catch (error) {
          console.error("Error fetching friend requests:", error);
        }
      }
    };

    fetchNotifications();
    fetchFriendRequests();
  }, [user]);

  const handleAccept = async (requestId) => {
    try {
      await API.post(`/friends/accept/${requestId}`);
      // Update the friend requests list
      setFriendRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId),
      );
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await API.post(`/friends/reject/${requestId}`);
      // Update the friend requests list
      setFriendRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId),
      );
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white h-[70px] px-4 border-b-gray-300 border-b-2">
      {/* Logo */}
      <Image src="/logo.png" alt="logo" width={270} height={70} />

      {/* Search Bar - Hidden on small screens */}
      {/* <div className="hidden md:flex items-center gap-2 text-xs rounded-md ring-[1.5px] ring-[#263B70] px-2 h-[40px]">
        <Image src="/search.png" alt="search icon" width={14} height={14} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div> */}

      {/* Desktop Navbar Links */}
      <div className="hidden md:flex gap-8 items-center justify-center font-medium text-lg text-[#263B70]">
        <Link
          href="/feed"
          className="flex flex-col items-center justify-center">
          <Image src="/home.png" width={16} height={16} alt="home icon" />
          Home
        </Link>
        <Link
          href="/services"
          className="flex flex-col items-center justify-center">
          <Image src="/network.png" width={24} height={24} alt="network icon" />
          My Network
        </Link>
        <Link
          href="/contact"
          className="flex flex-col items-center justify-center">
          <Image src="/jobs.png" width={20} height={20} alt="jobs icon" />
          Jobs
        </Link>
        <Link
          href="/chat"
          className="flex flex-col items-center justify-center">
          <Image
            src="/messaging.png"
            width={18}
            height={18}
            alt="messaging icon"
          />
          Messaging
        </Link>
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="flex flex-col items-center justify-center">
            <Image
              src="/notifications.png"
              width={16}
              height={16}
              alt="notifications icon"
            />
            Notifications
          </button>
          {isNotificationsOpen && (
            <div className="absolute top-12 right-0 bg-white border rounded-md shadow-md p-4 w-80">
              <h3 className="text-lg font-semibold mb-2">Notifications</h3>
              {friendRequests.map((request) => (
                <div
                  key={request._id}
                  className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {request.sender && request.sender.profilePicture && (
                      <Image
                        src={request.sender.profilePicture}
                        width={30}
                        height={30}
                        alt="user avatar"
                        className="rounded-full"
                      />
                    )}
                    <span>
                      {request.sender &&
                        `${request.sender.firstName} ${request.sender.lastName}`}{" "}
                      sent you a friend request.
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(request._id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs">
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(request._id)}
                      className="bg-gray-300 px-2 py-1 rounded-md text-xs">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {notification.sender &&
                      notification.sender.profilePicture && (
                        <Image
                          src={notification.sender.profilePicture}
                          width={30}
                          height={30}
                          alt="user avatar"
                          className="rounded-full"
                        />
                      )}
                    <span>
                      {notification.sender &&
                        `${notification.sender.firstName} ${notification.sender.lastName}`}
                      {notification.type === "like" && " liked your post."}
                      {notification.type === "comment" &&
                        " commented on your post."}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Link
          href="/profile"
          className="flex flex-col items-center justify-center">
          <Image src="/me.png" width={18} height={18} alt="profile icon" />
          Me
        </Link>
      </div>

      {/* Hamburger Menu (Mobile) */}
      <button
        className="md:hidden text-[#263B70] text-2xl"
        onClick={toggleMenu}>
        ☰
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:hidden absolute z-50 top-16 left-0 w-full bg-white border-t-2 border-gray-300 flex-col items-center gap-4 py-4`}>
        <Link
          href="/feed"
          className="flex items-center gap-2 text-lg font-medium">
          <Image src="/home.png" width={16} height={16} alt="home icon" />
          Home
        </Link>
        <Link
          href="/services"
          className="flex items-center gap-2 text-lg font-medium">
          <Image src="/network.png" width={24} height={24} alt="network icon" />
          My Network
        </Link>
        <Link
          href="/contact"
          className="flex items-center gap-2 text-lg font-medium">
          <Image src="/jobs.png" width={20} height={20} alt="jobs icon" />
          Jobs
        </Link>
        <Link
          href="/contact"
          className="flex items-center gap-2 text-lg font-medium">
          <Image
            src="/messaging.png"
            width={18}
            height={18}
            alt="messaging icon"
          />
          Messaging
        </Link>
        <Link
          href="/contact"
          className="flex items-center gap-2 text-lg font-medium">
          <Image
            src="/notifications.png"
            width={16}
            height={16}
            alt="notifications icon"
          />
          Notifications
        </Link>
        <Link
          href="/profile"
          className="flex items-center gap-2 text-lg font-medium">
          <Image src="/me.png" width={18} height={18} alt="profile icon" />
          Me
        </Link>
      </div>
    </div>
  );
};

export default MainNavbar;
