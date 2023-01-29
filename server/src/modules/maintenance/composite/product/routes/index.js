import express from "express";

import {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/index.js";
import {
  getProductParts,
  createProductPart,
  getParts,
  deleteProductPart,
} from "../controllers/product_parts.js";

const router = express.Router();

router.get("/", getProduct);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

router.get("/part/:id", getParts);
router.get("/product-parts/:id", getProductParts);
router.post("/product-parts/:id", createProductPart);
router.delete("/product-parts/:id", deleteProductPart);
export default router;
