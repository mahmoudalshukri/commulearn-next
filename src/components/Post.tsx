import Image from "next/image";
import { useState } from "react";
import API from "@/utils/api"; // Assuming your API utility

interface PostProps {
  post: {
    _id: string;
    author: {
      _id: string;
      firstName: string;
      lastName: string;
      profilePicture: string;
    };
    content: string;
    createdAt: string;
    likes: string;
    comments: string; // Assuming you have a comments array
    // ... other post properties
  };
}

const Post = ({ post }: PostProps) => {
  const [liked, setLiked] = useState(post.likes.includes("your-user-id")); // Replace "your-user-id" with the actual user ID logic
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const handleLikeClick = async () => {
    try {
      await API.post(`/posts/${post._id}/like`); // Assuming your like/unlike API endpoint is /posts/:postId/like
      setLiked(!liked);
      setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      console.error("Error toggling like:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center gap-4 p-4">
            <div className="w-14 h-14 rounded-full bg-gray-300 relative">
              {post.author.profilePicture ? (
                <Image
                  src={post.author.profilePicture}
                  alt="author"
                  width={56}
                  height={56}
                  className="rounded-full"
                  style={{ objectFit: "cover" }} // Ensure image fills the circle
                />
              ) : (
                // Placeholder if no profile picture
                <div className="w-full h-full rounded-full bg-gray-400" />
              )}
            </div>
            <div className="flex flex-col">
              <h1 className="text-[#263b70] text-lg font-semibold ">
                {post.author.firstName} {post.author.lastName}
              </h1>
              <p className="text-[#263b70]">Programmer</p>
              <p className="text-[#263b70]">{post.createdAt}</p>
            </div>
          </div>
          <p className="text-[#263b70] font-semibold"> + Follow</p>
        </div>
        <div className="px-2">
          <p className="text-right text-[#263b70]">{post.content}</p>
        </div>
        <div className="flex justify-between items-center border-b-1 border-gray-300 pb-2">
          <div className="flex gap-1 items-center">
            <button onClick={handleLikeClick}>
              <Image
                src={liked ? "/lovelike.png" : "/lovelike.png"} // Assuming you have filled and unfilled like icons
                alt="lovelike"
                height={32}
                width={32}
              />
            </button>
            <p className="text-[#263b70] text-lg font-semibold">{likesCount}</p>
          </div>
          <div className="flex items-center gap-2 ">
            <p className="text-[#263b70] text-md ">
              Comments {post.comments?.length || 0}
            </p>{" "}
            {/* Display comment count */}
            <p className="text-[#263b70] text-md ">Reports 40</p>
          </div>
        </div>
        <div className="flex items-center justify-around">
          <div className="flex gap-1 items-center ">
            <button onClick={handleLikeClick}>
              <Image
                src={liked ? "/like.png" : "/like.png"} // Assuming you have filled and unfilled like icons
                alt="like"
                height={18}
                width={18}
              />
            </button>
            <p className="text-[#263b70] ">Like</p>
          </div>
          <div className="flex gap-1 items-center ">
            <Image src="/message.png" alt="comment" height={18} width={18} />
            <p className="text-[#263b70] ">Comment</p>
          </div>
          <div className="flex gap-1 items-center ">
            <Image src="/retweet.png" alt="report" height={18} width={18} />
            <p className="text-[#263b70] ">Report</p>
          </div>
          <div className="flex gap-1 items-center ">
            <Image src="/share.png" alt="share" height={18} width={18} />
            <p className="text-[#263b70] ">Share</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
