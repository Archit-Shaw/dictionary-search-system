const express = require("express");
const path = require("path");

const dictionaryRoutes = require("./routes/dictionaryRoutes");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", dictionaryRoutes);

module.exports = app;