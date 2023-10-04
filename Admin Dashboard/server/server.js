const mongoose = require('mongoose');
//to load environment variables from a .env
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
//connect db
mongoose.connect(DB).then(() => {
  console.log('DB connection successful!');
});
const app = require('./app');
const port = process.env.PORT || 8000;
//listing to port 
const server = app.listen(port, () => {
  console.log(`server is listening for  ${port} `);
});
