const categories = [

  { name: "All", emoji: "🛒" },
  { name: "Dairy", emoji: "🥛" },
  { name: "Fruits", emoji: "🍎" },
  { name: "Snacks", emoji: "🍪" },
  { name: "Drinks", emoji: "🥤" },
  { name: "Bakery", emoji: "🥐" },
  { name: "Vegetables", emoji: "🥦" },
  { name: "Ice Cream", emoji: "🍨" },
  { name: "Meat", emoji: "🍗" }

]

function Categories({ selectedCategory, setSelectedCategory }) {

  return (

    <div className="max-w-7xl mx-auto px-6 mt-8">

      <h2 className="text-xl font-semibold mb-4">
        Categories
      </h2>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">

        {categories.map((cat) => (

          <div
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`bg-white shadow rounded-xl p-4 text-center cursor-pointer hover:shadow-md transition

              ${selectedCategory === cat.name
                ? "border-2 border-green-600"
                : ""
              }

            `}
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