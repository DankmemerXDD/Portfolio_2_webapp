type Project = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  category: string;
};

type ProjectsProps = {
  projects: Project[];
  removeProject: (id: number) => void;
};

export default function Projects({ projects, removeProject }: ProjectsProps) {

  const categoryCount = projects.reduce((acc: { [key: string]: number }, project) => {
    acc[project.category] = (acc[project.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      {projects.length === 0 ? (
        <p>Ingen prosjekter funnet</p>
      ) : (
        <>
          <h3>Total projects per category</h3>
          <ul>
            {Object.entries(categoryCount).map(([category, count]) => (
              <li key={category}>
                {category}: {count} prosjekter
              </li>
            ))}
          </ul>

          <ul>
            {projects.map((project) => (
              <li key={project.id}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <small>Category: {project.category}</small><br />
                <small>Date: {new Date(project.createdAt).toLocaleDateString()}</small>
                <button onClick={() => removeProject(project.id)}>Remove project</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
