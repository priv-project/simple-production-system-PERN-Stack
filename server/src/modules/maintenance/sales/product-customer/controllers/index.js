import express from "express";
import pool from "#root/db/index.js";

const router = express.Router();

export const getProductCustomers = async (req, res) => {
  try {
    let result = await pool.query(
      `SELECT * FROM vw_product_customer ORDER BY customer_code`
    );
    result = result.rows;
    res.status(201).json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const createProductCustomer = async (req, res) => {
  const { prod_cust_product_id, prod_cust_customer_id } = req.body;

  try {
    const lastInsertId = await pool.query(
      `INSERT INTO product_customer (
			prod_cust_product_id, prod_cust_customer_id
		) 
		VALUES ($1, $2) RETURNING prod_cust_id`,
      [prod_cust_product_id, prod_cust_customer_id]
    );
    const result = await getProductCustomerById(
      lastInsertId.rows[0].prod_cust_id
    );
    res.status(201).json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const updateProductCustomer = async (req, res) => {
  const { id } = req.params;
  const { prod_cust_product_id, prod_cust_customer_id } = req.body;

  try {
    let result = await getProductCustomerById(id);
    if (!result)
      return res
        .status(404)
        .json({ message: `No product_customer with id: ${id}` });

    await pool.query(
      `UPDATE product_customer SET 
	  		prod_cust_product_id = $1, 
			prod_cust_customer_id = $2, 
			prod_cust_updated_at = NOW() WHERE prod_cust_id = ${id}`,
      [prod_cust_product_id, prod_cust_customer_id]
    );
    result = await getProductCustomerById(id);
    res.json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const deleteProductCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM product_customer WHERE prod_cust_id = $1`,
      [id]
    );
    res.status(201).json({ result: result.rowCount });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong", error });
  }
};

const getProductCustomerById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM vw_product_customer WHERE prod_cust_id = $1`,
    [id]
  );
  return result.rows[0];
};

export default router;
