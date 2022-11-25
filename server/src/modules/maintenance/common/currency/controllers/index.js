import express from "express";
import pool from "#root/db/index.js";

const router = express.Router();

export const getCurrencys = async (req, res) => {
  try {
    let result = await pool.query(
      `SELECT * FROM currency ORDER BY currency_code`
    );
    result = result.rows;
    res.status(201).json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const createCurrency = async (req, res) => {
  const {
    currency_code,
    currency_desc,
    currency_symbol,
    // currency_flag
  } = req.body;

  try {
    const lastInsertId = await pool.query(
      `INSERT INTO currency (currency_code, currency_desc, currency_symbol) 
				VALUES ($1, $2, $3) RETURNING currency_id`,
      [currency_code, currency_desc, currency_symbol]
    );
    const result = await getCurrencyById(lastInsertId.rows[0].currency_id);
    res.status(201).json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const updateCurrency = async (req, res) => {
  const { id } = req.params;
  const { currency_code, currency_desc, currency_symbol } = req.body;

  try {
    let result = await getCurrencyById(id);
    if (!result)
      return res.status(404).json({ message: `No currency with id: ${id}` });

    await pool.query(
      `UPDATE currency SET 
				currency_code = $1,
				currency_desc = $2,
				currency_symbol = $3, 
				currency_updated_at = NOW() WHERE currency_id = ${id}`,
      [currency_code, currency_desc, currency_symbol]
    );
    result = await getCurrencyById(id);
    res.json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const deleteCurrency = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM currency WHERE currency_id = $1`,
      [id]
    );
    res.status(201).json({ result: result.rowCount });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong", error });
  }
};

const getCurrencyById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM currency WHERE currency_id = $1`,
    [id]
  );
  return result.rows[0];
};

export default router;
