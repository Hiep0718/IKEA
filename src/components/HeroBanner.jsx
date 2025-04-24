const HeroBanner = () => {
    return (
      <div className="w-full bg-yellow-50 py-8 px-4 md:py-12 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to IKEA</h1>
          <p className="text-lg mb-6">Affordable home furnishing solutions for everyone</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium">
            Shop now
          </button>
        </div>
      </div>
    )
  }
  
  export default HeroBanner
  