import axios from "axios";

export const API_base_URL = "http://localhost:3000/api/";

export const api = axios.create({
    baseURL: "http://localhost:3000/api",
    timeout: 8000,
})