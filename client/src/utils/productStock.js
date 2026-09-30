export const getProductStock = (product) => {
  const stock = Number(product?.stock);

  return Number.isFinite(stock)
    ? Math.max(0, Math.floor(stock))
    : 0;
};

export const getStockLabel = (product) => {
  const stock = getProductStock(product);

  if (stock === 0) {
    return "Out of Stock";
  }

  return stock <= 5
    ? `Only ${stock} left`
    : "In Stock";
};

export const clampQuantity = (quantity, stock) => {
  if (stock === 0) {
    return 0;
  }

  const parsedQuantity = Number(quantity);
  const safeQuantity = Number.isFinite(parsedQuantity)
    ? Math.floor(parsedQuantity)
    : 1;

  return Math.min(stock, Math.max(1, safeQuantity));
};

export const hasOutOfStockItems = (items) =>
  items.some((item) => {
    const stock = getProductStock(item);

    return stock === 0 || Number(item.quantity) > stock;
  });