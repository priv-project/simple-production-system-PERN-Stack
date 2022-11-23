import express from "express";
import pool from "../../../../db/index.js";
const router = express.Router();

export const getModel = async (req, res) => {
	try {
		let result = await pool.query(`SELECT * FROM model ORDER BY model_code`);
		result = result.rows;
		res.status(201).json({ result });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong", error });
	}
};

export const createModel = async (req, res) => {
	const { model_code, model_description } = req.body;
	try {
		const oldModel = await pool.query(
			"SELECT * FROM model WHERE model_code = $1",
			[model_code]
		);
		if (oldModel.rowCount > 0)
			return res.status(500).json({ message: "Model already exist!" });
		const lastInsertId = await pool.query(
			`INSERT INTO model (model_code, model_description) VALUES ($1, $2) RETURNING model_id`,
			[model_code, model_description]
		);
		const result = await getModelById(lastInsertId.rows[0].model_id);
		return res.status(201).json({ result });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong", error });
	}
};

export const updateModel = async (req, res) => {
	const { id } = req.params;
	const { model_code, model_description, model_status } = req.body;

	try {
		const model = await getModelById(id);
		if (!model)
			return res.status(404).json({ message: `No model with id: ${id}` });

		await pool.query(
			`UPDATE model SET model_code = $1, model_description = $2, model_status = $3, model_updated_at = NOW() WHERE model_id = ${id}`,
			[model_code, model_description, model_status]
		);
		let result = await getModelById(id);
		res.json({ result });
	} catch (error) {
		return res.status(409).json({ message: "Something went wrong", error });
	}
};

export const deleteModel = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await pool.query(`DELETE FROM model WHERE model_id = $1`, [
			id,
		]);
		res.status(201).json({ result: result.rowCount });
	} catch (error) {
		res.status(404).json({ message: "Something went wrong", error });
	}
};

const getModelById = async (id) => {
	const result = await pool.query(`SELECT * FROM model WHERE model_id = $1`, [
		id,
	]);
	return result.rows[0];
};

export default router;
