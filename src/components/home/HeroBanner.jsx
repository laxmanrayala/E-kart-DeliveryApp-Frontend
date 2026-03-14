function HeroBanner() {

  return (

    <div className="max-w-7xl mx-auto px-6 mt-6">

      <div className="bg-green-600 text-white rounded-xl p-8 flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold mb-2">
            Delivery in 10 minutes
          </h1>

          <p className="text-lg">
            Fresh groceries at your doorstep
          </p>

        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3081/3081986.png"
          className="h-28"
        />

      </div>

    </div>

  )

}

export default HeroBanner