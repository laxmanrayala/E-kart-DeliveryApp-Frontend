import { useEffect, useState, useContext } from "react"
import { getCart, checkout } from "../api/cartApi"
import CartItem from "../components/cart/CartItem"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"

function CartPage() {

const [cart, setCart] = useState(null)

const navigate = useNavigate()

const { clearCart } = useContext(CartContext)

useEffect(() => {

const token = localStorage.getItem("token")

if (!token) {
  navigate("/login")
}

}, [])

useEffect(() => {
loadCart()
}, [])

const loadCart = async () => {

try {

  const data = await getCart()
  setCart(data)

} catch (error) {

  if (error.response?.status === 403 || error.response?.status === 401) {
    navigate("/login")
  }

}

}

const handleCheckout = async () => {

try {

  await checkout()

  clearCart()

  navigate("/order-success")

} catch (error) {

  if (error.response?.status === 403 || error.response?.status === 401) {
    navigate("/login")
  }

}

}

const total = cart?.items?.reduce(
(sum, item) => sum + item.price * item.quantity,
0
) || 0

if (!cart) {
return <p className="p-6">Loading cart...</p>
}

return (

<div className="max-w-5xl mx-auto px-6 py-8">

  <h1 className="text-2xl font-bold mb-6">
    Your Cart
  </h1>

  {cart.items.length === 0 ? (

    <div className="bg-white p-8 rounded-xl shadow text-center">

      <p className="text-gray-500 mb-4">
        Your cart is empty
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-green-600 text-white px-6 py-2 rounded-lg"
      >
        Continue Shopping
      </button>

    </div>

  ) : (

    <div className="space-y-4">

      {cart.items.map(item => (

        <CartItem
          key={item.productId}
          item={item}
          reloadCart={loadCart}
        />

      ))}

      <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center mt-6">

        <div className="text-lg font-semibold">
          Total: ₹{total}
        </div>

        <button
          onClick={handleCheckout}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Checkout
        </button>

      </div>

    </div>

  )}

</div>

)

}

export default CartPage
