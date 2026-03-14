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

    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col">

      <img
        src={`https://source.unsplash.com/200x200/?${product.name}`}
        alt={product.name}
        className="h-32 object-contain mb-3"
      />

      <span className="text-xs bg-gray-100 px-2 py-1 rounded w-fit mb-2">
        ⏱ 12 MINS
      </span>

      <h3 className="font-semibold text-gray-800">
        {product.name}
      </h3>

      <p className="text-sm text-gray-500 mb-3">
        1 unit
      </p>

      <div className="flex items-center justify-between mt-auto">

        <span className="font-bold text-lg">
          ₹{product.price}
        </span>

        {quantity === 0 ? (

          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-4 py-1 rounded-lg text-sm"
          >
            ADD
          </button>

        ) : (

          <div className="flex items-center bg-green-600 text-white rounded-lg">

            <button
              onClick={handleReduce}
              className="px-3 py-1"
            >
              -
            </button>

            <span className="px-2">
              {quantity}
            </span>

            <button
              onClick={handleAdd}
              className="px-3 py-1"
            >
              +
            </button>

          </div>

        )}

      </div>

    </div>

  )
}

export default ProductCard