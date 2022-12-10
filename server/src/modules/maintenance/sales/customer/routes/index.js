import express from "express";

import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/index.js";

const router = express.Router();

router.get("/", getCustomers);
router.post("/", createCustomer);
router.patch("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
