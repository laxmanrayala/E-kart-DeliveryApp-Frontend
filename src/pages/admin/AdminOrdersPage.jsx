import { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get("/admin/orders?page=0&size=20");
    setOrders(res.data.content);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.patch(`/admin/orders/${id}/status?status=${status}`);
    fetchOrders();
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Admin Orders
      </h1>

      <table className="w-full border">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Order ID</th>
            <th className="p-2">User</th>
            <th className="p-2">Total</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">

              <td className="p-2">{order.id}</td>

              <td className="p-2">
                {order.user?.name}
              </td>

              <td className="p-2">
                ₹{order.totalAmount}
              </td>

              <td className="p-2">
                {order.status}
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
          ))}
        </tbody>

      </table>

    </div>
  );
}