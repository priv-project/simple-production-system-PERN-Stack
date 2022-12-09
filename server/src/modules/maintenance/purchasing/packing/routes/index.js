import express from "express";

import {
  getPackings,
  createPacking,
  updatePacking,
  deletePacking,
} from "../controllers/index.js";

const router = express.Router();

router.get("/", getPackings);
router.post("/", createPacking);
router.patch("/:id", updatePacking);
router.delete("/:id", deletePacking);

export default router;
