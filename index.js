const express = require("express");
const app = express();
require("dotenv/config");
const PORT = process.env.PORT || 5002;
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// IMPORT API ROUTES
const router = require("./rest/museumVisitors.rest.js");

app.use("/", router);

app.listen(PORT, ()=>{
    console.log("Localhost is running on PORT: ", PORT);
});