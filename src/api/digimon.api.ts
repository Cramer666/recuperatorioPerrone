import axios from "axios";
import type { Digimon, DigimonWithId } from "../models/digimon";

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL!,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
});

const api = {
    digimon: {
        all: async (): Promise<DigimonWithId[]> => {
            const result = await axiosApi.get<DigimonWithId[]>(`/digimon`);
            if (result.status === 200) return result.data;
            return [];
        },
        get: async (id: string): Promise<DigimonWithId> => {
            const result = await axiosApi.get<DigimonWithId>(`/digimon/${id}`);
            if (result.status === 200) return result.data;
            return undefined as unknown as DigimonWithId;
        },
        create: async (digimon: Partial<Digimon>): Promise<DigimonWithId> => {
            const result = await axiosApi.post<DigimonWithId>(`/digimon`, digimon);
            if (result.status === 200) return result.data;
            return undefined as unknown as DigimonWithId;
        },
        update: async (id: string, digimon: Partial<Digimon>): Promise<DigimonWithId> => {
            const result = await axiosApi.put<DigimonWithId>(`/digimon/${id}`, digimon);
            if (result.status === 200) return result.data;
            return undefined as unknown as DigimonWithId;
        },
        delete: async (id: string): Promise<boolean> => {
            const result = await axiosApi.delete<boolean>(`/digimon/${id}`);
            if (result.status === 200) return result.data;
            return false;
        },
    }
}

export default api;