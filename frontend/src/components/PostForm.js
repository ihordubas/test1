import React, { useState } from "react";
import postService from "../services/postService";

import "./PostForm.css";

const PostForm = ({ updatePostList }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postService
      .createPost(formData)
      .then((response) => {
        console.log("Post created:", response.data);
        setFormData({
          title: "",
          description: "",
          author: "",
        });
        updatePostList();
      })
      .catch((error) => console.error("Error creating post:", error));
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostForm;
