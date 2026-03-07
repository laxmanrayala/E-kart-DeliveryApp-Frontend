import { useEffect, useState } from "react"
import { getProducts } from "../../api/productApi"
import ProductCard from "./ProductCard"

function ProductList() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await getProducts()
      console.log("Products:", data)
      setProducts(data)
    } catch (error) {
      console.error("Error loading products", error)
    }
  }

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList