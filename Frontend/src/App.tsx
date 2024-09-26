import { useState, useEffect } from 'react';
import { Header } from './Components/Header';
import Projects from './Components/Projects';
import Experiences from './Components/Experiences';
import Contact from './Components/Contact';
import CreateProject from './Components/CreateProject';

type Project = {
  id: number;
  title: string;
  description: string; // Inkluder beskrivelsen
  createdAt: string;
  category: string;
};

function App() {
  const student = {
    name: "Halgeir Geirson",
    degree: "Bachelor IT",
    points: 180,
    email: "student@hiof.no",
  };

  const [projects, setProjects] = useState<Project[]>([]);

  // Hent prosjektene fra backend ved lasting
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('http://localhost:3999/projects');
      const data = await response.json();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  // Funksjon for å legge til nytt prosjekt med tittel, kategori og beskrivelse
  const addProject = async (newProject: { title: string; category: string; description: string }) => {
    const response = await fetch('http://localhost:3999/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject),
    });

    if (response.ok) {
      const addedProject = await response.json();
      setProjects([...projects, addedProject]); // Oppdater listen med nytt prosjekt
    }
  };

  // Funksjon for å fjerne et prosjekt
  const removeProject = async (id: number) => {
    await fetch(`http://localhost:3999/projects/${id}`, {
      method: 'DELETE',
    });
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <main>
      <Header student={student.name} degree={student.degree} points={student.points} />
      <Experiences />
      <Contact email={student.email} />
      <Projects projects={projects} removeProject={removeProject} />
      <CreateProject addProject={addProject} />
    </main>
  );
}

export default App;
