import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import pool from "#root/db/index.js";

const router = express.Router();
const secret = "ro8BS6Hiivgzy8Xuu09JDjlNLnSLldY5";

export const signin = async (req, res) => {
  const { user_username, user_password } = req.body;
  try {
    const oldUser = await pool.query(
      "SELECT * FROM users WHERE user_username = $1",
      [user_username]
    );
    if (oldUser.rowCount === 0)
      return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(
      user_password,
      oldUser.rows[0].user_password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(oldUser.rows[0], secret, { expiresIn: "1h" });
    res.status(200).json({ result: oldUser.rows[0], token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const signup = async (req, res) => {
  const { user_name, user_password, user_username } = req.body;

  try {
    const oldUser = await pool.query(
      `SELECT * FROM users WHERE user_username = $1 LIMIT 1`,
      [user_username]
    );
    if (oldUser.rowCount > 0)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(user_password, 12);
    const lastInsertId = await pool.query(
      `INSERT INTO users (user_username, user_password, user_name) VALUES ($1, $2, $3) RETURNING user_id`,
      [user_username, hashedPassword, user_name]
    );
    const result = await getUserById(lastInsertId.rows[0].user_id);
    const token = jwt.sign(result, secret, { expiresIn: "1h" });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

const getUserById = async (id) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    return { message: "Something went wrong", error };
  }
};

export default router;
