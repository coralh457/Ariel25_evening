const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./src/db");
const errorHandler = require("./src/middleware/errorHandler");

const toyRoutes = require("./src/routes/toys");
const userRoutes = require("./src/routes/users");

connectDB();

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/toys", toyRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is listening on port ${PORT}!`)
);
