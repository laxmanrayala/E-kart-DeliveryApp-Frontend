import { Link, useNavigate } from "react-router-dom"
import { useContext, useState, useRef, useEffect } from "react"
import { CartContext } from "../../context/CartContext"
import { StoreContext } from "../../context/StoreContext"
import LoginModal from "../auth/LoginModal"

function Navbar() {

  const { cartCount } = useContext(CartContext)
  const { stores, selectedStore, setSelectedStore } = useContext(StoreContext)

  const [open, setOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const dropdownRef = useRef(null)

  const navigate = useNavigate()

  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")

  const logout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("role")

    navigate("/")
    window.location.reload()
  }

  const changeStore = (store) => {
    setSelectedStore(store)
    setOpen(false)
  }

  useEffect(() => {

    function handleClickOutside(event) {

      if (dropdownRef.current &&
          !dropdownRef.current.contains(event.target)) {

        setOpen(false)

      }

    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }

  }, [])

  return (

    <div className="bg-green-600 text-white px-6 py-3 flex justify-between items-center">

      {/* LEFT */}

      <div className="flex items-center gap-8">

        <Link to="/" className="text-xl font-bold">
          E-Kart
        </Link>

        {selectedStore && (

          <div ref={dropdownRef} className="relative">

            <div
              className="cursor-pointer flex flex-col"
              onClick={() => setOpen(!open)}
            >

              <span className="text-sm font-semibold">
                Delivery in 11 minutes
              </span>

              <span className="flex items-center text-sm gap-1">

                📍 {selectedStore.name}

                <span className="text-xs">▼</span>

              </span>

            </div>

            <div
              className={`absolute mt-2 w-56 bg-white text-black rounded shadow-lg transition-all duration-200 origin-top ${
                open
                  ? "scale-100 opacity-100"
                  : "scale-95 opacity-0 pointer-events-none"
              }`}
            >

              {stores.map(store => (

                <div
                  key={store.id}
                  onClick={() => changeStore(store)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >

                  {store.name}

                </div>

              ))}

            </div>

          </div>

        )}

      </div>

      {/* RIGHT */}

      <div className="flex gap-4 items-center">

        {/* <Link to="/">Home</Link> */}

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

          <button
            onClick={()=>setShowLogin(true)}
            className="bg-white text-green-600 px-3 py-1 rounded"
          >
            Login
          </button>

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

      {showLogin && (
        <LoginModal onClose={()=>setShowLogin(false)} />
      )}

    </div>

  )
}

export default Navbar