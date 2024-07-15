const SelectForm = ({ name, value, onChange, options, label }) => {
  return (
    <div className="relative z-0 w-full mb-5 group">
      <label htmlFor={name} className="sr-only">
        {name.replace("_", " ")}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
      >
        <option value="">Choose a {label} *</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        &#x3e;
      </div>
    </div>
  );
};

export default SelectForm;
