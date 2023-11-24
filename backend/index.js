const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const connectDB = require("./connectMongo");

connectDB();

app.use(
  cors({
    origin: ["https://posts-blog-theta.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(cors());
app.use(bodyParser.json());

app.use("/posts", postRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
