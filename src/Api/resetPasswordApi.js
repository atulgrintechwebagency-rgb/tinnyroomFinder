import axios from "axios";

const API_URL = "https://tinyroomfinder.com/backend/public/api";

export const resetPassword = async (data) => {

    const response = await axios.post(
        `${API_URL}/reset-password`,
        {
            token: data.token,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
        }
    );

    return response.data;

};