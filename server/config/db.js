const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB connected to host ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
