import { createContext, useEffect, useState } from "react"
import axios from "../api/axiosConfig"

export const StoreContext = createContext()

export function StoreProvider({ children }) {

  const [stores, setStores] = useState([])
  const [selectedStore, setSelectedStore] = useState(null)

  const fetchStores = async () => {

    try {

      const res = await axios.get("/stores")

      setStores(res.data)

      if (res.data.length > 0 && !selectedStore) {
        setSelectedStore(res.data[0])
      }

    } catch (err) {
      console.error("Failed to load stores", err)
    }

  }

  useEffect(() => {
    fetchStores()
  }, [])

  return (
    <StoreContext.Provider
      value={{
        stores,
        selectedStore,
        setSelectedStore
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}