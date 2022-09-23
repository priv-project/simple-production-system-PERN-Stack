import express from "express";
const router = express.Router();

import {
	getAssembly,
	createAssembly,
	updateAssembly,
	deleteAssembly,
} from "../controllers/index.js";

router.get("/", getAssembly);
router.post("/", createAssembly);
router.patch("/:id", updateAssembly);
router.delete("/:id", deleteAssembly);

export default router;
