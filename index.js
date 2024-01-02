const express = require("express");
const cors = require("cors")
const { connection } = require("./db")
const { userRouter } = require("./routes/userroutes")
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT;
const databaseURI = process.env.MONGODB_URI;
const app = express();
app.use(cors())
app.use(express.json())
app.use('/user',userRouter)
app.use('/note',userRouter)



mongoose.connect(databaseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const dbConnection = mongoose.connection;
  
  dbConnection.once("open", () => {
    console.log("Database is connected");
  });

app.get("/",(req,res) => {
    res.send({
        message: "API is working now",
    });
});

app.listen(port, async() => {
    try {
        await connection
        console.log("Database is connected");
    } catch (error) {
        console.log(error)
    }
    console.log("Server is running on PORT number", port);
})