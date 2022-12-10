import express from "express";
import pool from "#root/db/index.js";

const router = express.Router();

export const getCustomers = async (req, res) => {
  try {
    let result = await pool.query(
      `SELECT * FROM customer ORDER BY customer_code`
    );
    result = result.rows;
    res.status(201).json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const createCustomer = async (req, res) => {
  const {
    customer_code,
    customer_desc,
    customer_street,
    customer_city,
    customer_country_id,
    customer_contact,
    customer_email,
  } = req.body;

  try {
    const lastInsertId = await pool.query(
      `INSERT INTO customer (
			customer_code,
			customer_desc,
			customer_street,
			customer_city,
			customer_country_id,
			customer_contact,
			customer_email
		) 
		VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING customer_id`,
      [
        customer_code,
        customer_desc,
        customer_street,
        customer_city,
        customer_country_id,
        customer_contact,
        customer_email,
      ]
    );
    const result = await getCustomerById(lastInsertId.rows[0].customer_id);
    res.status(201).json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const {
    customer_code,
    customer_desc,
    customer_street,
    customer_city,
    customer_country_id,
    customer_contact,
    customer_email,
  } = req.body;

  try {
    let result = await getCustomerById(id);
    if (!result)
      return res.status(404).json({ message: `No customer with id: ${id}` });

    await pool.query(
      `UPDATE customer SET 
			customer_code = $1,
			customer_desc = $2,
			customer_street = $3,
			customer_city = $4,
			customer_country_id = $5,
			customer_contact = $6,
			customer_email = $7,
			customer_updated_at = NOW() WHERE customer_id = ${id}`,
      [
        customer_code,
        customer_desc,
        customer_street,
        customer_city,
        customer_country_id,
        customer_contact,
        customer_email,
      ]
    );
    result = await getCustomerById(id);
    res.json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM customer WHERE customer_id = $1`,
      [id]
    );
    res.status(201).json({ result: result.rowCount });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong", error });
  }
};

const getCustomerById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM customer WHERE customer_id = $1`,
    [id]
  );
  return result.rows[0];
};

export default router;
