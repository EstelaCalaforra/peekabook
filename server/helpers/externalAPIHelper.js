export const transformProduct = (apiData) => ({
  id: apiData.productId,
  name: apiData.productName,
  price: apiData.productPrice,
  stock: apiData.productStock || 0
})
