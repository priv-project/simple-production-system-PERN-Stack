import express from "express";
import pool from "#root/db/index.js";

const router = express.Router();

export const getAreas = async (req, res) => {
  try {
    let result = await pool.query(`SELECT * FROM area ORDER BY area_code`);
    result = result.rows;
    res.status(201).json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const createArea = async (req, res) => {
  const { area_code, area_desc } = req.body;

  try {
    const lastInsertId = await pool.query(
      `INSERT INTO area (area_code, area_desc) 
				VALUES ($1, $2) RETURNING area_id`,
      [area_code, area_desc]
    );
    const result = await getAreaById(lastInsertId.rows[0].area_id);
    res.status(201).json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const updateArea = async (req, res) => {
  const { id } = req.params;
  const { area_code, area_desc, area_status } = req.body;

  try {
    let result = await getAreaById(id);
    if (!result)
      return res.status(404).json({ message: `No area with id: ${id}` });

    await pool.query(
      `UPDATE area SET 
				area_code = $1,
				area_desc = $2,
				area_status = $3, 
				area_updated_at = NOW() WHERE area_id = ${id}`,
      [area_code, area_desc, area_status]
    );
    result = await getAreaById(id);
    res.json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const deleteArea = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`DELETE FROM area WHERE area_id = $1`, [
      id,
    ]);
    res.status(201).json({ result: result.rowCount });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong", error });
  }
};

const getAreaById = async (id) => {
  const result = await pool.query(`SELECT * FROM area WHERE area_id = $1`, [
    id,
  ]);
  return result.rows[0];
};

export default router;
