const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

const roundCurrency = (amount) =>
  Math.round((amount + Number.EPSILON) * 100) / 100;

const createOrderError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// ==========================================
// CREATE ORDER
// POST /api/orders
// ==========================================

const createOrder = async (req, res) => {
  let session;

  try {
    const {
      customer,
      shippingAddress,
      items,
      paymentMethod,
    } = req.body || {};

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!customer || typeof customer !== "object") {
      return res.status(400).json({
        success: false,
        message: "Customer information is required.",
      });
    }

    if (!shippingAddress || typeof shippingAddress !== "object") {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required.",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    const requestedItems = items.map((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        throw createOrderError("Each cart item must be a product.");
      }

      const productId = item?.productId || item?.id;

      if (
        typeof productId !== "string" ||
        !/^[a-f\d]{24}$/i.test(productId)
      ) {
        throw createOrderError("A valid product ID is required.");
      }

      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        throw createOrderError(
          "Product quantity must be a positive integer."
        );
      }

      return {
        productId,
        quantity: item.quantity,
      };
    });

    const quantitiesByProduct = new Map();

    requestedItems.forEach(({ productId, quantity }) => {
      const normalizedId = productId.toLowerCase();
      quantitiesByProduct.set(
        normalizedId,
        (quantitiesByProduct.get(normalizedId) || 0) + quantity
      );
    });

    session = await mongoose.startSession();
    let order;

    await session.withTransaction(async () => {
      const products = await Product.find({
        _id: {
          $in: [...quantitiesByProduct.keys()],
        },
      })
        .session(session)
        .lean();

      const productsById = new Map(
        products.map((product) => [
          String(product._id).toLowerCase(),
          product,
        ])
      );

      for (const productId of quantitiesByProduct.keys()) {
        if (!productsById.has(productId)) {
          throw createOrderError("Product not found.");
        }

        const product = productsById.get(productId);

        if (!product.isActive) {
          throw createOrderError(
            "This product is currently unavailable."
          );
        }
      }

      for (const [productId, quantity] of quantitiesByProduct) {
        const product = productsById.get(productId);
        const availableStock = Number(product.stock || 0);

        if (availableStock < quantity) {
          throw createOrderError(
            `Only ${availableStock} units of ${product.name} are available.`
          );
        }
      }

      const orderItems = requestedItems.map(({ productId, quantity }) => {
        const product = productsById.get(productId.toLowerCase());
        const price = Number(product.price);

        return {
          productId: String(product._id),
          name: product.name,
          slug: product.slug,
          image: product.image,
          price,
          quantity,
          total: roundCurrency(price * quantity),
        };
      });

      const subtotal = roundCurrency(
        orderItems.reduce((sum, item) => sum + item.total, 0)
      );
      const shipping = subtotal >= 499 ? 0 : 49;
      const total = roundCurrency(subtotal + shipping);

      for (const [productId, quantity] of quantitiesByProduct) {
        const result = await Product.updateOne(
          {
            _id: productId,
            isActive: true,
            stock: { $gte: quantity },
          },
          {
            $inc: { stock: -quantity },
          },
          { session }
        );

        if (result.modifiedCount !== 1) {
          throw createOrderError(
            "Stock changed while placing your order. Please review your cart and try again.",
            409
          );
        }
      }

      [order] = await Order.create(
        [
          {
            customer,
            shippingAddress,
            items: orderItems,
            subtotal,
            shipping,
            total,
            paymentMethod: paymentMethod || "online",
            paymentStatus: "pending",
            orderStatus: "pending",
          },
        ],
        { session }
      );
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(201).json({
      success: true,

      message: "Order created successfully.",

      order: {
        id: order._id,

        orderNumber: order._id
          .toString()
          .slice(-8)
          .toUpperCase(),

        total: order.total,

        status: order.orderStatus,

        paymentStatus: order.paymentStatus,

        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error(
      "Create order error:",
      error
    );

    const statusCode =
      error.statusCode ||
      (error.name === "ValidationError" ? 400 : 500);

    res.status(statusCode).json({
      success: false,
      message:
        error.statusCode || error.name === "ValidationError"
          ? error.message
          : "Unable to create order.",
      ...(statusCode === 500 && { error: error.message }),
    });
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

// ==========================================
// GET ALL ORDERS
// GET /api/orders
// ==========================================

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({
        createdAt: -1,
      })
      .lean();

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error(
      "Get orders error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to fetch orders.",
      error: error.message,
    });
  }
};

// ==========================================
// GET SINGLE ORDER
// GET /api/orders/:id
// ==========================================

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    ).lean();

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(
      "Get order error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to fetch order.",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE ORDER STATUS
// PATCH /api/orders/:id/status
// ==========================================

const updateOrderStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    // ==========================================
    // ALLOWED STATUS VALUES
    // ==========================================

    const allowedStatuses = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Order status is required.",
      });
    }

    const normalizedStatus =
      String(status).toLowerCase();

    if (
      !allowedStatuses.includes(
        normalizedStatus
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });
    }

    // ==========================================
    // FIND ORDER
    // ==========================================

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // ==========================================
    // UPDATE STATUS
    // ==========================================

    order.orderStatus =
      normalizedStatus;

    await order.save();

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(200).json({
      success: true,

      message:
        "Order status updated successfully.",

      order,
    });
  } catch (error) {
    console.error(
      "Update order status error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to update order status.",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE PAYMENT STATUS
// PATCH /api/orders/:id/payment-status
// ==========================================

const updatePaymentStatus = async (
  req,
  res
) => {
  try {
    const { paymentStatus } = req.body;

    const allowedStatuses = [
      "pending",
      "paid",
      "failed",
    ];

    if (!paymentStatus) {
      return res.status(400).json({
        success: false,
        message:
          "Payment status is required.",
      });
    }

    const normalizedStatus =
      String(paymentStatus).toLowerCase();

    if (
      !allowedStatuses.includes(
        normalizedStatus
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid payment status.",
      });
    }

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    order.paymentStatus =
      normalizedStatus;

    await order.save();

    res.status(200).json({
      success: true,

      message:
        "Payment status updated successfully.",

      order,
    });
  } catch (error) {
    console.error(
      "Update payment status error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to update payment status.",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE ORDER
// DELETE /api/orders/:id
// ==========================================

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    await Order.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Order deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete order error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to delete order.",
      error: error.message,
    });
  }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder,
};