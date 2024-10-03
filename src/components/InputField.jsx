import React from "react";

const InputField = ({
  value,
  handleEditUserValue,
  name,
  inputType,
  Labeltext,
}) => {
  return (
    <div className="gap-3 flex items-center">
      <label htmlFor="phone" className="text-lg w-20">
        {Labeltext}
      </label>
      <input
        type={inputType}
        name={name}
        id={name}
        value={value}
        onChange={handleEditUserValue}
        className="outline-none px-5 py-2 rounded-3xl bg-orange-200"
      />
    </div>
  );
};

export default InputField;
