import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext"

function ProductCard({ product }) {

  const { addToCart, reduceFromCart } = useContext(CartContext)
  const [quantity, setQuantity] = useState(0)

  const handleAdd = async () => {
    await addToCart(product)
    setQuantity(prev => prev + 1)
  }

  const handleReduce = async () => {
    await reduceFromCart(product)
    setQuantity(prev => (prev > 0 ? prev - 1 : 0))
  }

  return (

    <div className="bg-white rounded-xl shadow-sm p-3 flex flex-col border border-gray-100 hover:shadow-md transition">

      {/* IMAGE AREA */}

      <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center mb-3">

        <img
          src={product.imageUrl || "https://via.placeholder.com/120"}
          alt={product.name}
          onError={(e)=>{e.target.src="https://via.placeholder.com/120"}}
          className="max-h-28 object-contain"
        />

      </div>

      {/* DELIVERY */}

      <span className="text-xs bg-gray-100 px-2 py-1 rounded w-fit mb-2">
        ⏱ 12 MINS
      </span>

      {/* NAME */}

      <h3 className="font-semibold text-sm text-gray-800 line-clamp-2">
        {product.name}
      </h3>

      <p className="text-xs text-gray-500 mb-3">
        1 unit
      </p>

      {/* PRICE + BUTTON */}

      <div className="flex items-center justify-between mt-auto">

        <span className="font-bold text-lg">
          ₹{product.price}
        </span>

        {quantity === 0 ? (

          <button
            onClick={handleAdd}
            className="border border-green-600 text-green-600 px-4 py-1 rounded-lg text-sm font-semibold"
          >
            ADD
          </button>

        ) : (

          <div className="flex items-center bg-green-600 text-white rounded-lg">

            <button onClick={handleReduce} className="px-3 py-1">-</button>

            <span className="px-2">{quantity}</span>

            <button onClick={handleAdd} className="px-3 py-1">+</button>

          </div>

        )}

      </div>

    </div>

  )

}

export default ProductCard