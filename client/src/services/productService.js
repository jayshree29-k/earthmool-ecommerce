const API_URL = "http://localhost:5000/api";

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data.products;
};

export const getProductBySlug = async (slug) => {
  const response = await fetch(
    `${API_URL}/products/${slug}`
  );

  if (!response.ok) {
    throw new Error("Product not found");
  }

  const data = await response.json();

  return data.product;
};