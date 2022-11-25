import express from "express";
import pool from "#root/db/index.js";

const router = express.Router();

export const getCountrys = async (req, res) => {
  try {
    let result = await pool.query(
      `SELECT * FROM country ORDER BY country_code`
    );
    result = result.rows;
    res.status(201).json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const createCountry = async (req, res) => {
  const { country_code, country_desc } = req.body;

  try {
    const lastInsertId = await pool.query(
      `INSERT INTO country (country_code, country_desc) 
				VALUES ($1, $2) RETURNING country_id`,
      [country_code, country_desc]
    );
    const result = await getCountryById(lastInsertId.rows[0].country_id);
    res.status(201).json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const updateCountry = async (req, res) => {
  const { id } = req.params;
  const { country_code, country_desc } = req.body;

  try {
    let result = await getCountryById(id);
    if (!result)
      return res.status(404).json({ message: `No country with id: ${id}` });

    await pool.query(
      `UPDATE country SET 
				country_code = $1, 
				country_desc = $2, 
				country_updated_at = NOW() WHERE country_id = ${id}`,
      [country_code, country_desc]
    );
    result = await getCountryById(id);
    res.json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const deleteCountry = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM country WHERE country_id = $1`,
      [id]
    );
    res.status(201).json({ result: result.rowCount });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong", error });
  }
};

const getCountryById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM country WHERE country_id = $1`,
    [id]
  );
  return result.rows[0];
};

export default router;
