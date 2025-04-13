"use client";
import { useState, useEffect } from "react";
import MainNavbar from "@/components/MainNavbar";
import API from "@/utils/api";
import { useAuth } from "@/utils/authContext";
import Image from "next/image";
import io from "socket.io-client";

const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000",
);

const MessagingPage = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    socket.emit("user_connected", user?.userId);

    socket.on("receive_message", (messageData) => {
      if (
        selectedChat &&
        messageData.senderId ===
          selectedChat.participants.find((id) => id !== user.userId)
      ) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...messageData, sender: { _id: messageData.senderId } },
        ]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [selectedChat, user]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await API.get("/friends/friends");
        const friendIds = response.data.friends;

        const friendsData = await Promise.all(
          friendIds.map(async (friendId) => {
            const userResponse = await API.get(`/users/${friendId}`);
            return userResponse.data;
          }),
        );

        setFriends(friendsData);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    if (user) {
      fetchFriends();
    }
  }, [user]);

  const getOrCreateChat = async (friendId) => {
    try {
      const response = await API.get(`/chats/${friendId}`);
      setSelectedChat(response.data.chat);
      fetchMessages(response.data.chat._id);
    } catch (error) {
      console.error("Error getting/creating chat:", error);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const response = await API.get(`/chats/${chatId}/messages`);
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (messageContent.trim() === "") return;

    try {
      await API.post(`/chats/${selectedChat._id}/send`, {
        content: messageContent,
      });
      socket.emit("send_message", {
        senderId: user.userId,
        receiverId: selectedChat.participants.find((id) => id !== user.userId),
        message: messageContent,
      });
      setMessageContent("");
      fetchMessages(selectedChat._id);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const findFriendById = (friendId) => {
    return friends.find((friend) => friend._id === friendId);
  };

  return (
    <div className="min-h-screen bg-white">
      <MainNavbar />
      <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
        {/* Left Panel */}
        <div className="md:w-1/3 lg:w-1/4 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[#263b70]">Messaging</h2>
            <input
              type="text"
              placeholder="Search"
              className="border rounded px-2 py-1 text-sm w-1/2"
            />
          </div>

          <div className="overflow-y-auto h-full">
            {friends.map((friend) => (
              <div
                key={friend._id}
                className="flex items-center p-3 cursor-pointer hover:bg-gray-100"
                onClick={() => getOrCreateChat(friend._id)}>
                <Image
                  src={friend.profilePicture}
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover mr-3"
                />
                <div className="flex flex-col">
                  <span className="font-medium">{friend.firstName}</span>
                  <span className="text-xs text-gray-500">
                    {friend.lastMessage || "No message yet"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center p-4 border-b border-gray-200 bg-white shadow-sm">
                {(() => {
                  const friend = findFriendById(
                    selectedChat.participants.find((id) => id !== user.userId),
                  );
                  return (
                    <>
                      <Image
                        src={friend?.profilePicture}
                        alt="profile"
                        width={40}
                        height={40}
                        className="rounded-full object-cover mr-3"
                      />
                      <div>
                        <h3 className="font-semibold text-[#263b70]">
                          {friend?.firstName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Active 40 min ago
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => {
                  const isUser = message.sender._id === user.userId;
                  const senderName = isUser
                    ? "You"
                    : findFriendById(message.sender._id)?.firstName || "Friend";

                  return (
                    <div
                      key={message._id}
                      className={`flex flex-col max-w-[75%] ${
                        isUser ? "self-end items-end" : "self-start items-start"
                      }`}>
                      <p className="text-xs text-gray-500 font-medium mb-1">
                        {senderName}
                      </p>
                      <div
                        className={`px-4 py-2 rounded-xl text-sm whitespace-pre-line ${
                          isUser
                            ? "bg-[#263b70] text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}>
                        {message?.content || message?.message}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input */}
              <div className="p-4 flex gap-2 border-t bg-white">
                <input
                  type="text"
                  placeholder="Write a message"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  className="border rounded-md px-3 py-2 flex-1 text-sm"
                />
                <button
                  onClick={sendMessage}
                  className="bg-[#263b70] text-white px-4 py-2 rounded-md">
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1 text-gray-400 text-lg">
              Select a friend to start chat
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
