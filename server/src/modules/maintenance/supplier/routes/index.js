import express from "express";
const router = express.Router();

import {
	getPart,
	createPart,
	updatePart,
	deletePart,
} from "../controllers/index.js";

router.get("/", getPart);
router.post("/", createPart);
router.patch("/:id", updatePart);
router.delete("/:id", deletePart);

export default router;
