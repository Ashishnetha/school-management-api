const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors())

const schoolRoutes = require("./src/routes/routes");

app.use("/", schoolRoutes);

app.listen(3000);