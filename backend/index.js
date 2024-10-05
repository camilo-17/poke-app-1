import express from 'express';
import cors from 'cors';

import pokeApi from './routes/pokeApi.js';
import errorHandle from './error/errorHandle.js';
import payment from './routes/payment.js';
import report from './routes/report.js';
import 'dotenv/config';

const app = express();

app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Api pokemon project working correctly');
});

app.use('/pokeApi', pokeApi);
app.use('/payment', payment);
app.use('/report', report);

app.use(errorHandle);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
