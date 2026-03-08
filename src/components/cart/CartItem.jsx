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
    <div style={{border:"1px solid gray",margin:"10px",padding:"10px"}}>
      <h4>{item.productName}</h4>
      <p>Price: ₹{item.price}</p>

      <div>
        <button onClick={decrease}>-</button>
        <span style={{margin:"0 10px"}}>{item.quantity}</span>
        <button onClick={increase}>+</button>
      </div>

      <button onClick={remove} style={{marginTop:"10px"}}>
        Remove
      </button>
    </div>
  )
}

export default CartItem