import { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";

export default function AdminStoresPage() {

  const [stores, setStores] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const fetchStores = async () => {
    try {
      const res = await axios.get("/admin/stores");
      setStores(res.data);
    } catch (err) {
      console.error("Failed to fetch stores", err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const createStore = async () => {

    const trimmedName = name.trim();
    const trimmedAddress = address.trim();

    if (!trimmedName || !trimmedAddress) {
      setError("Store name and address are required");
      return;
    }

    try {
      await axios.post("/admin/stores", {
        name: trimmedName,
        address: trimmedAddress
      });

      setName("");
      setAddress("");
      setError("");

      fetchStores();

    } catch (err) {
      console.error("Failed to create store", err);
      setError("Failed to create store");
    }
  };

  const deleteStore = async (id) => {
    try {
      await axios.delete(`/admin/stores/${id}`);
      fetchStores();
    } catch (err) {
      console.error("Failed to delete store", err);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Admin Stores
      </h1>

      {/* Create Store */}

      <div className="mb-6 space-x-2">

        <input
          className="border p-2"
          placeholder="Store Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button
          onClick={createStore}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!name.trim() || !address.trim()}
        >
          Add Store
        </button>

      </div>

      {error && (
        <p className="text-red-600 mb-4">{error}</p>
      )}

      {/* Store Table */}

      <table className="w-full border">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Address</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {stores.map((store) => (

            <tr key={store.id} className="border-t">

              <td className="p-2">{store.id}</td>
              <td className="p-2">{store.name}</td>
              <td className="p-2">{store.address}</td>

              <td className="p-2">

                <button
                  onClick={() => deleteStore(store.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}
        </tbody>

      </table>

    </div>
  );
}