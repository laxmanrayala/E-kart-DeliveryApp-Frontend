import { useEffect, useState } from "react"
import { getCart, checkout } from "../api/cartApi"
import CartItem from "../components/cart/CartItem"
import { useNavigate } from "react-router-dom"

function CartPage() {

  const [cart, setCart] = useState(null)
  const navigate = useNavigate()


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
    navigate("/order-success")

  } catch (error) {

    if (error.response?.status === 403 || error.response?.status === 401) {
      navigate("/login")
    }

  }
}

  // SAFE total calculation
  const total = cart?.items?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ) || 0

  if (!cart) {
    return <p>Loading cart...</p>
  }

  return (
    <div>

      <h2>Your Cart</h2>

      {cart.items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.items.map(item => (
          <CartItem
            key={item.productId}
            item={item}
            reloadCart={loadCart}
          />
        ))
      )}

      <h3>Total: ₹{total}</h3>

      <button onClick={handleCheckout}>
        Checkout
      </button>

    </div>
  )
}

export default CartPage