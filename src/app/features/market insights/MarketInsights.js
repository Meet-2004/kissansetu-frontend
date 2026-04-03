export default function MarketInsights(){

    return(
        <>
{/* MARKET INSIGHTS */}

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-black">Market Insights</h2>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 mb-4">
          <div>
            <p className="text-gray-500 text-xs sm:text-sm ">LIVE AUCTIONS COUNT</p>
            <h3 className="text-xl sm:text-2xl font-bold text-black">87</h3>
          </div>

          <div>
            <p className="text-gray-500 text-xs sm:text-sm">TOP TRADED CROP</p>
            <h3 className="text-lg sm:text-xl font-bold text-black">Basmati Rice</h3>
          </div>
        </div>

        {/* SCROLLING MARKET RATES */}
        <div className="overflow-hidden border-t pt-3 sm:pt-4">
          <div className="marquee flex gap-6 sm:gap-10 whitespace-nowrap text-xs sm:text-sm text-black cursor-pointer">
            {[...Array(10)].map((_, i) => (
              <span key={i}>
                Wheat ₹2,150 ↑ 2.5% | Cotton ₹8,500 ↓ 1.2% | Soybean ₹4,200 ↑ 1.5%
              </span>
            ))}
          </div>
        </div>
      </div>
      </>
    )
}