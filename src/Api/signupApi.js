import axios from "axios";

const API = axios.create({
    baseURL: "https://tinyroomfinder.com/backend/public/api",
});

export const registerUser = async (data) => {

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
    });

    return API.post("/register", formData);
};