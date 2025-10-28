import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = {
    // Get all students
    getAllStudents: async () => {
        const response = await axios.get(`${API_URL}/students`);
        return response.data;
    },

    // Add new student
    addStudent: async (studentData) => {
        const response = await axios.post(`${API_URL}/students`, studentData);
        return response.data;
    },

    // Mark attendance
    markAttendance: async (studentId, present) => {
        const response = await axios.post(`${API_URL}/students/${studentId}/attendance`, { present });
        return response.data;
    },

    // Get student attendance
    getStudentAttendance: async (studentId) => {
        const response = await axios.get(`${API_URL}/students/${studentId}/attendance`);
        return response.data;
    }
};