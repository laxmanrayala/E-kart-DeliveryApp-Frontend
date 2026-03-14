import { createContext, useEffect, useState } from "react"
import axios from "../api/axiosConfig"

export const StoreContext = createContext()

export function StoreProvider({ children }) {

  const [stores, setStores] = useState([])
  const [selectedStore, setSelectedStore] = useState(null)

  const fetchStores = async () => {

    try {

      const res = await axios.get("/stores")

      const storeList = res.data

      setStores(storeList)

      // check if store already saved in localStorage
      const savedStoreId = localStorage.getItem("selectedStoreId")

      if (savedStoreId) {

        const store = storeList.find(
          s => s.id === Number(savedStoreId)
        )

        if (store) {
          setSelectedStore(store)
          return
        }

      }

      // default to first store
      if (storeList.length > 0) {

        setSelectedStore(storeList[0])

        localStorage.setItem(
          "selectedStoreId",
          storeList[0].id
        )

      }

    } catch (err) {

      console.error("Failed to load stores", err)

    }

  }

  useEffect(() => {
    fetchStores()
  }, [])

  // update localStorage whenever store changes
  useEffect(() => {

    if (selectedStore) {

      localStorage.setItem(
        "selectedStoreId",
        selectedStore.id
      )

    }

  }, [selectedStore])

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