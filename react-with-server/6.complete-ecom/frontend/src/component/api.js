import axios from "axios";

const api = axios.create({
    baseURL: window.location.href.split(":")[0] == "http" ? "http://localhost:5004/api/v1" : "/api/v1",
    withCredentials: true,
});

export default api;