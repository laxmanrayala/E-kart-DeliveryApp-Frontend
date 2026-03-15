import { useEffect, useState } from "react"
import axios from "../../api/axiosConfig"

export default function AdminOrdersPage() {

  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {

      const res = await axios.get("/admin/orders?page=0&size=20&sort=createdAt,desc")

      const data = res.data

      setOrders(data.content ? data.content : [])

    } catch (error) {

      console.error("Failed to fetch orders", error)

    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const updateStatus = async (id, status) => {

    try {

      await axios.patch(`/admin/orders/${id}/status?status=${status}`)

      fetchOrders()

    } catch (error) {

      console.error("Failed to update order", error)

    }

  }

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Admin Orders
      </h1>

      <table className="w-full border border-gray-200">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-2">Order ID</th>
            <th className="p-2">User</th>
            <th className="p-2">Items</th>
            <th className="p-2">Total</th>
            <th className="p-2">Status</th>
            <th className="p-2">Created</th>
            <th className="p-2">Actions</th>
          </tr>

        </thead>

        <tbody>

          {orders.length === 0 ? (

            <tr>
              <td colSpan="7" className="p-4 text-center">
                No Orders Found
              </td>
            </tr>

          ) : (

            orders.map(order => (

              <tr key={order.id} className="border-t">

                <td className="p-2">{order.id}</td>

                <td className="p-2">
                  {order.user ? order.user.name : "Unknown"}
                </td>

                <td className="p-2">

                  {order.items && order.items.map((item, index) => (

                    <div key={index}>
                      {item.productName} × {item.quantity}
                    </div>

                  ))}

                </td>

                <td className="p-2">
                  ₹{order.totalAmount}
                </td>

                <td className="p-2">
                  {order.status}
                </td>

                <td className="p-2">
                  {order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}
                </td>

                <td className="p-2 space-x-2">

                  <button
                    onClick={() => updateStatus(order.id, "DELIVERED")}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Deliver
                  </button>

                  <button
                    onClick={() => updateStatus(order.id, "CANCELLED")}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  )

}