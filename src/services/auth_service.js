import createApiClient from "./api_service";
class AuthService {
    constructor(baseUrl = "/api") {
        this.api = createApiClient(baseUrl);
    }
    async login(data) {
        return (await this.api.post("/auth/login", data)).data;
    }
    async register(data) {
        return (await this.api.post("/auth/register", data)).data;
    }
    async logout() {
        return (await this.api.get("/auth/logout")).data;
    }
    async checkLoggedIn() {
        return (await this.api.get("/auth/checkloggedin")).data;
    }

}

export default new AuthService();