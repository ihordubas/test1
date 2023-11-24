import axios from "axios";

const API_URL = "http://localhost:5000/posts";

const postService = {
  getAllPosts: () => {
    return axios.get(API_URL);
  },

  createPost: (postData) => {
    return axios.post(`${API_URL}/create`, postData);
  },

  deletePost: (postId) => {
    return axios.delete(`${API_URL}/${postId}`);
  },

  editPost: (postData) => {
    return axios.put(`${API_URL}/edit/${postData.id}`, postData);
  },
};

export default postService;
