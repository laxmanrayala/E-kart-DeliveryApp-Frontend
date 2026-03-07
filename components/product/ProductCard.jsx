import { addToCart } from "../../api/cartApi"

function ProductCard({ product }) {

  const handleAddToCart = async () => {
    await addToCart(product.id)
    alert("Product added to cart")
  }

  return (
    <div style={{border: "1px solid gray", padding: "10px", margin: "10px"}}>
      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>

      <button onClick={handleAddToCart}>
        Add To Cart
      </button>
    </div>
  )
}

export default ProductCard