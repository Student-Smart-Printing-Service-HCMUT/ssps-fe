import axios, { AxiosError, AxiosResponse } from 'axios';

export const server = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true
});

export const mockServer = axios.create({
  baseURL: 'http://localhost:3002',
  withCredentials: true
});

export const mockFileServer = axios.create({
  baseURL: 'http://localhost:3003',
  withCredentials: true
});

export async function invoke<R = unknown, D = unknown>(call: Promise<AxiosResponse<R, D>>) {
  try {
    const response = await call;
    return response.data;
  } catch (err) {
    const e = err as AxiosError;
    const errPayload = e.response?.data ? (e.response.data as ResponseError) : e;
    throw errPayload;
  }
}
