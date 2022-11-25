import express from "express";

import {
  getPartSuppliers,
  createPartSupplier,
  updatePartSupplier,
  deletePartSupplier,
} from "../controllers/index.js";

const router = express.Router();

router.get("/", getPartSuppliers);
router.post("/", createPartSupplier);
router.patch("/:id", updatePartSupplier);
router.delete("/:id", deletePartSupplier);

export default router;
