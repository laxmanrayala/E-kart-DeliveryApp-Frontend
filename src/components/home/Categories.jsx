const categories = [

  { name: "Dairy", emoji: "🥛" },
  { name: "Fruits", emoji: "🍎" },
  { name: "Snacks", emoji: "🍪" },
  { name: "Drinks", emoji: "🥤" },
  { name: "Bakery", emoji: "🥐" },
  { name: "Vegetables", emoji: "🥦" },
  { name: "Ice Cream", emoji: "🍨" },
  { name: "Meat", emoji: "🍗" }

]

function Categories() {

  return (

    <div className="max-w-7xl mx-auto px-6 mt-8">

      <h2 className="text-xl font-semibold mb-4">
        Categories
      </h2>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">

        {categories.map((cat, index) => (

          <div
            key={index}
            className="bg-white shadow rounded-xl p-4 text-center cursor-pointer hover:shadow-md"
          >

            <div className="text-3xl mb-2">
              {cat.emoji}
            </div>

            <div className="text-sm font-medium">
              {cat.name}
            </div>

          </div>

        ))}

      </div>

    </div>

  )

}

export default Categories