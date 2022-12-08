import express from "express";
import pool from "#root/db/index.js";

const router = express.Router();

export const getSuppliers = async (req, res) => {
  try {
    let result = await pool.query(
      `SELECT * FROM vw_supplier ORDER BY supplier_code`
    );
    result = result.rows;
    res.status(201).json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const createSupplier = async (req, res) => {
  const {
    supplier_code,
    supplier_desc,
    supplier_stree,
    supplier_country_id,
    supplier_contact,
    supplier_email,
    supplier_tel_num,
    supplier_fax_num,
    supplier_status,
  } = req.body;

  try {
    const lastInsertId = await pool.query(
      `INSERT INTO supplier (
									supplier_code,
									supplier_desc,
									supplier_street,
									supplier_country_id,
									supplier_contact,
									supplier_email,
									supplier_tel_num,
									supplier_fax_num,
									supplier_status
								) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING supplier_id`,
      [
        supplier_code,
        supplier_desc,
        supplier_stree,
        supplier_country_id,
        supplier_contact,
        supplier_email,
        supplier_tel_num,
        supplier_fax_num,
        supplier_status,
      ]
    );
    const result = await getSupplierById(lastInsertId.rows[0].supplier_id);
    res.status(201).json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const {
    supplier_code,
    supplier_desc,
    supplier_stree,
    supplier_country_id,
    supplier_contact,
    supplier_email,
    supplier_tel_num,
    supplier_fax_num,
    supplier_status,
  } = req.body;

  try {
    let result = await getSupplierById(id);
    if (!result)
      return res.status(404).json({ message: `No supplier with id: ${id}` });

    await pool.query(
      `UPDATE supplier SET 
							supplier_code = $1,
							supplier_desc = $2,
							supplier_stree = $3,
							supplier_country_id = $4,
							supplier_contact = $5,
							supplier_email = $6,
							supplier_tel_num = $7,
							supplier_fax_num = $8,
							supplier_status = $9, 
							supplier_updated_at = NOW() WHERE supplier_id = ${id}`,
      [
        supplier_code,
        supplier_desc,
        supplier_stree,
        supplier_country_id,
        supplier_contact,
        supplier_email,
        supplier_tel_num,
        supplier_fax_num,
        supplier_status,
      ]
    );
    result = await getSupplierById(id);
    res.json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const deleteSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM supplier WHERE supplier_id = $1`,
      [id]
    );
    res.status(201).json({ result: result.rowCount });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong", error });
  }
};

const getSupplierById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM vw_supplier WHERE supplier_id = $1`,
    [id]
  );
  return result.rows[0];
};

export default router;
