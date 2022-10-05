import express from "express";
import pool from "../../../../db/index.js";
const router = express.Router();

export const getPart = async (req, res) => {
	try {
		let result = await pool.query(`SELECT * FROM vw_parts ORDER BY part_code`);
		result = result.rows;
		res.status(201).json({ result });
	} catch (error) {
		res.status(409).json({ message: "Something went wrong", error });
	}
};

export const createPart = async (req, res) => {
	const { part_code, part_name, part_description, part_model_id, part_remark } =
		req.body;

	try {
		const lastInsertId = await pool
			.query(
				`INSERT INTO parts (part_code, part_name, part_description, part_model_id, part_remark) VALUES ($1, $2, $3, $4, $5) RETURNING part_id`,
				[part_code, part_name, part_description, part_model_id, part_remark]
			)
			.catch((e) => {
				console.log(e);
			});
		const result = await getPartById(lastInsertId.rows[0].part_id);
		res.status(201).json({ result });
	} catch (error) {
		res.status(409).json({ message: "Something went wrong", error });
	}
};

export const updatePart = async (req, res) => {
	const { id } = req.params;
	const {
		part_code,
		part_name,
		part_description,
		part_model_id,
		part_remark,
		part_status,
	} = req.body;

	try {
		let result = await getPartById(id);
		if (!result)
			return res.status(404).json({ message: `No part with id: ${id}` });

		await pool
			.query(
				`UPDATE parts SET part_code = $1, part_name = $2, part_description = $3, part_model_id = $4, part_remark = $5, part_status= $6, part_updated_at = NOW() WHERE part_id = ${id}`,
				[
					part_code,
					part_name,
					part_description,
					part_model_id,
					part_remark,
					part_status,
				]
			)
			.catch((e) => {
				console.log(e);
			});
		result = await getPartById(id);
		res.json({ result });
	} catch (error) {
		res.status(409).json({ message: "Something went wrong", error });
	}
};

export const deletePart = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await pool.query(`DELETE FROM parts WHERE part_id = $1`, [
			id,
		]);
		res.status(201).json({ result: result.rowCount });
	} catch (error) {
		res.status(404).json({ message: "Something went wrong", error });
	}
};

const getPartById = async (id) => {
	const result = await pool.query(`SELECT * FROM vw_parts WHERE part_id = $1`, [
		id,
	]);
	return result.rows[0];
};

export default router;
