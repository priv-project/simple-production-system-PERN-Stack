import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import authenticationRoutes from '#module/authentication/routes/index.js';
import modelRoutes from '#module/maintenance/composite/model/routes/index.js';
import productRoutes from '#module/maintenance/composite/product/routes/index.js';
import partRoutes from '#module/maintenance/composite/part/routes/index.js';
import assemblRoutes from '#module/maintenance/composite/assembly/routes/index.js';

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/api/auth', authenticationRoutes);
app.use('/api/maintenance/composite/models', modelRoutes);
app.use('/api/maintenance/composite/products', productRoutes);
app.use('/api/maintenance/composite/parts', partRoutes);
app.use('/api/maintenance/composite/assembly', assemblRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}.`);
});
