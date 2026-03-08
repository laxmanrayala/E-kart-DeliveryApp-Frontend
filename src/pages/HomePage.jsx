import { Link } from "react-router-dom"
import ProductList from "../components/product/ProductList"

function HomePage() {
  return (
    <div>

      <h2>E-Kart Products</h2>

      <Link to="/cart">
        <button>Go To Cart</button>
      </Link>

      <ProductList />

    </div>
  )
}

export default HomePage