// import axios from "@/axios-common.js";
import axios from "axios";

class UserDataService {
    async index( params ) {
        return await axios.get("/users", {
            params: params
        });
    }

    async get(id) {
        return await axios.get(`/users/${id}`);
    }

    async create(data) {
        return await axios.post("/users/", data);
    }

    async update(id, data) {
        return await axios.put(`/users/${id}`, data);
    }

    async delete(id) {
        return await axios.delete(`/users/${id}`);
    }

}

export default new UserDataService();