import React from "react";

const Input = ({ name, label, autoFocus, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        autoFocus={autoFocus}
        name={name}
        id={name}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
