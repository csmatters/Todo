const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("I am Alive");
})

// User routes
const userRoutes = require("./routes/userRouter"); 
app.use('/api/users', userRoutes);

//todo routes
const todoRoutes = require("./routes/todoRouter");
app.use('/api/todos/', todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is conneted");
}).on("error", () => {
    console.log("Error is here");
});