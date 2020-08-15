const express = require("express");
const app = express();
const cors = require("cors");
const mainRouter = require("./routes/programRoute");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", mainRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 6060, console.log("Server started at 6060"));
