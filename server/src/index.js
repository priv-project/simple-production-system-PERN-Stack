import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

import authenticationRoutes from "./modules/authentication/routes/index.js";
import modelRoutes from "./modules/maintenance/model/routes/index.js";
import productRoutes from "./modules/maintenance/product/routes/index.js";
import partRoutes from "./modules/maintenance/part/routes/index.js";
import assemblRoutes from "./modules/maintenance/assembly/routes/index.js";

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/auth", authenticationRoutes);
app.use("/maintenance/models", modelRoutes);
app.use("/maintenance/products", productRoutes);
app.use("/maintenance/parts", partRoutes);
app.use("/maintenance/assembly", assemblRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`App running on http://localhost:${PORT}.`);
});
