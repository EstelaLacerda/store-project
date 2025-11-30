import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/api"
});

export default {
    getUserRequests(userId) {
        return api.get(`/requests/${userId}`);
    },

    createRequest(data) {
        return api.post("/requests", data);
    },

    deleteRequest(id) {
        return api.delete(`/requests/${id}`);
    }
};
