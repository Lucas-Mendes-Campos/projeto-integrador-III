import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export enum ProjectCategory {
  "Social e Saúde" = 1,
  "Indústria",
  "Tecnologia da Informação",
  "Ciências e Arte",
}

export interface Project {
  _id: number;
  name: string;
  cat: ProjectCategory;
  summary: string;
  members: string[];
}

export async function getProjects(): Promise<Project[]> {
  return (await api.get("/projects")).data;
}

export async function vote(id: number, captchaResponse: string) {
  await api.post(`/projects/${id}/vote`, {
    captchaResponse,
  });
}
