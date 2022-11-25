import express from "express";
import pool from "#root/db/index.js";

const router = express.Router();

export const getPartSuppliers = async (req, res) => {
  try {
    let result = await pool.query(
      `SELECT * FROM vw_part_supplier ORDER BY part_code`
    );
    result = result.rows;
    res.status(201).json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const createPartSupplier = async (req, res) => {
  const {
    part_supp_part_id,
    part_supp_supplier_id,
    part_supp_packing_id,
    part_supp_unitprice,
    part_supp_currency_id,
    part_supp_payment_id,
    part_supp_packing_qty,
    part_supp_ratio,
    part_supp_min_qty,
    part_supp_price_symbol,
    part_supp_shipment_mode_id,
  } = req.body;

  try {
    const lastInsertId = await pool.query(
      `INSERT INTO part_supplier (
				part_supp_part_id,
				part_supp_supplier_id,
				part_supp_packing_id,
				part_supp_unitprice,
				part_supp_currency_id,
				part_supp_payment_id,
				part_supp_packing_qty,
				part_supp_ratio,
				part_supp_min_qty,
				part_supp_price_symbol,
				part_supp_shipment_mode_id,
				) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING part_supplier_id`,
      [
        part_supp_part_id,
        part_supp_supplier_id,
        part_supp_packing_id,
        part_supp_unitprice,
        part_supp_currency_id,
        part_supp_payment_id,
        part_supp_packing_qty,
        part_supp_ratio,
        part_supp_min_qty,
        part_supp_price_symbol,
        part_supp_shipment_mode_id,
      ]
    );
    const result = await getPartSupplierById(
      lastInsertId.rows[0].part_supplier_id
    );
    res.status(201).json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const updatePartSupplier = async (req, res) => {
  const { id } = req.params;
  const {
    part_supp_part_id,
    part_supp_supplier_id,
    part_supp_packing_id,
    part_supp_unitprice,
    part_supp_currency_id,
    part_supp_payment_id,
    part_supp_packing_qty,
    part_supp_ratio,
    part_supp_min_qty,
    part_supp_price_symbol,
    part_supp_shipment_mode_id,
  } = req.body;

  try {
    let result = await getPartSupplierById(id);
    if (!result)
      return res
        .status(404)
        .json({ message: `No part_supplier with id: ${id}` });

    await pool.query(
      `UPDATE part_supplier SET 
				part_supp_part_id $1,
				part_supp_supplier_id $2,
				part_supp_packing_id $3,
				part_supp_unitprice $4,
				part_supp_currency_id $5,
				part_supp_payment_id $6,
				part_supp_packing_qty $7,
				part_supp_ratio $8,
				part_supp_min_qty $9,
				part_supp_price_symbol $10,
				part_supp_shipment_mode_id $11,
				part_supplier_updated_at = NOW() 
			WHERE part_supplier_id = ${id}`,
      [
        part_supp_part_id,
        part_supp_supplier_id,
        part_supp_packing_id,
        part_supp_unitprice,
        part_supp_currency_id,
        part_supp_payment_id,
        part_supp_packing_qty,
        part_supp_ratio,
        part_supp_min_qty,
        part_supp_price_symbol,
        part_supp_shipment_mode_id,
      ]
    );
    result = await getPartSupplierById(id);
    res.json({ result });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong", error });
  }
};

export const deletePartSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM part_supplier WHERE part_supplier_id = $1`,
      [id]
    );
    res.status(201).json({ result: result.rowCount });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong", error });
  }
};

const getPartSupplierById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM vw_part_supplier WHERE part_supplier_id = $1`,
    [id]
  );
  return result.rows[0];
};

export default router;
