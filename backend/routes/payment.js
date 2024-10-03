import express from 'express';
import Stripe from 'stripe';

import authMiddleware from '../middleware/auth.js';

const payment = express.Router();
const stripe = new Stripe('sk_test_51Q5rjFIbSJA1netiv8wqNbwwStU3be5xGOvNxaZPsNWCaUQwnpG7TOnm6qGSSQp0pYxW8goSR1iOl3OXeTWBEW4N00IF4qrrYr');

payment.post('/create', authMiddleware, async (req, res) => {
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

payment.post('/confirm-payment', authMiddleware, async (req, res) => {
    const { paymentIntentId } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status === 'succeeded') {
            res.json({ success: true, message: 'Payment confirmed' });
        } else {
            res.json({ success: false, message: 'Payment not successful' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default payment;
