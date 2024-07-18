export const loadPosts = async () => {
  const postsRequest = fetch("https://jsonplaceholder.typicode.com/posts");
  const photosRequest = fetch("https://jsonplaceholder.typicode.com/photos");

  const [postsResponse, photosResponse] = await Promise.all([postsRequest, photosRequest]);

  const posts = await postsResponse.json();
  const photos = await photosResponse.json();

  return posts.map((post: object, index: number) => ({
    ...post,
    cover: photos[index].url,
  }));
};
