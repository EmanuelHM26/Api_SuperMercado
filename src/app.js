import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import clientesRoutes from "./routes/clientes.routes.js";
import proveedoresRoutes from "./routes/proveedores.routes.js";
import productosRoutes from "./routes/productos.routes.js";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rutas
app.use("/api", clientesRoutes);
app.use("/api", proveedoresRoutes);
app.use("/api", productosRoutes);


export default app