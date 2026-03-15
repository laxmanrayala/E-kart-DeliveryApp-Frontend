import { useEffect, useState, useContext } from "react"
import axios from "../../api/axiosConfig"
import { StoreContext } from "../../context/StoreContext"

export default function AdminProductsPage() {

  const { selectedStore } = useContext(StoreContext)

  const [products, setProducts] = useState([])

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [category, setCategory] = useState("")

  const [editingId, setEditingId] = useState(null)

  const fetchProducts = async () => {

    if (!selectedStore) return

    const res = await axios.get(`/admin/products?storeId=${selectedStore.id}`)

    setProducts(res.data.content || res.data)
  }

  useEffect(() => {

    if (selectedStore) {
      fetchProducts()
    }

  }, [selectedStore])

  const resetForm = () => {

    setName("")
    setPrice("")
    setStock("")
    setImageUrl("")
    setCategory("")
    setEditingId(null)

  }

  const createProduct = async () => {

    if (!name || !price || !stock || !category) {
      alert("Fill all fields")
      return
    }

    await axios.post("/admin/products", {
      name,
      price,
      stock,
      imageUrl,
      category,
      storeId: selectedStore.id
    })

    resetForm()
    fetchProducts()
  }

  const updateProduct = async () => {

    await axios.put(`/admin/products/${editingId}`, {
      name,
      price,
      stock,
      imageUrl,
      category,
      storeId: selectedStore.id
    })

    resetForm()
    fetchProducts()
  }

  const startEdit = (product) => {

    setEditingId(product.id)

    setName(product.name)
    setPrice(product.price)
    setStock(product.stock)
    setImageUrl(product.imageUrl)
    setCategory(product.category)

  }

  const deleteProduct = async (id) => {

    await axios.delete(`/admin/products/${id}`)

    setProducts(products.filter(p => p.id !== id))
  }

  const increaseStock = async (id) => {

    await axios.patch(`/admin/products/${id}/stock`, {
      change: 1
    })

    fetchProducts()
  }

  const decreaseStock = async (id) => {

    await axios.patch(`/admin/products/${id}/stock`, {
      change: -1
    })

    fetchProducts()
  }

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Admin Product Management
      </h1>

      <div className="mb-4 text-gray-600">
        Store: <b>{selectedStore?.name}</b>
      </div>

      {/* PRODUCT FORM */}

      <div className="grid grid-cols-6 gap-3 mb-6">

        <input
          className="border p-2 rounded"
          placeholder="Product Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Stock"
          type="number"
          value={stock}
          onChange={(e)=>setStock(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e)=>setImageUrl(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        >
          <option value="">Category</option>
          <option value="Dairy">Dairy</option>
          <option value="Fruits">Fruits</option>
          <option value="Snacks">Snacks</option>
          <option value="Drinks">Drinks</option>
          <option value="Bakery">Bakery</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Ice Cream">Ice Cream</option>
          <option value="Meat">Meat</option>
        </select>

        <div className="flex gap-2">

          <button
            onClick={editingId ? updateProduct : createProduct}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {editingId ? "Update" : "Add"}
          </button>

          {editingId && (

            <button
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

          )}

        </div>

      </div>

      {/* PRODUCT TABLE */}

      <table className="w-full border border-gray-200 text-sm">

        <thead className="bg-gray-100 text-gray-700">

          <tr>

            <th className="p-3 text-center">ID</th>

            <th className="p-3 text-center">Image</th>

            <th className="p-3 text-left">Name</th>

            <th className="p-3 text-left">Category</th>

            <th className="p-3 text-center">Price</th>

            <th className="p-3 text-center">Stock</th>

            <th className="p-3 text-center">Actions</th>

          </tr>

        </thead>

        <tbody>

          {products.map(p => (

            <tr key={p.id} className="border-t hover:bg-gray-50">

              <td className="p-3 text-center">{p.id}</td>

              <td className="p-3 text-center">

                {p.imageUrl && (

                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded-md mx-auto"
                  />

                )}

              </td>

              <td className="p-3 font-medium">{p.name}</td>

              <td className="p-3">{p.category}</td>

              <td className="p-3 text-center font-semibold">₹{p.price}</td>

              <td className="p-3 text-center">{p.stock}</td>

              <td className="p-3">

                <div className="flex justify-center gap-2">

                  <button
                    onClick={()=>increaseStock(p.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={()=>decreaseStock(p.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    -
                  </button>

                  <button
                    onClick={()=>startEdit(p)}
                    className="bg-purple-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={()=>deleteProduct(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}