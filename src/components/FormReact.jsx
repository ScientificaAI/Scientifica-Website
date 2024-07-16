import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import InputForm from "./InputForm";
import SelectForm from "./SelectForm";
import { Toaster, toast } from "sonner";

// Inicializa el cliente de Supabase
const supabase = createClient(
  "https://cqdcqwnibdsnijtbgafa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxZGNxd25pYmRzbmlqdGJnYWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0OTgyODMsImV4cCI6MjAzNTA3NDI4M30.s15-GrZmSAUQgXtFCG235m1mtX-9zgUBP1iatghNKQk"
);

const options = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "FR", label: "France" },
  { value: "DE", label: "Germany" },
];

const Formulario = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    country: "",
    studies: [{ degree: "", university: "", graduation: "" }],
    /* experiences: [
      {
        research_fields: "",
        university_affiliation: "",
        fields_of_study: "",
        problem_solved: "",
        technology_stack_experience: "",
        industries: "",
      },
    ], */
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e, index, section) => {
    const { name, value } = e.target;
    if (section) {
      const updatedSection = [...formData[section]];
      updatedSection[index][name] = value;
      setFormData({
        ...formData,
        [section]: updatedSection,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddSection = (section) => {
    const newSection =
      section === "studies"
        ? { degree: "", university: "", graduation: "" }
        : {
            research_fields: "",
            university_affiliation: "",
            fields_of_study: "",
            problem_solved: "",
            technology_stack_experience: "",
            industries: "",
          };
    setFormData({
      ...formData,
      [section]: [...formData[section], newSection],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { first_name, last_name, email, country, studies } = formData;

    setIsSubmitting(true);

    try {
      const result = await supabase.from("clients").insert({
        first_name,
        last_name,
        email,
        country,
        studies,
      });

      if (!result.error) {
        toast("Success");
        setMessage("Datos enviados con éxito!");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          country: "",
          studies: [{ degree: "", university: "", graduation: "" }],
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setMessage("Error al enviar los datos: " + result.error.message);
      }
    } catch (error) {
      setMessage("Error al enviar los datos: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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

        {/* Studies Information */}

        <>
          {formData.studies.map((study, index) => (
            <div key={index} className="mb-1">
              <div class="pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600 py-10">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Studies
                </h3>
              </div>
              <div className="grid gap-4  sm:grid-cols-2">
                <InputForm
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={(e) => handleChange(e, index, "studies")}
                  id="degree"
                  placeholder=" "
                  required
                />
                <InputForm
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={(e) => handleChange(e, index, "studies")}
                  id="university"
                  placeholder=" "
                  required
                />
                <InputForm
                  type="text"
                  name="graduation"
                  value={formData.graduation}
                  onChange={(e) => handleChange(e, index, "studies")}
                  id="graduation"
                  placeholder=" "
                  required
                />
              </div>
            </div>
          ))}

          <button
            id="btn-action"
            onClick={() => handleAddSection("studies")}
            type="button"
            class="text-[#0024ff] mb-10 inline-flex items-center bg-transparent font-medium rounded-lg text-sm text-center"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Add studies
          </button>
        </>

        {/* Experience Information */}
        {/* 
        {formData.experiences.map((experience, index) => (
          <div key={index} className="mb-10">
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Experience
              </h3>
            </div>
          </div>
        ))}
 */}
        {message && (
          <div className="sm:col-span-2 text-center text-green-600">
            {message}
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`sm:col-span-2 py-2 px-4 bg-[#0024ff] text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </>
  );
};

export default Formulario;
