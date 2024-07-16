import { PostCard } from "../PostCard"
import "./styles.css"

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
  )
}