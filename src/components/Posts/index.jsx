import P from "prop-types";
import { PostCard } from "../PostCard";
import "./styles.css";

export const Posts = ({ posts }) => {
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

Posts.defaultProps = {
  posts: [],
};

Posts.propTypes = {
  posts: P.arrayOf(P.shape({
    title: P.string,
    cover: P.string,
    content: P.string
  }))
};