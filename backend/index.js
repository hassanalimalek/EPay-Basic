const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config()


// Allow cors
app.use(cors());

app.use(express.json());

app.use("/api/v1", require("./routes"));


app.listen(5000, () => {
    console.log("Listening on Port 5000")
})
