import createApiClient from "./api_service";
class StaffyService {
    constructor(baseUrl = "/api/manage") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/staff")).data;
    }
    async create(data) {
        return (await this.api.post("/staff/add", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/staff")).data;
    }
    async get(id) {
        return (await this.api.get(`/staff/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/staff/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/staff/${id}`)).data;
    }
    async getOne(searchQuery) {
        return (await this.api.get(`/staff`, {
            params: { search: searchQuery }
        })).data;
    }
    async updateBorrow(id, data) {
        return (await this.api.put(`/borrow/${id}`, data, )).data;
    }
    async deleteBorrow(id) {
        return (await this.api.delete(`/borrow/${id}`)).data;
    }
}

export default new StaffyService();