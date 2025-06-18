import axios, { AxiosResponse } from "axios";

export const API_ENDPOINT: string = "http://62.72.30.12:18001";
export const API_VERSION: string = "v1";
export const API_BASE: string = `${API_ENDPOINT}/${API_VERSION}`;

interface HTTP {
	get<T>(entry: string, params?: Record<string, any>): Promise<AxiosResponse<T, any>>;
	post<T>(entry: string, data?: any): Promise<AxiosResponse<T, any>>;
	put<T>(entry: string, data?: any): Promise<AxiosResponse<T, any>>;
	delete<T>(entry: string): Promise<AxiosResponse<T, any>>;
}

export const http: HTTP = {
	get: async <T>(entry: string, params?: Record<string, any>) => await axios.get<T>(`${API_BASE}/${entry}`, { params }),
	post: async <T>(entry: string, data?: any) => await axios.post<T>(`${API_BASE}/${entry}`, data),
	put: async <T>(entry: string, data?: any) => await axios.put<T>(`${API_BASE}/${entry}`, data),
	delete: async <T>(entry: string) => await axios.delete<T>(`${API_BASE}/${entry}`),
};
