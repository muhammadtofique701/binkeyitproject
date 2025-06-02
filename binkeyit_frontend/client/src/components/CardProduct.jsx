import React from 'react';
import DisplayPriceInPKr from '../utils/DisplayPriceInPKr';
import { Link } from 'react-router-dom';
import { validURLConvert } from '../utils/validURLConvert';
import { PriceWithDiscount } from '../utils/PriceWithDiscount';
import { useState } from 'react';
import AddToCartButton from '../components/AddToCartButton';
const CardProduct = ({ data }) => {
  if (!data) return null; // Defensive check

  const productUrl = `/product/${validURLConvert(data.name)}-${data._id}`;
  const discountedPrice = PriceWithDiscount(data.price, data.discount);


  return (
    <Link
      to={productUrl}
      className="border border-neutral-200 p-3 lg:p-4 grid gap-2 lg:gap-3 max-w-46 lg:min-w-52 rounded hover:shadow-sm transition bg-white"
    >
      {/* Image */}
      <div className="min-h-20 max-h-28 lg:max-h-36 w-full bg-white rounded flex items-center justify-center">
        <img
          src={data.image?.[0] || '/placeholder.png'}
          alt={data.name || 'Product Image'}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Time & Discount Tag */}
      <div className="flex items-center gap-2">
        <span className="bg-blue-50 rounded-full text-xs lg:text-sm w-fit px-3 py-[2px] text-green-600">
          10 mins
        </span>
        {data.discount > 0 && (
          <span className="text-green-600 bg-green-100 px-2 py-[1px] w-fit text-xs rounded">
            {data.discount}% OFF
          </span>
        )}
      </div>

      {/* Name */}
      <h3 className="font-medium text-sm line-clamp-2">
        {data.name}
      </h3>

      {/* Unit */}
      <p className="text-xs lg:text-sm text-gray-600">
        {data.unit}
      </p>

      {/* Price & Add/Out of Stock */}
      <div className="flex items-center justify-between gap-3 mt-1">
        <div className="font-semibold text-sm">
          {DisplayPriceInPKr(discountedPrice)}
        </div>
        {data.stock === 0 ? (
          <p className="text-sm text-red-500">Out of Stock</p>
        ) : (
          <AddToCartButton data={data}/>
        )}
      </div>
    </Link>
  );
};

export default CardProduct;
