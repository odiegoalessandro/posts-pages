import axios from "axios";

export const loadPosts = async () => {
  const postsRequest = axios.get("https://jsonplaceholder.typicode.com/posts");
  const photosRequest = axios.get("https://jsonplaceholder.typicode.com/photos");

  const [posts, photos] = await Promise.all([postsRequest, photosRequest]);

  return posts.data.map((post, index) => ({
      ...post,
      cover: photos.data[index].url
  }));
};
