import api from "./axiosConfig"

export const getOrders = async () => {
  const response = await api.get("/orders")
  return response.data
}