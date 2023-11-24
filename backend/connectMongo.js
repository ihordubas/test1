const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://martamykhalchyshyn:0AzLkGajo2MKVY4Q@cluster0.j7bwrb2.mongodb.net/post-blog?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Підключено до MongoDB");
  } catch (error) {
    console.log("Помилка підключення до MongoDB: " + error.message);
  }
};

module.exports = connectDB;
