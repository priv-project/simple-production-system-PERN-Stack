import express from 'express';

import { getModel, createModel, updateModel, deleteModel } from '../controllers/index.js';

const router = express.Router();
router.get('/', getModel);
router.post('/', createModel);
router.patch('/:id', updateModel);
router.delete('/:id', deleteModel);

export default router;
