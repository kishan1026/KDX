import express from 'express';
import connectDB from './db/index.js';
import userRouter from "./routes/user.routes.js";
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from "cookie-parser";
import categoryRouter from './routes/category.routes.js'
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import cors from "cors";

connectDB()

const app =express()
const port = process.env.PORT;

app.use(express.json());

app.use(cors({
    origin: "https://kdx-ten.vercel.app",
    credentials: true,
  }));

app.use(cookieParser());


app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/dashboard", dashboardRouter);
app.use(
    "/api/payment",
    paymentRouter
);

app.get('/',(req,res)=>{
    res.send('hi backend')
})

app.use((err, req, res, next) => {
    console.log(err);

    res.status(500).json({
        message: err.message,
        field: err.field,
        code: err.code
    });
});


app.listen(port,"0.0.0.0",()=>{
    console.log(`server is running on this ${port}`);
    
})