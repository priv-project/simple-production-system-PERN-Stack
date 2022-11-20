import express from "express";
import pool from "../../../../db/index.js";
const router = express.Router();

export const getProductParts = async (req, res) => {
	const { id } = req.params;
	try {
		let result = await pool.query(
			`SELECT * FROM vw_product_parts WHERE prod_part_product_id = $1 ORDER BY product_code, part_code`,
			[id]
		);
		result = result.rows;
		res.status(201).json({ result });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong", error });
	}
};

export const createProductPart = async (req, res) => {
	const { id } = req.params;
	console.log(id);
	const { part_id, part_usage } = req.body;

	try {
		// 	const lastInsertId = await pool.query(
		// 		`INSERT INTO product_part (prod_part_part_id, prod_part_product_id, prod_part_usage)
		//           VALUES ($1, $2, $3) RETURNING prod_part_product_id`,
		// 		[part_id, id, part_usage]
		// 	);
		// 	const result = await getProductById(
		// 		lastInsertId.rows[0].prod_part_product_id
		// 	);
		// 	return res.status(201).json({ result });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong", error });
	}
};

const getProductById = async (id) => {
	const result = await pool.query(
		`SELECT * FROM products WHERE product_id = $1`,
		[id]
	);
	return result.rows[0];
};

export default router;
