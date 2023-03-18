import express  from "express";
import colors  from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";


dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);



app.get("/", (req,res)=>{
    res.send({
        message:"SEJA BEM VINDO AO PROJELO LOJA ONLINE",

    });
});

const PORT = process.env.PORT || 8080;


app.listen(PORT,()=>{
    console.log(`SERVIDOR RODANDO ${process.env.DEV_MODE} NA PORTA ${PORT}`.bgGreen.white);
});

