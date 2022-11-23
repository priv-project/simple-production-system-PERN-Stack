import express from "express";
const router = express.Router();

import {
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/index.js";

import {
	getProductParts,
	createProductPart,
	getProductBom,
} from "../controllers/product_parts.js";

router.get("/", getProduct);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

router.get("/product-parts/:id", getProductParts);
router.get("/product-bom/:id", getProductBom);
router.post("/product-parts/:id", createProductPart);
export default router;
