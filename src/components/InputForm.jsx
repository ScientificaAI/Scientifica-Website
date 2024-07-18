import { useState } from "react";

const InputForm = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  errorMessage,
  pattern,
  required,
}) => {
  const [focused, setFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleFocus = () => setFocused(true);

  const handleBlur = (e) => {
    setFocused(true);
    setIsValid(e.target.checkValidity());
  };

  return (
    <div className="relative z-0 w-full mb-5 group">
      <input
        type={type}
        name={name}
        id={name}
        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none ${
          isValid ? "border-gray-300" : "border-red-500"
        } focus:outline-none focus:ring-0 peer`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        pattern={pattern}
        required={required}
      />
      <label
        htmlFor={name}
        className={`peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:scale-75 peer-focus:-translate-y-6 ${
          isValid ? "peer-focus:text-blue-600" : "peer-focus:text-red-500"
        }`}
      >
        {name.replace("_", " ")} *
      </label>
      {!isValid && <span className="text-red-500 text-xs">{errorMessage}</span>}
    </div>
  );
};

export default InputForm;
