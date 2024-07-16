import "./styles.css"

export const PostCard = ({ title, cover, content }) => {
  return (
    <div className="post">
      <img alt={title} src={cover} />
      <div className="post-content">
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
    </div>
  )
}