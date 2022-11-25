import express from "express";

import {
  getCurrencys,
  createCurrency,
  updateCurrency,
  deleteCurrency,
} from "../controllers/index.js";

const router = express.Router();

router.get("/", getCurrencys);
router.post("/", createCurrency);
router.patch("/:id", updateCurrency);
router.delete("/:id", deleteCurrency);

export default router;
