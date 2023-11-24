import React, { useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import postService from "./services/postService";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  const updatePostList = () => {
    postService
      .getAllPosts()
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  };

  return (
    <div className="App">
      <h1>My Blog</h1>
      <PostForm updatePostList={updatePostList} />
      <PostList
        posts={posts}
        setPosts={setPosts}
        updatePostList={updatePostList}
      />
    </div>
  );
}

export default App;
