const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connection successful!');
});
const app = require('./app');
const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`server is listening for  ${port} `);
});
