import { createContext, useState } from "react"
import axios from "../api/axiosConfig"

export const CartContext = createContext()

export function CartProvider({ children }) {

  const [cartCount, setCartCount] = useState(0)

  const addToCart = async (product) => {

    await axios.post("/cart/add", {
      productId: product.id,
      quantity: 1
    })

    setCartCount((prev) => prev + 1)
  }

  const reduceFromCart = async (product) => {

    await axios.patch("/cart/reduce", {
      productId: product.id,
      quantity: 1
    })

    setCartCount((prev) => (prev > 0 ? prev - 1 : 0))
  }

  return (
    <CartContext.Provider
      value={{
        cartCount,
        addToCart,
        reduceFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}