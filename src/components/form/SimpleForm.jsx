import { useState } from "react";
import { Toaster, toast } from "sonner";
import { supabase } from "../FormReact";
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
      />
    </div>
  );
};

const SimpleForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    country: "",
    message: "",
  });

  const options = [
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
  ];

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Procesar los datos del formulario
    const { first_name, last_name, email, country, message } = formData;

    try {
      const result = await supabase.from("clients").insert({
        first_name,
        last_name,
        email,
        country,
        message,
      });

      if (!result.error) {
        toast("Success");
        setMessage("Datos enviados con éxito!");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          country: "",
          message: "",
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setMessage("Error al enviar los datos: " + result.error.message);
      }
    } catch (error) {
      setMessage("Error al enviar los datos: " + error.message);
    }
  };

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit} className="flex flex-col">
        {/* Personal Information */}
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          <InputForm
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
            placeholder=" "
          />
          <InputForm
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
            placeholder=" "
          />
          <InputForm
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=" "
          />
          <SelectForm
            label="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder={"country"}
            options={options}
          />
        </div>
        <TextAreaForm
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Leave us a message"
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
