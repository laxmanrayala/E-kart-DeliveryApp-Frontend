import { addToCart, reduceQuantity, removeItem } from "../../api/cartApi"

function CartItem({ item, reloadCart }) {

const increase = async () => {
await addToCart(item.productId)
reloadCart()
}

const decrease = async () => {
await reduceQuantity(item.productId)
reloadCart()
}

const remove = async () => {
await removeItem(item.productId)
reloadCart()
}

return (

<div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">

  {/* LEFT SIDE */}

  <div>

    <h4 className="font-semibold text-gray-800">
      {item.productName}
    </h4>

    <p className="text-gray-500 text-sm">
      ₹{item.price}
    </p>

  </div>

  {/* RIGHT SIDE */}

  <div className="flex items-center gap-4">

    {/* QUANTITY CONTROL */}

    <div className="flex items-center border rounded-lg overflow-hidden">

      <button
        onClick={decrease}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
      >
        −
      </button>

      <span className="px-4 font-semibold">
        {item.quantity}
      </span>

      <button
        onClick={increase}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
      >
        +
      </button>

    </div>

    {/* REMOVE BUTTON */}

    <button
      onClick={remove}
      className="text-red-500 text-sm hover:underline"
    >
      Remove
    </button>

  </div>

</div>

)

}

export default CartItem
