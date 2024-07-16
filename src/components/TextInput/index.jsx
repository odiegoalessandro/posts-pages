import React from "react";
import "./styles.css";

export const TextInput = ({ searchValue, onChange }) => {
  return (
    <input 
      type="search"
      className="input"
      value={searchValue}
      onChange={onChange}
      placeholder="Search here"
    />
  )
}
