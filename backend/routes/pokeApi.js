import express from 'express';
import pokemon from 'pokemontcgsdk';
import jwtCheck from '../middleware/checkJwt.js';
import 'dotenv/config';
const pokeApi = express.Router();
pokemon.configure({ apiKey: process.env.POKEMON_API_KEY });

pokeApi.get('/cards', jwtCheck, async (req, res, next) => {
    try {
        const cards = await pokemon.card.where({ pageSize: 50, page: 1 });
        res.json({
            ...cards,
        });
    } catch (error) {
        return next(error);
    }
});

export default pokeApi;
