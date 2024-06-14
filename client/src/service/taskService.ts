import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

export interface Task {
    id: number;
    name: string;
    status: boolean;
}

export const getTasks = async (): Promise<Task[]> => {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
};
