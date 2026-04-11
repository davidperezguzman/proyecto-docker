import API from "api/axios.config";

class AuthService {
  async login(email, password) {
    const { data } = await API.post("/api/auth/login", {
      email,
      password,
    });
    return data;
  }

  async googleLogin(code) {
    const { data } = await API.post("/api/auth/google", {
      code,
    });
    return data;
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
  }

  async forgotPassword(email) {
    const { data } = await API.post("/api/auth/forgot-password", {
      email,
    });
    return data;
  }

  async checkToken(token, email) {
    const { data } = await API.post("/api/auth/check-token", {
      token,
      email,
    });
    return data;
  }

  async resetPassword(token, email, password, password2) {
    const { data } = await API.post("/api/auth/reset-password", {
      token,
      email,
      password,
      password2,
    });
    return data;
  }

  async register(username, email, password) {
    const { data } = await API.post("/api/auth/signup", {
      username,
      email,
      password,
    });
    return data;
  }

  async getCurrentUser() {
    const { data } = await API.get("/api/users/profile");
    return data;
  }
}

export default new AuthService();