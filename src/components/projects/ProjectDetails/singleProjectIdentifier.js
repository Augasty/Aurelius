// api.js

import fakeProjects from "../../fakeProjects";

export const fetchProjectData = (projectId) => {
  const project = fakeProjects.find((project) => project.id == projectId);

  if (!project) {
    // Handle the case where the project with the given id is not found
    throw new Error('Project not found');
  }

  return project;
};
