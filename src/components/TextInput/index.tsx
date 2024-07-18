import React from "react";
import "./styles.css";

interface TextInputProps {
  searchValue: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextInput = ({ searchValue, onChange }: TextInputProps) => {
  return (
    <input 
      type="search"
      className="input"
      value={searchValue}
      onChange={onChange}
      placeholder="Search here"
    />
  );
};
