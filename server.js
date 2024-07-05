const express = require('express');
const errorHandler = require('./middleware/errorhandler');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const cors = require('cors'); 

connectDB();

const app = express();
const port = 3000;

app.use(cors()); 

app.use(express.json());

app.use("/api/trainee", require("./routes/traineeRoutes"));
app.use("/api/admins", require("./routes/adminRoutes"));
app.use("/api/subscription",require("./routes/subscriptionRoutes"));


app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
