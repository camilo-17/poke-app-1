import express from 'express';
import jwtCheck from '../middleware/checkJwt.js';
import connection from '../database/connection.js';
import 'dotenv/config';
const report = express.Router();

report.get('/sales', jwtCheck, async (req, res) => {
    try {
        const [rows] = await connection.execute(`
      SELECT 
          user_id, card_id, username, product_name, price, quantity, currency, sales_date, (quantity * price) AS total_sale
        FROM 
          sales ORDER BY sales_date DESC
      `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching sales data' });
    }
});

export default report;
