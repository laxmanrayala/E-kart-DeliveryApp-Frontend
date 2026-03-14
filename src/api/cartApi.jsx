import api from "./axiosConfig"

export const getCart = async () => {
  const response = await api.get("/cart")
  return response.data
}

export const addToCart = async (productId) => {
  const response = await api.post("/cart/add", {
    productId: productId,
    quantity: 1
  })
  return response.data
}

export const reduceQuantity = async (productId) => {
  const response = await api.patch("/cart/reduce", {
    productId: productId,
    quantity: 1
  })
  return response.data
}

export const removeItem = async (productId) => {
  const response = await api.delete(`/cart/remove/${productId}`)
  return response.data
}

export const checkout = async () => {
  const response = await api.post("/orders/checkout")
  return response.data
}