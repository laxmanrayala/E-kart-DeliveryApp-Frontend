import { Routes, Route } from "react-router-dom"

import HomePage from "../pages/HomePage"
import CartPage from "../pages/CartPage"
import OrdersPage from "../pages/OrdersPage"
import LoginPage from "../pages/LoginPage"
import OrderSuccessPage from "../pages/OrderSuccessPage"

import AdminProductsPage from "../pages/admin/AdminProductsPage"
import AdminOrdersPage from "../pages/admin/AdminOrdersPage"
import AdminStoresPage from "../pages/admin/AdminStoresPage"
import RegisterPage from "../pages/RegisterPage"

function AppRoutes() {

  return (

    <Routes>

      <Route path="/" element={<HomePage />} />

      <Route path="/cart" element={<CartPage />} />

      <Route path="/orders" element={<OrdersPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/order-success" element={<OrderSuccessPage />} />

      <Route path="/admin/products" element={<AdminProductsPage />} />

      <Route path="/admin/orders" element={<AdminOrdersPage />} />

      <Route path="/admin/stores" element={<AdminStoresPage />} />

      <Route path="/register" element={<RegisterPage />} />

    </Routes>

  )

}

export default AppRoutes