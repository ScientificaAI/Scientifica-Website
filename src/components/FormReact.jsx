import { createClient } from "@supabase/supabase-js";
import { useState, useRef } from "react";
import { Toaster, toast } from "sonner";
import InputForm from "./InputForm";
import SelectForm from "./SelectForm";

// Inicializa el cliente de Supabase
export const supabase = createClient(
  "https://cqdcqwnibdsnijtbgafa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxZGNxd25pYmRzbmlqdGJnYWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0OTgyODMsImV4cCI6MjAzNTA3NDI4M30.s15-GrZmSAUQgXtFCG235m1mtX-9zgUBP1iatghNKQk"
);

export const TextAreaForm = ({
  name,
  value,
  onChange,
  placeholder,
  required,
  pattern,
}) => {
  return (
    <div className="mb-4">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-base leading-6 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
        required={required}
        pattern={pattern}
      />
    </div>
  );
};

const experiencesInputs = [
  {
    id: 1,
    name: "research_fields",
    type: "text",
    placeholder: " ",
    errorMessage: "Must be 16 characters or less and only letters!",
    label: "Research Fields",
    required: true,
    pattern: "^[A-Za-z ]{1,16}$",
  },
  {
    id: 2,
    name: "university_affiliation",
    type: "text",
    placeholder: " ",
    errorMessage: "Must be 16 characters or less and only letters!",
    label: "University Affiliation",
    required: true,
    pattern: "^[A-Za-z ]{1,16}$",
  },
  {
    id: 3,
    name: "fields_of_study",
    type: "text",
    placeholder: " ",
    errorMessage: "Must be 16 characters or less and only letters!",
    label: "Fields of Study",
    required: true,
    pattern: "^[A-Za-z ]{1,16}$",
  },
  {
    id: 4,
    name: "problem_solved",
    type: "text",
    placeholder: "Problem Solved",

    label: "Problem Solved",
    required: true,
    isTextArea: true,
    pattern: "^[A-Za-z ]{1,200}$",
  },
  {
    id: 5,
    name: "technology_stack_experience",
    type: "text",
    placeholder: " ",
    errorMessage: "Must be 16 characters or less and only letters!",
    label: "Technology Stack Experience",
    required: true,
    pattern: "^[A-Za-z ]{1,16}$",
  },
  {
    id: 6,
    name: "industries",
    type: "text",
    placeholder: " ",
    errorMessage: "Must be 16 characters or less and only letters!",
    label: "Industries",
    required: true,
    pattern: "^[A-Za-z ]{1,16}$",
  },
];

const studiesInputs = [
  {
    id: 1,
    name: "degree",
    type: "text",
    placeholder: " ",
    label: "Degree",
    errorMessage: "Must be 16 characters or less and only letters!",
    pattern: "^[A-Za-z ]{1,16}$",
    required: true,
  },
  {
    id: 2,
    name: "university",
    type: "text",
    placeholder: " ",
    label: "University",
    errorMessage: "Must be 16 characters or less and only letters!",
    pattern: "^[A-Za-z ]{1,16}$",
    required: true,
  },
  {
    id: 3,
    name: "graduation",
    type: "date",
    placeholder: " ",
    label: "Graduation Date",
    errorMessage: "Must be a valid date in the format 10/10/1992!",
    required: true,
  },
];

