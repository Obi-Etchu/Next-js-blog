"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FC, useState } from "react";

interface FormCommentProps {
  postId: string;
}

const FormComment: FC<FormCommentProps> = ({ postId }) => {
  const router = useRouter();

  const [comment, setComment] = useState<string>("");

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async () => {
    if (comment.trim() !== "") {
      try {
        const newComment = await axios.post("/api/comments", {
          postId,
          text: comment,
        });
        if (newComment.status === 200) {
          router.refresh();
          setComment(""); // Clear the input after successful submission
        }
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  return (
    <div className="mt-4">
      <label
        htmlFor="comment"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Add Comment
      </label>
      <input
        type="text"
        className="w-full py-2 px-3 border-gray-300 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        name="comment"
        value={comment}
        onChange={handleCommentChange}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-2 disabled:bg-gray-400"
        onClick={handleSubmitComment}
        disabled={comment.trim() === ""}
      >
        Submit Comment
      </button>
    </div>
  );
};

export default FormComment;
