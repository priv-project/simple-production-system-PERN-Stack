import express from 'express';
import pool from '#root/db/index.js';

const router = express.Router();

export const getProduct = async (req, res) => {
    try {
        let result = await pool.query(`SELECT * FROM vw_product ORDER BY product_code, model_code`);
        result = result.rows;
        res.status(201).json({ result });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

export const createProduct = async (req, res) => {
    const { product_code, product_description, product_model_id, product_remark } = req.body;

    try {
        const lastInsertId = await pool.query(
            `INSERT INTO product (product_code, product_description, product_model_id, product_remark) 
            VALUES ($1, $2, $3, $4) RETURNING product_id`,
            [product_code, product_description, product_model_id, product_remark]
        );
        const result = await getProductById(lastInsertId.rows[0].product_id);
        return res.status(201).json({ result });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { product_code, product_description, product_model_id, product_status, product_remark } = req.body;

    try {
        let result = await getProductById(id);
        if (!result) return res.status(404).json({ message: `No product with id: ${id}` });

        await pool.query(
            `UPDATE product SET product_code = $1, product_description = $2, product_model_id = $3, product_status = $4, product_remark = $5, product_updated_at = NOW() WHERE product_id = ${id}`,
            [product_code, product_description, product_model_id, product_status, product_remark]
        );

        result = await getProductById(id);
        res.json({ result });
    } catch (error) {
        return res.status(409).json({ message: 'Something went wrong', error });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`DELETE FROM product WHERE product_id = $1`, [id]);
        res.status(201).json({ result: result.rowCount });
    } catch (error) {
        res.status(404).json({ message: 'Something went wrong', error });
    }
};

const getProductById = async (id) => {
    const result = await pool.query(`SELECT * FROM product WHERE product_id = $1`, [id]);
    return result.rows[0];
};

export default router;
