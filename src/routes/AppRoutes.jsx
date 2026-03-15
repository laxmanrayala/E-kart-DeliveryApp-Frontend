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

  <Route path="/" element={<HomePage key="home" />} />

  <Route path="/cart" element={<CartPage key="cart" />} />

  <Route path="/orders" element={<OrdersPage key="orders" />} />

  <Route path="/login" element={<LoginPage key="login" />} />

  <Route path="/order-success" element={<OrderSuccessPage key="success" />} />

  <Route path="/admin/products" element={<AdminProductsPage key="admin-products" />} />

  <Route path="/admin/orders" element={<AdminOrdersPage key="admin-orders" />} />

  <Route path="/admin/stores" element={<AdminStoresPage key="admin-stores" />} />

  <Route path="/register" element={<RegisterPage key="register" />} />

</Routes>


)

}

export default AppRoutes
