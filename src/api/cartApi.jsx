import api from "./axiosConfig"

const USER_ID = 3

export const addToCart = async (productId) => {
  const response = await api.post(`/users/${USER_ID}/cart/add`, {
    productId: productId,
    quantity: 1
  })
  return response.data
}

export const getCart = async () => {
  const response = await api.get(`/users/${USER_ID}/cart`)
  return response.data
}

export const reduceQuantity = async (productId) => {
  const response = await api.patch(`/users/${USER_ID}/cart/reduce`, {
    productId: productId,
    quantity: 1
  })
  return response.data
}

export const removeItem = async (productId) => {
  const response = await api.delete(`/users/${USER_ID}/cart/remove/${productId}`)
  return response.data
}

export const checkout = async () => {
  const response = await api.post(`/users/${USER_ID}/orders/checkout`)
  return response.data
}

export const getCartCount = async () => {
  const response = await getCart()

  const totalItems = response.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )
  return totalItems
}