require('dotenv').config();
const cors = require('cors');
const XLSX = require('xlsx'); // лишнее
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const allowedCors = require('./cors/allowedCors');
const limiter = require('./middlewares/rateLimiter');
const serverError = require('./middlewares/serverError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
	PORT,
	NODE_ENV,
	MOVIES_EXPLORER_DB,
	DEFAULT_DB,
} = process.env;

const app = express();

app.use(cors({
	origin: allowedCors.allowedUrls,
	methods: allowedCors.allowedMethods,
	credentials: true,
}));

mongoose.set('strictQuery', false);
mongoose.connect(NODE_ENV === 'production' ? MOVIES_EXPLORER_DB : DEFAULT_DB);



// ------------------------------------------------------ Лишнее
app.get('/frn-users', (req, res) => {
	const filePath = './user-list/user-list.xlsx';
	const workbook = XLSX.readFile(filePath);
	// Получение имени первого листа
	const firstSheetName = workbook.SheetNames[0];
	// Получение первого листа
	const worksheet = workbook.Sheets[firstSheetName];
	// Преобразование данных из листа в JSON
	const data = XLSX.utils.sheet_to_json(worksheet);
	console.log(data)
	res.send(data)
});
//---------------------------------------------------------



app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(limiter);
app.use(require('./routes/router'));



app.use(errorLogger);
app.use(errors());
app.use(serverError);

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
