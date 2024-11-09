import createApiClient from "./api_service";
class PublisherService {
    constructor(baseUrl = "/api/manage") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/publisher")).data;
    }
    async create(data) {
        return (await this.api.post("/publisher/add", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/publisher")).data;
    }
    async get(id) {
        return (await this.api.get(`/publisher/${id}`)).data;
    }
    async getOne(searchQuery) {
        return (await this.api.get(`/publisher`, {
            params: { search: searchQuery }
        })).data;
    }
    async update(id, data) {
        return (await this.api.put(`/publisher/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/publisher/${id}`)).data;
    }
}

export default new PublisherService();