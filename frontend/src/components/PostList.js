import React, { useEffect, useState } from "react";
import postService from "../services/postService";

import "./PostList.css";

const PostList = ({ posts, setPosts, updatePostList }) => {
  const [editFormData, setEditFormData] = useState({
    id: null,
    title: "",
    description: "",
    author: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    postService
      .getAllPosts()
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleRemove = (id) => {
    postService
      .deletePost(id)
      .then((response) => {
        console.log("Post deleted:", response.data);
        setPosts(posts.filter((post) => post._id !== id));
        updatePostList();
      })
      .catch((error) => console.error("Error deleting post:", error));
  };

  const handleEdit = (post) => {
    setIsEditing(true);
    setEditFormData({
      id: post._id,
      title: post.title,
      description: post.description,
      author: post.author,
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    postService
      .editPost(editFormData)
      .then((response) => {
        console.log("Post updated:", response.data);
        setPosts(
          posts.map((post) =>
            post._id === response.data._id ? response.data : post
          )
        );
        setEditFormData({
          id: null,
          title: "",
          description: "",
          author: "",
        });
        setIsEditing(false);
        updatePostList();
      })
      .catch((error) => console.error("Error editing post:", error));
  };

  const handleCancelEdit = () => {
    setEditFormData({
      id: null,
      title: "",
      description: "",
      author: "",
    });
    setIsEditing(false);
  };

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts &&
          posts.map((post) => (
            <li key={post._id}>
              <h1>{post.title}</h1>
              <h6>(by {post.author})</h6>
              <p>{post.description}</p>
              <button onClick={() => handleEdit(post)}>Edit</button>
              <button onClick={() => handleRemove(post._id)}>Remove</button>
            </li>
          ))}
      </ul>

      {isEditing && (
        <div>
          <h2>Edit Post</h2>
          <form onSubmit={handleEditSubmit}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={editFormData.title}
                onChange={handleEditChange}
                required
              />
            </label>
            <br />
            <label>
              Description:
              <textarea
                name="description"
                value={editFormData.description}
                onChange={handleEditChange}
                required
              />
            </label>
            <br />
            <label>
              Author:
              <input
                type="text"
                name="author"
                value={editFormData.author}
                onChange={handleEditChange}
                required
              />
            </label>
            <br />
            <button type="submit">Update Post</button>
            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );

  // ... other code ...
};

export default PostList;
