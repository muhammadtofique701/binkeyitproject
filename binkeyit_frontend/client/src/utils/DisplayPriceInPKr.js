const DisplayPriceInPKr = (price) => {
  if (typeof price !== 'number') return "Invalid Price";

  return price.toLocaleString('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 2
  });
};

export default DisplayPriceInPKr;
