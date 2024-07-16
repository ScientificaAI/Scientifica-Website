import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import InputForm from "./InputForm";
import SelectForm from "./SelectForm";

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
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const { first_name, last_name, email, country, studies, experiences } =
      formData;

    setIsSubmitting(true);

    try {
      const result = await supabase.from("clients").insert({
        first_name,
        last_name,
        email,
        country,
        studies,
        experiences,
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
            Add studies
          </button>
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
              <InputForm
                type="text"
                id="research_fields"
                name="research_fields"
                value={experience.research_fields}
                onChange={(e) => handleChange(e, index, "experiences")}
              />
              <InputForm
                type="text"
                id="university_affiliation"
                name="university_affiliation"
                value={experience.university_affiliation}
                onChange={(e) => handleChange(e, index, "experiences")}
              />
              <InputForm
                type="text"
                id="fields_of_study"
                name="fields_of_study"
                value={experience.fields_of_study}
                onChange={(e) => handleChange(e, index, "experiences")}
              />

              <div class="grid gap-4 mb-4 sm:grid-cols-1 relative">
                <label
                  for="underline_select"
                  class="text-white font-extralight text-xs"
                >
                  Problem Solved:
                </label>
                <textarea
                  type="text"
                  id="problem_solved"
                  name="problem_solved"
                  value={experience.problem_solved}
                  onChange={(e) => handleChange(e, index, "experiences")}
                  rows={8}
                  class="rounded-xl p-4 border-gray-400"
                ></textarea>
              </div>

              <InputForm
                type="text"
                id="technology_stack_experience"
                name="technology_stack_experience"
                value={experience.technology_stack_experience}
                onChange={(e) => handleChange(e, index, "experiences")}
              />

              <InputForm
                type="text"
                id="industries"
                name="industries"
                value={experience.industries}
                onChange={(e) => handleChange(e, index, "experiences")}
              />
            </div>
          </div>
        ))}

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
