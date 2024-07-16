import "./styles.css"

export const Button = ({disabled, text, onClick}) => {
  return (
    <button className="button" disabled={disabled} onClick={onClick}>
      {text}
    </button>
  )
}