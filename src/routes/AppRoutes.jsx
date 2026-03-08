import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage"
import CartPage from "../pages/CartPage"
import OrdersPage from "../pages/OrdersPage"
import OrderSuccessPage from "../pages/OrderSuccessPage"

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<HomePage />} />

      <Route path="/cart" element={<CartPage />} />

      <Route path="/orders" element={<OrdersPage />} />

      <Route path="/order-success" element={<OrderSuccessPage />} />

    </Routes>
  )
}

export default AppRoutes