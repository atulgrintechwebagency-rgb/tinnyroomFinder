import axios from "axios";

const API_URL = "https://tinyroomfinder.com/backend/public/api";

export const resendResetPassword = async (data) => {

    const response = await axios.post(
        `${API_URL}/resend-reset-password`,
        {
            email: data.email,
        }
    );

    return response.data;

};