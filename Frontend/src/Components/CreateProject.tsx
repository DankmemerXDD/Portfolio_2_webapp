import React, { useState } from 'react';

type CreateProjectProps = {
  addProject: (project: { title: string; category: string; description: string }) => void;
};

export default function CreateProject({ addProject }: CreateProjectProps) {
  const [projectTitle, setProjectTitle] = useState('');
  const [category, setCategory] = useState('Web');
  const [description, setDescription] = useState(''); // Nytt felt for beskrivelse

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectTitle || !description) {
      alert('Please enter both a project title and description');
      return;
    }

    // Sender title, category og description til addProject-funksjonen
    addProject({ title: projectTitle, category, description });

    // Tilbakestiller feltene etter innsending
    setProjectTitle('');
    setCategory('Web');
    setDescription('');
  };

  return (
    <div>
      <h2>Create a New Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectTitle">Project Title:</label>
          <input
            id="projectTitle"
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="Enter project title"
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Web">Web Development</option>
            <option value="Mobile">Mobile Development</option>
            <option value="Design">Design</option>
          </select>
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
          />
        </div>
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
}
