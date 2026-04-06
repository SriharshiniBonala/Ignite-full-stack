import React, { useState } from "react";
import { addProject } from "../../api/studentApi";
import { toast } from "react-toastify";

const AddProject = ({ refreshProjects }) => {

  const student = JSON.parse(localStorage.getItem("student"));

  const [form, setForm] = useState({
    projectName: "",
    domain: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await addProject({
      ...form,
      studentId: student.id
    });

    toast.success("Project Added 🚀");

    // separate try for refresh
   

    setForm({ projectName: "", domain: "", description: "" });

  } catch (err) {
    toast.error("Failed to add project");
    console.error(err);
  }
};

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded space-y-3">
      <h3 className="font-bold text-lg">Add Project</h3>

      <input name="projectName" placeholder="Project Name"
        value={form.projectName} onChange={handleChange}
        className="w-full border p-2 rounded" required />

      <input name="domain" placeholder="Domain"
        value={form.domain} onChange={handleChange}
        className="w-full border p-2 rounded" />

      <textarea name="description" placeholder="Description"
        value={form.description} onChange={handleChange}
        className="w-full border p-2 rounded" />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Project
      </button>
    </form>
  );
};

export default AddProject;