const dotenv = require('dotenv').config();
const cors = require('cors');
const express = require('express');
const {initCounter} = require('./config/counter');
const connectDB = require('./config/db');
const {errorHandler} = require('./middlewares/errorHandler')
const path = require('node:path');
const port = 3000;

const app = express();

connectDB();
initCounter('exerciseTrackerUserCounter');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors({optionsSuccessStatus: 200}));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../views/index.html')));
app.use('/', express.static('public'));

app.use(require('./middlewares/reqLogger'));
app.use('/api/users', require('./routes/userRoute'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

