const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const url = "mongodb+srv://mrgoodway:12341234@backend.fnqe2z7.mongodb.net/app?retryWrites=true&w=majority"

mongoose
  .connect(url)
  .then(() => console.log("MongoDB connection is made"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static('images'));
app.use(fileUpload());

app.get('/', (req, res) => {
  return res.sendFile("index.html");
});

const uploadRouter = require("./routes/upload");
app.use("/upload", uploadRouter);

const userRouter = require("./routes/users");
app.use("/users", userRouter);

app.listen(5000, function() {
  console.log("server on 5000");
});
