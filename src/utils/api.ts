import axios, { AxiosResponse } from "axios";
import { QUIZUPDATE } from "../pages/quiz/Quiz";
export interface LoginDto {
  email: string;
  password: string;
}
export interface QuesDto {
  question: string;
  options: string[];
  answer: number | undefined;
  category: string;
}
export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
export const createQuestion = async (
  data: QuesDto,
  token: string | undefined
): Promise<AxiosResponse> => {
  return await api.post("/question", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const login = async (data: LoginDto): Promise<AxiosResponse> => {
  return await api.post("/admin/auth", data);
};
export const getQuizs = async (
  token: string | undefined
): Promise<AxiosResponse> => {
  return await api.get("question/admin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const delQuiiz = async (
  id: string,
  token: string | undefined
): Promise<AxiosResponse> => {
  return await api.delete(`question/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateQuestion = async (
  data: QUIZUPDATE,
  token: string | undefined,
  id: string
): Promise<AxiosResponse> => {
  return await api.patch(`/question/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
