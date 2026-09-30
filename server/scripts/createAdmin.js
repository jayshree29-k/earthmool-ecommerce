require("dotenv").config();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

const createAdmin = async () => {
  const name = process.env.ADMIN_NAME?.trim();
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!name || !email || !password || password.length < 12) {
    throw new Error(
      "Set ADMIN_NAME, ADMIN_EMAIL, and an ADMIN_PASSWORD of at least 12 characters."
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("ADMIN_EMAIL must be a valid email address.");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const existingAdmin = await Admin.findOne({ email });

  if (existingAdmin) {
    console.log("An admin with this email already exists; no changes made.");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await Admin.create({
    name,
    email,
    password: hashedPassword,
    role: "admin",
    isActive: true,
  });

  console.log(`Admin account created for ${email}.`);
};

createAdmin()
  .catch((error) => {
    console.error("Unable to create admin:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });
