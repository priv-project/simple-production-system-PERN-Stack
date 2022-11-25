import express from "express";

import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../controllers/index";

const router = express.Router();

router.get("/", getSuppliers);
router.post("/", createSupplier);
router.patch("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

export default router;
