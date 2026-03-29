import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/authRoutes.js";


const app = express();

const corsOptions = {
  origin: 'https://dulcet-malasada-7ed9bf.netlify.app',
  methods:'GET,POST'
}

app.use(cors(corsOptions));


app.use(express.json());


app.get("/", (req, res) => {
  res.send("Password Reset API Running");
});

app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port 5000");
});