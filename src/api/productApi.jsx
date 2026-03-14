import api from "./axiosConfig"

export const getProducts = async () => {
  const response = await api.get("/stores/1/products")
  return response.data
}