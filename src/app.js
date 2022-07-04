import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import customerRoute from './routes/customer.routes.js';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json'}));
app.use(cors());

app.use(routes);
app.use('/api/', customerRoute);

export default app;