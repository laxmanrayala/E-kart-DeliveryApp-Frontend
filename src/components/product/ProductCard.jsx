import { addToCart, getCart } from "../../api/cartApi"

function ProductCard({ product }) {

  const handleAddToCart = async () => {

    // Add item
    await addToCart(product.id)

    // Fetch updated cart
    const updatedCart = await getCart()

    console.log("Updated cart:", updatedCart)

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