import axios from "axios";

const API_URL = "https://tinyroomfinder.com/backend/public/api";

export const forgotPassword = async (email) => {
    const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
    });

    return response.data;
};