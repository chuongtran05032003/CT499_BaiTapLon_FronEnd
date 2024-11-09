import createApiClient from "./api_service";
class UserService {
    constructor(baseUrl = "/api/user") {
        this.api = createApiClient(baseUrl);
    }
    async borrow(data) {
        return (await this.api.post(`/borrow`, data)).data;
    }
    async getBorrowLog(status, search) {
        const params = {
            query: search,
            status: status,
        };
        return (await this.api.get(`/borrow`, { params })).data;
    }
    async getBorrowLogByID(id) {
        return (await this.api.get(`/borrow/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/profile/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })).data;
    }
    async getAvatar(id) {
        return (await this.api.get(`/avatar/${id}`, {
            responseType: 'blob',
        })).data;
    }
    async getVerify(userID) {
        const params = {
            MaDocGia: userID,
        };
        return (await this.api.get('/verify', { params })).data;
    }
}

export default new UserService();