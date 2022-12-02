import { observable } from "@legendapp/state";
import { useSelector } from "@legendapp/state/react";
import { useEffect } from "react";
import { getProjects, Project } from "./api";

const state = observable({
  projects: null as Project[] | null,
});

export const useProjects = () => {
  const projects = useSelector(() => state.projects.get());

  useEffect(() => {
    if (projects == null) {
      getProjects()
        .then((projects) => state.set({ projects }))
        .catch(() => alert("Ocorreu um erro."));
    }
  }, [projects]);

  return projects;
};
