const express = require('express');
const cors = require('cors');
require('express-async-errors');
require('dotenv').config();
const app = express();

const routes = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

routes(app);

app.listen(process.env.PORT || 3000, () => {
   console.log('Server started on port 3000');
});
