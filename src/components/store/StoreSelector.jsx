import { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"

function StoreSelector() {

  const { stores, selectedStore, setSelectedStore } = useContext(StoreContext)

  return (

    <div className="flex flex-col">

      <span className="text-sm text-gray-500">
        Delivery in 11 minutes
      </span>

      <select
        value={selectedStore?.id || ""}
        onChange={(e) => {

          const store = stores.find(s => s.id === Number(e.target.value))

          setSelectedStore(store)

        }}
        className="font-semibold text-gray-800 bg-transparent outline-none cursor-pointer"
      >

        {stores.map(store => (

          <option key={store.id} value={store.id}>
            {store.name}
          </option>

        ))}

      </select>

    </div>

  )

}

export default StoreSelector