import { useEffect, useState, useContext } from "react"
import axios from "../api/axiosConfig"
import ProductCard from "../components/product/ProductCard"
import HeroBanner from "../components/home/HeroBanner"
import Categories from "../components/home/Categories"
import { StoreContext } from "../context/StoreContext"

function HomePage() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const { selectedStore } = useContext(StoreContext)

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

  return (

    <div className="bg-gray-50 min-h-screen">

      <HeroBanner />

      <Categories />

      <div className="max-w-7xl mx-auto px-6 py-8">

        <h2 className="text-2xl font-bold mb-6">
          Ekart {selectedStore?.name} Products
        </h2>

        {/* LOADING STATE */}

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

          /* PRODUCTS GRID */

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

            {products.length === 0 ? (

              <p className="text-gray-500">
                No products available for this store
              </p>

            ) : (

              products.map(product => (
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