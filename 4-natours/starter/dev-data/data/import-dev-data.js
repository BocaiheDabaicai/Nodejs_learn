const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

// console.log(process.env)
const url = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));
tours.forEach(item => item.id = new mongoose.Types.ObjectId(item.id))
const importData = async () => {
  console.log(tours);
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (error) {
    console.log(error);
  }
  process.exit()
};
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (error) {
    console.log(error);
  }
  process.exit()
};

async function main() {
  try {
    await mongoose.connect(url);
    console.log('connection successful!');
  } catch (err) {
    console.log(err);
  }
}

main();
console.log(process.argv);
if(process.argv[2] === '--import'){
  importData()
}else if (process.argv[2] === '--delete'){
  deleteData()
}