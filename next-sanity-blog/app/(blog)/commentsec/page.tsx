"use client";

import { useState, useEffect } from "react";

interface Comment {
  username: string;
  message: string;
}

const CommentSec = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [formData, setFormData] = useState({ username: "", message: "" });

  // Load comments from local storage on component mount
  useEffect(() => {
    const savedComments = localStorage.getItem("comments");
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  // Save comments to local storage when comments state changes
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.username.trim() && formData.message.trim()) {
      setComments([...comments, formData]);
      setFormData({ username: "", message: "" });
    }
  };

  return (
    <section className="flex flex-col items-center bg-gray-100 py-10 px-4 ">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 border-2 border-gray-300 ">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your name"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm border-2 border-gray-300 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Comment
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your comment"
              value={formData.message}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-6 bg-purple-600 text-white font-semibold rounded-md shadow-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Add Comment
          </button>
        </form>

        {/* Comments List */}
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-sm bg-gray-50"
              >
                <h3 className="text-sm font-semibold text-purple-600">
                  {comment.username}
                </h3>
                <p className="text-gray-800 mt-1">{comment.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </section>
  );
};

export default CommentSec;
