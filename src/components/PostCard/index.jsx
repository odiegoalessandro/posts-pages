import "./styles.css"

export const PostCard = ({ title, cover, content }) => {
  return (
    <div className="post">
      <img alt={title} src={cover} />
      <div className="post-content">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  )
}