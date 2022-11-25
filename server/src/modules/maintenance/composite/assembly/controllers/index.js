import express from 'express';
import pool from '#root/db/index.js';

const router = express.Router();

export const getAssembly = async (req, res) => {
    try {
        let result = await pool.query(`SELECT * FROM vw_assembly ORDER BY assembly_code`);
        result = result.rows;
        res.status(201).json({ result });
    } catch (error) {
        res.status(409).json({ message: 'Something went wrong', error });
    }
};

export const createAssembly = async (req, res) => {
    const { assembly_code, assembly_description, assembly_model_id, assembly_part_id } = req.body;
    console.log(req.body);
    try {
        const lastInsertId = await pool.query(
            `INSERT INTO assembly (assembly_code, assembly_description, assembly_model_id, assembly_part_id) VALUES ($1, $2, $3, $4) RETURNING assembly_id`,
            [assembly_code, assembly_description, assembly_model_id, assembly_part_id]
        );
        // UPDATED part status flag to true;
        await pool.query(`UPDATE part SET part_assy_flag = true WHERE part_id = $1`, [assembly_part_id]);

        const result = await getAssemblyById(lastInsertId.rows[0].assembly_id);
        res.status(201).json({ result });
    } catch (error) {
        res.status(409).json({ message: 'Something went wrong', error });
    }
};

export const updateAssembly = async (req, res) => {
    const { id } = req.params;
    const { assembly_code, assembly_description, assembly_model_id, assembly_part_id, assembly_status } = req.body;

    try {
        let result = await getAssemblyById(id);
        if (!result) return res.status(404).json({ message: `No assembly with id: ${id}` });

        await pool.query(
            `UPDATE assembly SET    assembly_code = $1,
                                        assembly_description = $2,
                                        assembly_model_id = $3,
                                        assembly_part_id = $4, 
                                        assembly_status = $5,
                                        assembly_updated_at = NOW() WHERE assembly_id = ${id}`,
            [assembly_code, assembly_description, assembly_model_id, assembly_part_id, assembly_status]
        );
        result = await getAssemblyById(id);
        res.json({ result });
    } catch (error) {
        res.status(409).json({ message: 'Something went wrong', error });
    }
};

export const deleteAssembly = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`DELETE FROM assembly WHERE assembly_id = $1`, [id]);
        res.status(201).json({ result: result.rowCount });
    } catch (error) {
        res.status(404).json({ message: 'Something went wrong', error });
    }
};

const getAssemblyById = async (id) => {
    const result = await pool.query(`SELECT * FROM vw_assembly WHERE assembly_id = $1`, [id]);
    return result.rows[0];
};

export default router;
