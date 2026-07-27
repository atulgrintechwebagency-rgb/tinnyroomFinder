import axios from "axios";

const API = axios.create({
    baseURL: "https://tinyroomfinder.com/backend/public/api",
});

export const loginUser = async (data) => {

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
    });

    const response = await API.post("/login", formData);

    return response.data;
};