import express from 'express';

import { getAssembly, createAssembly, updateAssembly, deleteAssembly } from '../controllers/index.js';

const router = express.Router();

router.get('/', getAssembly);
router.post('/', createAssembly);
router.patch('/:id', updateAssembly);
router.delete('/:id', deleteAssembly);

export default router;
