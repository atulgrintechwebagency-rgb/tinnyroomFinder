import axios from "axios";

const API_URL = "https://tinyroomfinder.com/backend/public/api";

export const resendVerification = async (data) => {

    const response = await axios.post(
        `${API_URL}/resend-verification`,
        {
            email: data.email,
        }
    );

    return response.data;

};