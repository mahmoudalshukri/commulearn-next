// AddFeed.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import API from "@/utils/api";
import { useAuth } from "@/utils/authContext";

interface AddFeedProps {
  onPostCreated: (newPost: any) => void;
}

const CreatePost = ({ onPostCreated }: AddFeedProps) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleMediaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const [userData, setUserData] = useState(null);
  useEffect(() => {
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

    fetchUserData();
  }, [user]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await API.post("/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setContent("");
        setImage(null);
        onPostCreated(response.data.post);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <div className="w-14 h-14 rounded-full bg-gray-300 relative">
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
          <div className="flex items-center gap-2 text-xs rounded-full w-[80%] ring-1 ring-[#263B70] px-2 h-[40px]">
            <input
              type="text"
              placeholder="Start a post"
              className="p-2 bg-transparent outline-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center pt-4">
          <div
            className="flex items-center gap-1 px-2 cursor-pointer"
            onClick={handleMediaClick}>
            <Image src="/image.png" alt="img" width={22} height={22} />
            <p className="text-[#263b70] font-semibold">Media</p>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <div className="flex items-center gap-1 px-2">
            <Image src="/ChatsCircle.png" alt="img" width={22} height={22} />
            <p className="text-[#263b70] font-semibold">Contribute expertise</p>
          </div>
          <div className="flex items-center gap-1 px-2">
            <Image src="/TextAlignRight.png" alt="img" width={22} height={22} />
            <p className="text-[#263b70] font-semibold">Write article</p>
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#263b70] text-white px-4 py-2 rounded-full w-fit self-end"
          disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
