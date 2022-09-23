import express from "express";
const router = express.Router();

import {
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/index.js";
router.get("/", getProduct);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
