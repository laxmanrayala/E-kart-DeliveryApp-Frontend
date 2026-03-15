import { useEffect, useState } from "react"
import { getOrders } from "../api/orderApi"
import { useNavigate } from "react-router-dom"

function OrdersPage() {

  const [orders, setOrders] = useState([])

  const navigate = useNavigate()

  useEffect(() => {

    const token = localStorage.getItem("token")

    if (!token) {
      navigate("/login")
    }

  }, [])

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

    <div className="max-w-5xl mx-auto px-6 py-8">

      <h1 className="text-2xl font-bold mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (

        <div className="bg-white p-8 rounded-xl shadow text-center">

          <p className="text-gray-500">
            No orders yet
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {orders.map(order => {

            const total = order.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            )

            return (

              <div
                key={order.id}
                className="bg-white p-6 rounded-xl shadow"
              >

                <div className="flex justify-between items-center mb-3">

                  <h3 className="font-semibold">
                    Order #{order.id}
                  </h3>

                  <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {order.status}
                  </span>

                </div>

                <div className="text-gray-700 space-y-1 mb-3">

                  {order.items.map(item => (

                    <div key={item.productId}>

                      {item.productName} × {item.quantity}

                    </div>

                  ))}

                </div>

                <div className="font-semibold">

                  Total: ₹{total}

                </div>

              </div>

            )

          })}

        </div>

      )}

    </div>

  )

}

export default OrdersPage