import { PostCard } from "../PostCard";
import { PostResponse } from "../PostCard/type";
import "./styles.css";

interface PostsProps {
  posts: PostResponse[]
}

export const Posts = ({ posts = [] }: PostsProps) => {
  return (
    <div className="post-container">
      {
        posts.map(post => (
          <PostCard 
            key={post.id} 
            content={post.body} 
            title={post.title}
            cover={post.cover}
          />
        ))
      }
    </div>
  );
};
