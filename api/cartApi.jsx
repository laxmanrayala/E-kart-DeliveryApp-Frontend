import api from "./axiosConfig"

const USER_ID = 3

export const addToCart = async (productId) => {
  const response = await api.post(`/users/${USER_ID}/cart/add`, {
    productId: productId,
    quantity: 1
  })

  return response.data
}