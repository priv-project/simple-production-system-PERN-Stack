import express from 'express';

import { getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/index.js';

import { getProductParts, createProductPart, getProductBom } from '../controllers/product_parts.js';

const router = express.Router();

router.get('/', getProduct);
router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

router.get('/product-parts/:id', getProductParts);
router.get('/product-bom/:id', getProductBom);
router.post('/product-parts/:id', createProductPart);
export default router;
