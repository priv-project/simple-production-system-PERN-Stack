import express from "express";
import pool from "#root/db/index.js";

const router = express.Router();

export const getPackings = async (req, res) => {
  try {
    let result = await pool.query(
      `SELECT * FROM packing ORDER BY packing_code`
    );
    result = result.rows;
    res.status(201).json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const createPacking = async (req, res) => {
  const { packing_code, packing_desc } = req.body;

  try {
    const lastInsertId = await pool.query(
      `INSERT INTO packing (packing_code, packing_desc) 
				VALUES ($1, $2) RETURNING packing_id`,
      [packing_code, packing_desc]
    );
    const result = await getPackingById(lastInsertId.rows[0].packing_id);
    res.status(201).json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const updatePacking = async (req, res) => {
  const { id } = req.params;
  const { packing_code, packing_desc } = req.body;

  try {
    let result = await getPackingById(id);
    if (!result)
      return res.status(404).json({ message: `No packing with id: ${id}` });

    await pool.query(
      `UPDATE packing SET 
				packing_code = $1, 
				packing_desc = $2, 
				packing_updated_at = NOW() WHERE packing_id = ${id}`,
      [packing_code, packing_desc]
    );
    result = await getPackingById(id);
    res.json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const deletePacking = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM packing WHERE packing_id = $1`,
      [id]
    );
    res.status(201).json({ result: result.rowCount });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong", error });
  }
};

const getPackingById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM packing WHERE packing_id = $1`,
    [id]
  );
  return result.rows[0];
};

export default router;
