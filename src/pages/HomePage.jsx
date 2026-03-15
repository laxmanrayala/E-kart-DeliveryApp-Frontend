import { useEffect, useState, useContext } from "react"
import { useLocation } from "react-router-dom"
import axios from "../api/axiosConfig"
import ProductCard from "../components/product/ProductCard"
import HeroBanner from "../components/home/HeroBanner"
import Categories from "../components/home/Categories"
import { StoreContext } from "../context/StoreContext"

function HomePage() {

const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true)

const [selectedCategory, setSelectedCategory] = useState("All")

const { selectedStore } = useContext(StoreContext)

const location = useLocation()
const query = new URLSearchParams(location.search)
const search = query.get("search")

const fetchProducts = async () => {

if (!selectedStore) return

setLoading(true)

try {

  const res = await axios.get(`/stores/${selectedStore.id}/products`)

  setProducts(res.data)

} catch (err) {

  console.error("Failed to fetch products", err)

}

setLoading(false)

}

useEffect(() => {

fetchProducts()


}, [selectedStore])

const filteredProducts = products.filter((product) => {

const categoryMatch =
  selectedCategory === "All" || product.category === selectedCategory

const searchMatch =
  !search || product.name.toLowerCase().includes(search.toLowerCase())

return categoryMatch && searchMatch


})

return (

<div className="bg-gray-50 min-h-screen">

  <HeroBanner />

  <Categories
    selectedCategory={selectedCategory}
    setSelectedCategory={setSelectedCategory}
  />

  <div className="max-w-7xl mx-auto px-6 py-8">

    <h2 className="text-2xl font-bold mb-6">
      {selectedStore?.name} Products
    </h2>

    {loading ? (

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

        {[...Array(10)].map((_, i) => (

          <div
            key={i}
            className="h-[240px] bg-gray-200 animate-pulse rounded-xl"
          />

        ))}

      </div>

    ) : (

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

        {filteredProducts.length === 0 ? (

          <p className="text-gray-500">
            No products found
          </p>

        ) : (

          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))

        )}

      </div>

    )}

  </div>

</div>

)

}

export default HomePage
