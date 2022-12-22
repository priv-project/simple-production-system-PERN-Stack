import express from "express";

import {
  getProductCustomers,
  createProductCustomer,
  updateProductCustomer,
  deleteProductCustomer,
} from "../controllers/index.js";

const router = express.Router();

router.get("/", getProductCustomers);
router.post("/", createProductCustomer);
router.patch("/:id", updateProductCustomer);
router.delete("/:id", deleteProductCustomer);

export default router;
