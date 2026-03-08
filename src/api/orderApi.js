import api from "./axiosConfig"

const USER_ID = 3

export const getOrders = async () => {
  const response = await api.get(`/users/${USER_ID}/orders`)
  return response.data
}