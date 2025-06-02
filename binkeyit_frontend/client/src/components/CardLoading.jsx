import React from 'react'

const CardLoading = () => {
  return (
    <div className="border border-neutral-200 p-3 lg:p-4 grid gap-2 lg:gap-3 mix-w-46 lg:min-w-52 rounded hover:shadow-sm transition bg-white animate-pulse">
      {/* Image Placeholder */}
      <div className="min-h-20 lg:min-h-28 bg-blue-50 rounded"></div>

      {/* Time badge */}
      <div className="h-4 w-20 bg-blue-50 rounded"></div>

      {/* Product title */}
      <div className="h-5 bg-blue-100 rounded"></div>

      {/* Unit info */}
      <div className="h-4 w-14 bg-blue-100 rounded"></div>

      {/* Price & Button */}
      <div className="grid grid-cols-2 gap-3">
        <div className="h-6 bg-blue-50 rounded"></div>
        <div className="h-6 bg-blue-50 rounded"></div>
      </div>
    </div>
  )
}

export default CardLoading
