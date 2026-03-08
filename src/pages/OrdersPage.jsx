import { useEffect, useState } from "react"
import { getOrders } from "../api/orderApi"

function OrdersPage() {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      const data = await getOrders()
      setOrders(data)
    } catch (error) {
      console.error("Error loading orders", error)
    }
  }

  return (
    <div>

      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map(order => {

          const total = order.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          )

          return (
            <div
              key={order.id}
              style={{
                border: "1px solid gray",
                padding: "10px",
                margin: "10px"
              }}
            >

              <h4>Order #{order.id}</h4>

              <p>Status: {order.status}</p>

              {order.items.map(item => (
                <div key={item.productId}>
                  {item.productName} × {item.quantity}
                </div>
              ))}

              <h3>Total: ₹{total}</h3>

            </div>
          )
        })
      )}

    </div>
  )
}

export default OrdersPage