import P from "prop-types";
import "./styles.css";

export const Button = ({disabled, text, onClick}) => {

  return (
    <button className="button" disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: P.string,
  disabled: P.bool,
  onClick: P.func
}