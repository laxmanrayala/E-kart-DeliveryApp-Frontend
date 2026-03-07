import api from "./axiosConfig"

const STORE_ID = 1

export const getProducts = async () => {
  const response = await api.get(`/stores/${STORE_ID}/products`)
  return response.data
}