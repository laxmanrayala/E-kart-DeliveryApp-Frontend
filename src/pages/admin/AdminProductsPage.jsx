import { useEffect, useState } from "react"
import axios from "../../api/axiosConfig"

export default function AdminProductsPage() {

  const [products, setProducts] = useState([])

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [image, setImage] = useState(null)

  const fetchProducts = async () => {

    const res = await axios.get("/admin/products")

    setProducts(res.data.content || res.data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const createProduct = async () => {

    if (!name || !price || !stock) {
      alert("Fill all fields")
      return
    }

    const formData = new FormData()

    formData.append("name", name)
    formData.append("price", price)
    formData.append("stock", stock)

    if (image) {
      formData.append("image", image)
    }

    await axios.post("/admin/products", formData)

    setName("")
    setPrice("")
    setStock("")
    setImage(null)

    fetchProducts()
  }

  const deleteProduct = async (id) => {

    await axios.delete(`/admin/products/${id}`)

    setProducts(products.filter(p => p.id !== id))
  }

  const increaseStock = async (id) => {

    await axios.patch(`/admin/products/${id}/stock`, {
      quantity: 1
    })

    fetchProducts()
  }

  const decreaseStock = async (id) => {

    await axios.patch(`/admin/products/${id}/stock`, {
      quantity: -1
    })

    fetchProducts()
  }

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Admin Product Management
      </h1>

      {/* Add Product */}

      <div className="flex gap-2 mb-6">

        <input
          className="border p-2"
          placeholder="Product Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Stock"
          type="number"
          value={stock}
          onChange={(e)=>setStock(e.target.value)}
        />

        <input
          type="file"
          onChange={(e)=>setImage(e.target.files[0])}
        />

        <button
          onClick={createProduct}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>

      </div>

      {/* Products Table */}

      <table className="w-full border">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Image</th>
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Actions</th>
          </tr>

        </thead>

        <tbody>

          {products.map(p => (

            <tr key={p.id} className="border-t">

              <td className="p-2">{p.id}</td>

              <td className="p-2">
                {p.imageUrl && (
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-12 h-12 object-cover"
                  />
                )}
              </td>

              <td className="p-2">{p.name}</td>

              <td className="p-2">₹{p.price}</td>

              <td className="p-2">{p.stock}</td>

              <td className="p-2 flex gap-2">

                <button
                  onClick={()=>increaseStock(p.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  +
                </button>

                <button
                  onClick={()=>decreaseStock(p.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  -
                </button>

                <button
                  onClick={()=>deleteProduct(p.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}