import express from "express";
const router = express.Router();

import {
	getModel,
	createModel,
	updateModel,
	deleteModel,
} from "../controllers/index.js";
router.get("/", getModel);
router.post("/", createModel);
router.patch("/:id", updateModel);
router.delete("/:id", deleteModel);

export default router;
