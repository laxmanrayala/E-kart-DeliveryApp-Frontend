import { createContext, useState } from "react"
import axios from "../api/axiosConfig"

export const CartContext = createContext()

export function CartProvider({ children }) {

const [cartCount, setCartCount] = useState(0)
const [cartTotal, setCartTotal] = useState(0)

const addToCart = async (product) => {

await axios.post("/cart/add", {
  productId: product.id,
  quantity: 1
})

setCartCount(prev => prev + 1)
setCartTotal(prev => prev + product.price)

}

const reduceFromCart = async (product) => {

await axios.patch("/cart/reduce", {
  productId: product.id,
  quantity: 1
})

setCartCount(prev => (prev > 0 ? prev - 1 : 0))
setCartTotal(prev => (prev - product.price >= 0 ? prev - product.price : 0))


}

const clearCart = () => {
setCartCount(0)
setCartTotal(0)
}

return (
<CartContext.Provider
value={{
cartCount,
cartTotal,
addToCart,
reduceFromCart,
clearCart
}}
>
{children}
</CartContext.Provider>
)

}