const inputsPersonalInfo = [
  {
    id: 1,
    name: "first_name",
    type: "text",
    placeholder: " ",
    errorMessage:
      "First name should be 3-16 characters and shouldn't include any special character!",
    label: "first name",
    pattern: "^[A-Za-z ]{1,16}$",
    required: true,
  },
  {
    id: 2,
    name: "last_name",
    type: "text",
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

const Formulario = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    country: "",
    studies: [{ degree: "", university: "", graduation: "" }],
    experiences: [
      {
        research_fields: "",
        university_affiliation: "",
        fields_of_study: "",
        problem_solved: "",
        technology_stack_experience: "",
        industries: "",
      },
    ],
    lookingfor: {
      desired_fields_of_work: "",
      desired_equipment: "",
      desired_technology_stack: "",
      desired_industry: "",
      desired_problem_to_solve: "",
    },
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  const handleLookinforChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      lookingfor: {
        ...formData.lookingfor,
        [name]: value,
      },
    });
  };

  const handleDeleteSection = (section) => {
    if (section === "studies") {
      const updatedStudies = formData.studies.slice(0, -1);
      setFormData({
        ...formData,
        studies: updatedStudies,
      });
    } else if (section === "experiences") {
      const updatedExperiences = formData.experiences.slice(0, -1);
      setFormData({
        ...formData,
        experiences: updatedExperiences,
      });
    } else {
      console.error("Sección desconocida:", section);
    }
  };

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
    const form = formRef.current;

    if (form.checkValidity()) {
      const {
        first_name,
        last_name,
        email,
        country,
        studies,
        experiences,
        lookingfor,
      } = formData;

      try {
        setIsSubmitting(true);
        const result = await supabase.from("clients").insert({
          first_name,
          last_name,
          email,
          country,
          studies,
          experiences,
          lookingfor,
        });

        if (!result.error) {
          toast("Success");
          setMessage("Data sent successfully!");
          setFormData({
            first_name: "",
            last_name: "",
            email: "",
            country: "",
            studies: [{ degree: "", university: "", graduation: "" }],
            experiences: [
              {
                research_fields: "",
                university_affiliation: "",
                fields_of_study: "",
                problem_solved: "",
                technology_stack_experience: "",
                industries: "",
              },
            ],
            lookingfor: {
              desired_fields_of_work: "",
              desired_equipment: "",
              desired_technology_stack: "",
              desired_industry: "",
              desired_problem_to_solve: "",
            },
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          setMessage("Error sending data: " + result.error.message);
        }
      } catch (error) {
        setMessage("Error sending data: " + error.message);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setMessage("Please fill out all fields correctly.");
      form.reportValidity();
    }
  };

  return (
    <>
      <Toaster />
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">
        {/* Personal Information */}
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          {inputsPersonalInfo.map((input) => (
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

        {/* Studies Information */}

        <>
          {formData.studies.map((study, index) => (
            <div key={index} className="mb-1">
              <div class="flex justify-between pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600 py-10">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Studies
                </h3>
                <button
                  type="button"
                  onClick={() => handleDeleteSection("studies")}
                  className="text-red-600 hover:text-red-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"></path>
                  </svg>
                </button>
              </div>

              <div className="grid gap-4  sm:grid-cols-1">
                {formData.studies.map((study, index) => (
                  <div className="w-full" key={index}>
                    {studiesInputs.map((input) => (
                      <InputForm
                        key={input.id}
                        type={input.type}
                        name={input.name}
                        value={study[input.name]}
                        onChange={(e) => handleChange(e, index, "studies")}
                        id={input.name}
                        placeholder={input.placeholder}
                        required={input.required}
                        pattern={input.pattern}
                        errorMessage={input.errorMessage}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <>
            {formData.studies.length <= 1 && (
              <button
                id="btn-action"
                onClick={() => handleAddSection("studies")}
                type="button"
                className="text-[#0024ff] mb-14 inline-flex items-center bg-transparent font-medium rounded-lg text-sm text-center"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add studies
              </button>
            )}
          </>
        </>

        {/* Experience Information */}

        {formData.experiences.map((experience, index) => (
          <div key={index} className="mb-0">
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Experience
              </h3>
              <button
                aria-label="delete"
                type="button"
                onClick={() => handleDeleteSection("experiences")}
                className="text-red-600 hover:text-red-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"></path>
                </svg>
              </button>
            </div>

            <div className="grid gap-4 mb-4 sm:grid-cols-1">
              {formData.experiences.map((experience, index) => (
                <div key={index}>
                  {experiencesInputs.map((input) =>
                    input.isTextArea ? (
                      <TextAreaForm
                        key={input.id}
                        name={input.name}
                        value={experience[input.name]}
                        onChange={(e) => handleChange(e, index, "experiences")}
                        placeholder={input.placeholder}
                        required={input.required}
                        pattern={input.pattern}
                      />
                    ) : (
                      <InputForm
                        key={input.id}
                        type={input.type}
                        name={input.name}
                        value={experience[input.name]}
                        onChange={(e) => handleChange(e, index, "experiences")}
                        id={input.name}
                        placeholder={input.placeholder}
                        required={input.required}
                        pattern={input.pattern}
                        errorMessage={input.errorMessage}
                      />
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {formData.experiences.length <= 1 && (
          <button
            id="btn-action"
            onClick={() => handleAddSection("experiences")}
            type="button"
            class="text-[#0024ff] mb-14 inline-flex items-center bg-transparent font-medium rounded-lg text-sm text-center"
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
            Add experience
          </button>
        )}

        {/* What are you looking for? */}

        <>
          <div class="flex justify-between items-center pb-4 mb-4 mt-6 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              What are you looking for?
            </h3>
          </div>

          <div className="grid gap-4 mb-4 sm:grid-cols-1">
            <InputForm
              name="desired_fields_of_work"
              type="text"
              value={formData.lookingfor.desired_fields_of_work}
              onChange={handleLookinforChange}
              placeholder=" "
            />
            <InputForm
              name="desired_equipment"
              type="text"
              value={formData.lookingfor.desired_equipment}
              onChange={handleLookinforChange}
              placeholder=" "
            />
            <InputForm
              name="desired_technology_stack"
              type="text"
              value={formData.lookingfor.desired_technology_stack}
              onChange={handleLookinforChange}
              placeholder=""
            />
            <InputForm
              name="desired_industry"
              type="text"
              value={formData.lookingfor.desired_industry}
              onChange={handleLookinforChange}
              placeholder=" "
            />
          </div>

          <div className="grid gap-4 mb-4 sm:grid-cols-1 relative">
            <label
              htmlFor="desired_problem_to_solve"
              className="text-black font-extralight text-xs"
            >
              Desired problem to solve:
            </label>
            <textarea
              rows={8}
              id="desired_problem_to_solve"
              name="desired_problem_to_solve"
              value={formData.lookingfor.desired_problem_to_solve}
              onChange={handleLookinforChange}
              className="rounded-xl border-gray-400 p-4"
              placeholder="Desired problem to solve"
            ></textarea>
          </div>
        </>

        {message && (
          <div className="sm:col-span-2 text-center text-green-600">
            {message}
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`sm:col-span-2 py-2 px-4 bg-[#0024ff] md:w-fit text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ${
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
