import express from 'express';
import Stripe from 'stripe';
import jwtCheck from '../middleware/checkJwt.js';
import connection from '../database/connection.js';
import 'dotenv/config';

const payment = express.Router();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

payment.post('/create', jwtCheck, async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // amount in cents
            currency,
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

payment.post('/confirm-payment', jwtCheck, async (req, res) => {
    const { paymentIntentId, salesInfo } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status === 'succeeded') {
            await saveSale(salesInfo, req.user.client_id);
            res.json({ success: true, message: 'Payment confirmed' });
        } else {
            res.json({ success: false, message: 'Payment not successful' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

async function saveSale(saleData) {
    const salesDataFormated = {
        user_id: saleData.userEmail,
        card_id: saleData.pokemonId,
        username: saleData.userName,
        product_name: saleData.productName,
        price: saleData.price,
        quantity: saleData.quantity,
        currency: saleData.currency,
        sales_date: saleData.salesDate,
    };
    await connection.query('INSERT INTO sales SET ?', salesDataFormated);
}

export default payment;
