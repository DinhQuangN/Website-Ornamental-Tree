import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routers';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api', routes);

import './config/database';

const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, () => {
	console.log(`Server is running ${PORT}`);
});
