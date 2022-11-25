import express from 'express';

import { getPart, createPart, updatePart, deletePart } from '../controllers/index.js';

const router = express.Router();

router.get('/', getPart);
router.post('/', createPart);
router.patch('/:id', updatePart);
router.delete('/:id', deletePart);

export default router;
