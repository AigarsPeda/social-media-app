import React from "react";

interface Props {
  htmlFor?: string;
  error?: string;
  errorClass?: string;
  labelTitle?: string;
  value: string;
  name: string;
  type: string;
  autoComplete?: "on" | "off";
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = (props) => {
  const {
    htmlFor,
    error,
    errorClass,
    labelTitle,
    value,
    name,
    type,
    autoComplete = "on",
    handleInputChange
  } = props;
  return (
    <>
      <label htmlFor={htmlFor}>{labelTitle}</label>
      <input
        className={error ? errorClass : undefined}
        type={type}
        autoComplete={autoComplete}
        name={name}
        onChange={handleInputChange}
        value={value}
      />
    </>
  );
};

export default Input;
