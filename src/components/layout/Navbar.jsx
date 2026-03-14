import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"

function Navbar() {

  const { cartCount } = useContext(CartContext)
  const navigate = useNavigate()

  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")

  const logout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("role")

    navigate("/login")
  }

  return (

    <div className="bg-green-600 text-white p-4 flex justify-between items-center">

      <Link to="/" className="text-xl font-bold">
        E-Kart
      </Link>

      <div className="flex gap-4 items-center">

        <Link to="/">Home</Link>

        {token && (
          <>
            <Link to="/orders">Orders</Link>
            <Link to="/cart">Cart ({cartCount})</Link>
          </>
        )}

        {role === "ADMIN" && (
          <>
            <Link to="/admin/products">Products</Link>
            <Link to="/admin/orders">Admin Orders</Link>
            <Link to="/admin/stores">Stores</Link>
          </>
        )}

        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {token && (
          <button
            onClick={logout}
            className="bg-white text-green-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        )}

      </div>

    </div>
  )
}

export default Navbar