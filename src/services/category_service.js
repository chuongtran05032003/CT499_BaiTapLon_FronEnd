import createApiClient from "./api_service";
class CategoryService {
    constructor(baseUrl = "/api") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/category")).data;
    }
    async create(data) {
        return (await this.api.post("/manage/category/add", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/category")).data;
    }
    async get(id) {
        return (await this.api.get(`/category/${id}`)).data;
    }
    async getOne(searchQuery) {
        return (await this.api.get(`/category`, {
            params: { search: searchQuery }
        })).data;
    }
    async update(id, data) {
        return (await this.api.put(`/manage/category/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/manage/category/${id}`)).data;
    }
}

export default new CategoryService();