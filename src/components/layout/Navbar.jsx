import { Link, useNavigate } from "react-router-dom"
import { useContext, useState, useRef, useEffect } from "react"
import { CartContext } from "../../context/CartContext"
import { StoreContext } from "../../context/StoreContext"
import LoginModal from "../auth/LoginModal"

function Navbar() {

  const { cartCount, cartTotal } = useContext(CartContext)
  const { stores, selectedStore, setSelectedStore } = useContext(StoreContext)

  const [open, setOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [searchIndex, setSearchIndex] = useState(0)
  const [search, setSearch] = useState("")

  const dropdownRef = useRef(null)
  const accountRef = useRef(null)

  const navigate = useNavigate()

  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")

  const searchHints = [
    "chocolates",
    "cake",
    "milk",
    "vegetables",
    "ice cream",
    "chips",
    "bread"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchIndex((prev) => (prev + 1) % searchHints.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

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

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate(`/?search=${search}`)
      setSearch("")
    }
  }

  useEffect(() => {

    function handleClickOutside(event) {

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }

      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false)
      }

    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }

  }, [])

  return (

    <div className="bg-green-600 text-white sticky top-0 z-50 shadow-md">

      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-6">

        <div className="flex items-center gap-8">

          <Link to="/" className="text-2xl font-bold">
            E-Kart
          </Link>

          {selectedStore && (

            <div ref={dropdownRef} className="relative">

              <div
                className="cursor-pointer flex flex-col hover:bg-green-700 px-3 py-1 rounded"
                onClick={() => setOpen(!open)}
              >

                <span className="text-sm font-semibold">
                  Delivery in 11 minutes
                </span>

                <span className="flex items-center text-sm gap-1">
                  📍 {selectedStore.name} ▼
                </span>

              </div>

              {open && (

                <div className="absolute mt-2 w-60 bg-white text-black rounded-xl shadow-xl border">

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

              )}

            </div>

          )}

        </div>

        <div className="flex-1 max-w-xl">

          <div className="relative">

            <input
              type="text"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder={`Search "${searchHints[searchIndex]}"`}
              className="w-full px-4 py-2 rounded-lg text-black outline-none"
            />

          </div>

        </div>

        <div className="flex gap-4 items-center">

          {token && (

            <Link to="/cart">

              {cartCount === 0 ? (

                <div className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2">
                  🛒 My Cart
                </div>

              ) : (

                <div className="bg-green-800 px-4 py-2 rounded-xl flex items-center gap-3">

                  <span>🛒</span>

                  <div className="flex flex-col">

                    <span>{cartCount} items</span>

                    <span className="text-sm">
                      ₹{cartTotal}
                    </span>

                  </div>

                </div>

              )}

            </Link>

          )}

          {!token && (

            <button
              onClick={()=>setShowLogin(true)}
              className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold"
            >
              Login
            </button>

          )}

          {token && (

            <div ref={accountRef} className="relative">

              <button
                onClick={()=>setAccountOpen(!accountOpen)}
                className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold"
              >
                Account ▼
              </button>

              {accountOpen && (

                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">

                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>

                  {role === "ADMIN" && (

                    <>
                      <Link
                        to="/admin/orders"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Admin Orders
                      </Link>

                      <Link
                        to="/admin/products"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Products
                      </Link>

                      <Link
                        to="/admin/stores"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Stores
                      </Link>
                    </>

                  )}

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>

                </div>

              )}

            </div>

          )}

        </div>

      </div>

      {showLogin && (
        <LoginModal onClose={()=>setShowLogin(false)} />
      )}

    </div>

  )

}

export default Navbar