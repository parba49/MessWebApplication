// MongoDB Connection  
require('dotenv').config();
const mongoose=require('mongoose')
const dbURL = process.env.MONGO_URL;
mongoose
  .connect(dbURL)
  .then(() => console.log("DB is connected"))
  .catch((error) => {
    console.error("DB connection error:", error);
    process.exit(1);
  });
