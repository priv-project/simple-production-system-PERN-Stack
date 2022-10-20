import express from "express";
import pool from "../../../../db/index.js";
const router = express.Router();

export const getProduct = async (req, res) => {
	try {
		let result = await pool.query(
			`SELECT * FROM vw_product_parts ORDER BY product_code`
		);
		result = result.rows;
		res.status(201).json({ result });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong", error });
	}
};

// export const createProduct = async (req, res) => {
// 	const {
// 		product_code,
// 		product_description,
// 		product_model_id,
// 		product_remark,
// 	} = req.body;

// 	try {
// 		const lastInsertId = await pool.query(
// 			`INSERT INTO products (product_code, product_description, product_model_id, product_remark)
//             VALUES ($1, $2, $3, $4) RETURNING product_id`,
// 			[product_code, product_description, product_model_id, product_remark]
// 		);
// 		const result = await getProductById(lastInsertId.rows[0].product_id);
// 		return res.status(201).json({ result });
// 	} catch (error) {
// 		res.status(500).json({ message: "Something went wrong", error });
// 	}
// };

const getProductById = async (id) => {
	const result = await pool.query(
		`SELECT * FROM products WHERE product_id = $1`,
		[id]
	);
	return result.rows[0];
};

export default router;
