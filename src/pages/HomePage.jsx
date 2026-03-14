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
      console.error(err)
    }

    setLoading(false)

  }

  useEffect(() => {
    fetchProducts()
  }, [selectedStore])

  return (

    <div>

      <HeroBanner />

      <Categories />

      <div className="max-w-7xl mx-auto px-6 py-8">

        <h2 className="text-2xl font-bold mb-6">
          {selectedStore?.name} Products
        </h2>

        {loading ? (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

            {[...Array(10)].map((_, i) => (

              <div
                key={i}
                className="h-48 bg-gray-200 animate-pulse rounded-xl"
              />

            ))}

          </div>

        ) : (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}

          </div>

        )}

      </div>

    </div>

  )

}

export default HomePage