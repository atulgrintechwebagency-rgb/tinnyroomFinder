import axios from "axios";

const API_URL = "https://tinyroomfinder.com/backend/public/api";

export const logoutUser = async (token) => {

    const response = await axios.post(
        `${API_URL}/logout`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        }
    );

    return response.data;
};