import React from "react";

interface InputFieldProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function InputField({ onChange }: React.PropsWithChildren<InputFieldProps>) {
  return (
    <input
      className="bg-gray-100 rounded-md m-5 p-2 outline-none border-none"
      onChange={onChange}
      placeholder="Enter github user name"
    />
  );
}

export default InputField;
