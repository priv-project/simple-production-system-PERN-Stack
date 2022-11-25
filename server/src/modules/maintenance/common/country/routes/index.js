import express from "express";

import {
  getCountrys,
  createCountry,
  updateCountry,
  deleteCountry,
} from "../controllers/index.js";

const router = express.Router();

router.get("/", getCountrys);
router.post("/", createCountry);
router.patch("/:id", updateCountry);
router.delete("/:id", deleteCountry);

export default router;
