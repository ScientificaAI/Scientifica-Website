import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import InputForm from "../InputForm";
import SelectForm from "../SelectForm";

const TextAreaForm = ({ name, value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-base leading-6 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
        required="true"
      />
    </div>
  );
};

const inputs = [
  {
    id: 1,
    name: "first_name",
    type: "first_name",
    placeholder: " ",
    errorMessage:
      "First name should be 3-16 characters and shouldn't include any special character!",
    label: "first name",
    pattern: "^[A-Za-z0-9 ]{3,16}$",
    required: true,
  },
  {
    id: 2,
    name: "last_name",
    type: "last_name",
    placeholder: " ",
    errorMessage:
      "Last name should be 3-16 characters and shouldn't include any special character!",
    label: "Last Name",
    pattern: "^[A-Za-z0-9 ]{3,16}$",
    required: true,
  },
  {
    id: 3,
    name: "email",
    type: "text",
    placeholder: " ",
    label: "Email",
    errorMessage: "It should be a valid email address!",
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    required: true,
  },
  {
    ext: true,
    id: 4,
    name: "country",
    type: "text",
    placeholder: " ",
    label: "Country",
    required: true,
    options: [
      // Norteamérica
      { value: "US", label: "United States" },
      { value: "CA", label: "Canada" },
      { value: "MX", label: "Mexico" },

      // América Central y el Caribe
      { value: "CR", label: "Costa Rica" },
      { value: "SV", label: "El Salvador" },
      { value: "GT", label: "Guatemala" },
      { value: "HN", label: "Honduras" },
      { value: "NI", label: "Nicaragua" },
      { value: "PA", label: "Panama" },
      { value: "CU", label: "Cuba" },
      { value: "DO", label: "Dominican Republic" },
      { value: "HT", label: "Haiti" },
      { value: "JM", label: "Jamaica" },
      { value: "TT", label: "Trinidad and Tobago" },

      // América del Sur
      { value: "AR", label: "Argentina" },
      { value: "BO", label: "Bolivia" },
      { value: "BR", label: "Brazil" },
      { value: "CL", label: "Chile" },
      { value: "CO", label: "Colombia" },
      { value: "EC", label: "Ecuador" },
      { value: "GY", label: "Guyana" },
      { value: "PY", label: "Paraguay" },
      { value: "PE", label: "Peru" },
      { value: "SR", label: "Suriname" },
      { value: "UY", label: "Uruguay" },
      { value: "VE", label: "Venezuela" },

      // Países principales del Caribe
      { value: "BS", label: "Bahamas" },
      { value: "BB", label: "Barbados" },
      { value: "BZ", label: "Belize" },
      { value: "GD", label: "Grenada" },
      { value: "LC", label: "Saint Lucia" },
      { value: "VC", label: "Saint Vincent and the Grenadines" },

      // Europa (países principales)
      { value: "FR", label: "France" },
      { value: "DE", label: "Germany" },
      { value: "IT", label: "Italy" },
      { value: "ES", label: "Spain" },
      { value: "UK", label: "United Kingdom" },
    ],
  },
];

const SimpleForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    country: "",
    message: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const endPoint =
      "https://soqlkgd3j6.execute-api.us-east-1.amazonaws.com/items";
    const id2 = uuidv4();

    const data1 = {
      id: id2,
      ...formData,
    };

    setIsSubmitting(true);
    toast.loading("sending...");

    if (form.checkValidity()) {
      try {
        const response = await fetch(endPoint, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data1),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMessage("Data sent successfully!");
        toast.success("Data sent successfully!");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          country: "",
          message: "",
        });
      } catch (error) {
        setMessage("Error sending data: " + error.message);
        toast.error(message);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setMessage("Please fill out all fields correctly.");
      toast.error(message);
      form.reportValidity();
    }
  };

  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          success: {
            duration: 10000,
            theme: {
              primary: "green",
            },
          },
          loading: {
            duration: 3000,
          },
        }}
      />
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          {inputs.map((input) => (
            <div key={input.id}>
              {input.ext ? (
                <SelectForm
                  name={input.name}
                  value={formData[input.name]}
                  onChange={handleChange}
                  options={input.options}
                  label={input.label}
                  required={input.required}
                />
              ) : (
                <InputForm
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  value={formData[input.name]}
                  label={input.label}
                  onChange={handleChange}
                  errorMessage={input.errorMessage}
                  pattern={input.pattern}
                  required={input.required}
                />
              )}
            </div>
          ))}
        </div>
        <TextAreaForm
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Leave us a message"
          required
        />
        {message && (
          <div className="sm:col-span-2 text-center text-green-600">
            {message}
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`sm:col-span-2 py-2 px-4 bg-[#0024ff] md:max-w-fit text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default SimpleForm;
