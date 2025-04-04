const express = require('express');
const app = express();
const PORT = 3000;const dotenv = require("dotenv");
const connectDB = require("./db");
// app.use(bodyParser.json());
const cors = require("cors")
dotenv.config();
//connect db
connectDB();
const  allowedOrigins = ['http://localhost:5173','https://cache-api-q6bi.onrender.com']

app.use(express.json());
const corsOptions = {
    origin: allowedOrigins, // Replace with your allowed origin
    methods: "GET,POST,PUT,DELETE", // Specify allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Specify allowed headers
    credentials: true, // Allow cookies if needed
  };
  
  app.use(cors(corsOptions));
const authRouter = require("./routes/auth.route");

app.use("/auth",authRouter)
app.listen(PORT,()=>
{
    console.log(`app is listening on port ${PORT}`)
})