import express from "express";
import pool from "#root/db/index.js";

const router = express.Router();

export const getProductParts = async (req, res) => {
  const { id } = req.params;
  try {
    let result = await pool.query(
      `SELECT * FROM vw_product_part WHERE prod_part_product_id = $1 ORDER BY product_code, part_code`,
      [id]
    );
    result = result.rows;
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const getProductBom = async (req, res) => {
  const { id } = req.params;
  try {
    let result = await pool.query(
      `SELECT * FROM vw_product_part WHERE prod_part_product_id = $1 ORDER BY product_code, part_code`,
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
  const parts = req.body;
  try {
    parts.map(async (e) => {
      await pool.query(
        `INSERT INTO product_part (prod_part_part_id, prod_part_product_id, prod_part_usage)
					VALUES ($1, $2, $3) RETURNING prod_part_product_id`,
        [e.part_id, id, e.part_usage]
      );
    });
    const result = await getProductPartsById(id);
    return res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const deleteProductPart = async (req, res) => {
  const { id } = req.params;
  const arrayOfId = id.split(",");

  try {
    for (const i of arrayOfId) {
      await pool.query(`DELETE FROM product_part WHERE prod_part_id = $1`, [i]);
    }
    res.status(201).json({ result: true });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong", error });
  }
};

const getProductPartsById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM vw_product_part WHERE prod_part_product_id = $1`,
    [id]
  );
  return result.rows;
};

export default router;
