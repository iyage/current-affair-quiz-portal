import axios, { AxiosResponse } from "axios";
export interface LoginDto {
  email: string;
  password: string;
}
interface Option {
  content: string;
}
export interface QuesDto {
  content: string;
  options: Option[];
  answer: Option;
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
