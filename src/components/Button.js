import React from "react";

const Button = ({ name, onClick, selected }) => {
  return (
    <button className={`btn btn-secondary m-2 ${selected ? "active" : ""}`} onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;