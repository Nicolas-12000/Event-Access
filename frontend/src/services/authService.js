import API from "./api";

export const login = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  const token = response.data.token;
  localStorage.setItem('authToken', token);
  return { token };
};

export const logout = async () => {
  localStorage.removeItem('authToken');
  return {};
};