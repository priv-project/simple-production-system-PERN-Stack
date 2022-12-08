import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import authenticationRoutes from "#module/authentication/routes/index.js";
import modelRoutes from "#module/maintenance/composite/model/routes/index.js";
import productRoutes from "#module/maintenance/composite/product/routes/index.js";
import partRoutes from "#module/maintenance/composite/part/routes/index.js";
import assemblyRoutes from "#module/maintenance/composite/assembly/routes/index.js";

import supplierRoutes from "#module/maintenance/purchasing/supplier/routes/index.js";

import countryRoutes from "#module/maintenance/common/country/routes/index.js";
import currencyRoutes from "#module/maintenance/common/currency/routes/index.js";

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/auth", authenticationRoutes);
app.use("/api/maintenance/composite/models", modelRoutes);
app.use("/api/maintenance/composite/products", productRoutes);
app.use("/api/maintenance/composite/parts", partRoutes);
app.use("/api/maintenance/composite/assembly", assemblyRoutes);

/* PURCHASING ROUTES */
app.use("/api/maintenance/purchasing/supplier", supplierRoutes);

/* COMMON ROUTES */
app.use("/api/maintenance/common/country", countryRoutes);
app.use("/api/maintenance/common/currency", currencyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}.`);
  console.log(`************************************`);
  console.log(`Author: Jaffy Maglinte`);
  console.log(`Position: Full Stack Developer`);
  console.log(`Phone: +639664505714`);
  console.log(`************************************`);
});
