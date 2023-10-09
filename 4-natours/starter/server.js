const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app.js');

console.log(app.get('env'));
// console.log(process.env)
const url = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

main();

async function main() {
  try {
    await mongoose.connect(url);
    console.log('connection successful!');
  } catch (err) {
    console.log(err);
  }
}



const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
