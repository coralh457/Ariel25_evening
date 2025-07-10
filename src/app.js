const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const connectDB = require("./db");
const errorHandler = require("./middleware/errorHandler");
// const selectHandler = require("./middleware/select");

connectDB();

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());

// app.use(selectHandler);

app.use("/", routes);

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}!`)
);
