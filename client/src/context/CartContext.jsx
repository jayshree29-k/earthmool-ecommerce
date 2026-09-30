import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getProducts } from "../services/productService";
import {
  clampQuantity,
  getProductStock,
} from "../utils/productStock";

const CartContext = createContext();

// ==========================================
// GET PRODUCT ID
// Supports both MongoDB (_id) and old data (id)
// ==========================================

const getProductId = (product) => {
  return product._id || product.id;
};

export function CartProvider({ children }) {
  // ==========================================
  // LOAD CART FROM LOCAL STORAGE
  // ==========================================

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart =
        localStorage.getItem("earthmool-cart");

      return savedCart
        ? JSON.parse(savedCart)
        : [];
    } catch (error) {
      console.error(
        "Unable to load cart:",
        error
      );

      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRefreshingStock, setIsRefreshingStock] = useState(() => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("earthmool-cart") || "[]"
      );

      return savedCart.length > 0;
    } catch {
      return false;
    }
  });

  const openCart = () => setIsCartOpen(true);

  const closeCart = () => setIsCartOpen(false);

  // ==========================================
  // SAVE CART TO LOCAL STORAGE
  // ==========================================

  useEffect(() => {
    try {
      localStorage.setItem(
        "earthmool-cart",
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error(
        "Unable to save cart:",
        error
      );
    }
  }, [cartItems]);

  useEffect(() => {
    if (cartItems.length === 0) {
      return undefined;
    }

    let isActive = true;

    getProducts()
      .then((products) => {
        if (!isActive) {
          return;
        }

        const productsById = new Map(
          products.map((product) => [
            String(getProductId(product)),
            product,
          ])
        );

        setCartItems((previousItems) =>
          previousItems.map((item) => {
            const currentProduct = productsById.get(
              String(getProductId(item))
            );

            if (!currentProduct) {
              return item;
            }

            const stock = getProductStock(currentProduct);

            return {
              ...item,
              stock,
              quantity: clampQuantity(item.quantity, stock),
            };
          })
        );
      })
      .catch((error) => {
        console.error("Unable to refresh cart stock:", error);
      })
      .finally(() => {
        if (isActive) {
          setIsRefreshingStock(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [cartItems.length]);

  // ==========================================
  // ADD TO CART
  // ==========================================

  const addToCart = (
    product,
    quantity = 1
  ) => {
    const stock = getProductStock(product);

    if (stock === 0) {
      return;
    }

    if (cartItems.length === 0) {
      setIsRefreshingStock(true);
    }

    const productId =
      getProductId(product);

    if (!productId) {
      console.error(
        "Product ID is missing:",
        product
      );

      return;
    }

    setCartItems((previousItems) => {
      const existingItem =
        previousItems.find(
          (item) =>
            getProductId(item) === productId
        );

      // ========================================
      // PRODUCT ALREADY EXISTS
      // ========================================

      if (existingItem) {
        return previousItems.map((item) =>
          getProductId(item) === productId
            ? {
                ...item,
                ...product,
                quantity: clampQuantity(
                  Number(item.quantity) + Number(quantity),
                  stock
                ),
              }
            : item
        );
      }

      // ========================================
      // NEW PRODUCT
      // ========================================

      return [
        ...previousItems,
        {
          ...product,

          // Keep quantity in cart
          quantity: clampQuantity(quantity, stock),
        },
      ];
    });
  };

  // ==========================================
  // REMOVE FROM CART
  // ==========================================

  const removeFromCart = (
    productId
  ) => {
    if (cartItems.length <= 1) {
      setIsRefreshingStock(false);
    }
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) =>
          String(getProductId(item)) !== String(productId)
      )
    );
  };

  // ==========================================
  // UPDATE QUANTITY
  // ==========================================

  const updateQuantity = (
    productId,
    quantity
  ) => {
    setCartItems((previousItems) =>
      previousItems.map((item) =>
        getProductId(item) === productId
          ? {
              ...item,
              quantity: clampQuantity(
                quantity,
                getProductStock(item)
              ),
            }
          : item
      )
    );
  };

  // ==========================================
  // CLEAR CART
  // ==========================================

  const clearCart = () => {
    setIsRefreshingStock(false);
    setCartItems([]);
  };

  // ==========================================
  // CART COUNT
  // ==========================================

  const cartCount = cartItems.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  // ==========================================
  // CART SUBTOTAL
  // ==========================================

  const cartSubtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  // ==========================================
  // CONTEXT VALUE
  // ==========================================

  const value = {
    cartItems,

    addToCart,

    removeFromCart,

    updateQuantity,

    clearCart,

    cartCount,

    cartSubtotal,

    isCartOpen,

    isRefreshingStock,

    openCart,

    closeCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// ==========================================
// USE CART HOOK
// ==========================================

export function useCart() {
  return useContext(CartContext);
}