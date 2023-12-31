// src/services/file-upload.service.js

import axios from "axios";

const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: import.meta.env.VITE_API_URL
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
  throw err;
};

const getPosts = () => {
  return api.get("/api/posts")
    .then((res) => res.data)
    .catch(errorHandler);
};

const uploadImage = (file) => {
  return api.post("/api/upload", file)
    .then(res => res.data)
    .catch(errorHandler);
};

const createPost = (newMovie) => {
  return api.post("/api/posts", newMovie)
    .then(res => res.data)
    .catch(errorHandler);
};

export default {
  getPosts,
  uploadImage,
  createPost,
};
