import createApiClient from "./api_service";
class BookService {
    constructor(baseUrl = "/api") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/book")).data;
    }
    async create(data) {
        return (await this.api.post("/manage/book/add", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })).data;
    }
    async deleteAll() {
        return (await this.api.delete("/manage/book")).data;
    }
    async get(id) {
        return (await this.api.get(`/book/${id}`)).data;
    }
    async getBookByCategory(id) {
        return (await this.api.get(`/book/bookBycategory/${id}`)).data;
    }
    async getImg(id) {
        return (await this.api.get(`/book/image/${id}`, {
            responseType: 'blob',
        })).data;
    }
    async getImgName(id) {
        return (await this.api.get(`/book/image/name/${id}`)).data;
    }
    async getOne(searchQuery) {
        return (await this.api.get(`/book`, {
            params: { search: searchQuery }
        })).data;
    }
    async update(id, data) {
        return (await this.api.put(`/manage/book/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })).data;
    }
    async delete(id) {
        return (await this.api.delete(`/manage/book/${id}`)).data;
    }
}

export default new BookService();