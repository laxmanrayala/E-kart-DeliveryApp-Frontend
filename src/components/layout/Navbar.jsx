import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCartCount } from "../../api/cartApi"

function Navbar() {

  const [cartCount, setCartCount] = useState(0)

  const location = useLocation()

  useEffect(() => {
    loadCartCount()
  }, [location])

  const loadCartCount = async () => {
    const count = await getCartCount()
    setCartCount(count)
  }

  return (
    <nav style={{display:"flex",justifyContent:"space-between",padding:"15px",background:"#eee"}}>

      <h2>E-Kart</h2>

      <div>
        <Link to="/" style={{marginRight:"15px"}}>Home</Link>
        <Link to="/cart" style={{marginRight:"15px"}}>
          Cart ({cartCount})
        </Link>
        <Link to="/orders">Orders</Link>
      </div>

    </nav>
  )
}

export default Navbar