import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();
app.use("*", cors());

let projects = [
  {
    id: 1,
    title: 'Project 1',
    description: 'This is the description for project 1.',
    createdAt: new Date().toISOString(),
    category: 'Web Development'
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'This is the description for project 2.',
    createdAt: new Date().toISOString(),
    category: 'Mobile Development'
  },
  {
    id: 3,
    title: 'Project 3',
    description: 'This is the description for project 3.',
    createdAt: new Date().toISOString(),
    category: 'UI/UX Design'
  }
];

app.get('/projects', (c) => {
  return c.json(projects); 
});

app.delete('/projects/:id', (c) => {
  const idToDelete = Number(c.req.param('id'));

  projects = projects.filter(project => project.id !== idToDelete);

  return c.json({ message: `Project with id ${idToDelete} deleted` });
});

app.post('/projects', async (c) => {
  const newProject = await c.req.json();
  newProject.id = projects.length + 1;
  newProject.createdAt = new Date().toISOString();
  projects.push(newProject);
  return c.json(newProject); 
});

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

const port = 3999;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
