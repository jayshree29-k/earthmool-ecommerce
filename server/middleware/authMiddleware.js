const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const unauthorized = (res, message) =>
  res.status(401).json({ success: false, message });

const authenticateAdmin = async (req, res, next) => {
  const authorization = req.get("authorization");

  if (!authorization) {
    return unauthorized(res, "Authentication required.");
  }

  const match = authorization.match(/^Bearer\s+(.+)$/i);

  if (!match || !process.env.JWT_SECRET) {
    return unauthorized(res, "Invalid or expired token.");
  }

  let payload;

  try {
    payload = jwt.verify(match[1], process.env.JWT_SECRET);
  } catch {
    return unauthorized(res, "Invalid or expired token.");
  }

  try {
    const admin = await Admin.findById(payload.sub)
      .select("name email role isActive");

    if (!admin || !admin.isActive) {
      return unauthorized(res, "Invalid or expired token.");
    }

    if (admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    req.admin = admin;
    return next();
  } catch {
    return res.status(500).json({
      success: false,
      message: "Unable to authenticate admin.",
    });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.admin?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required.",
    });
  }

  return next();
};

module.exports = { authenticateAdmin, requireAdmin };