import api from "./axiosConfig"

export const login = async (phoneNumber, password) => {

  const response = await api.post("/auth/login", {
    phoneNumber,
    password
  })

  return response.data
}