const express = require("express");
const dotenv = require("dotenv");
const app = express();
const fileUpload = require("express-fileupload");
const DB = require("./connectDB/ConnectDB");
const userRoutes = require('./routes/UserRoutes');
const port = process.env.NORD_PORT || 3000;

dotenv.config();
app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 150 * 1024 * 1024 },
    abortOnLimit: true,
  })
);

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

DB.connect(function (err) {
  if (err) throw err;
  console.log("DB Connected.....");
});
