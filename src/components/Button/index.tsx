import "./styles.css";

interface ButtonProps {
  disabled?: boolean
  text: string
  onClick: () => void
}

export const Button = ({disabled = true, text, onClick}: ButtonProps) => {

  return (
    <button className="button" disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};
