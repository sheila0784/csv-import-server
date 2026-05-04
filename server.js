// import express from "express";
// import cors from "cors";

// import uploadRoutes from "./routes/uploadRoutes.js";
// import exportRoutes from "./routes/export.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api", uploadRoutes);
// app.use("/api/export", exportRoutes);

// app.listen(3000, "0.0.0.0", () => {
//   console.log("Server running on port 3000");
// });

// ----------------------------------------

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import uploadRoutes from "./routes/uploadRoutes.js";
import exportRoutes from "./routes/export.js";

const app = express();

// Fix for __dirname (since you're using ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// API routes FIRST
app.use("/api", uploadRoutes);
app.use("/api/export", exportRoutes);

// 👇 Serve frontend (dist folder)
app.use(express.static(
  path.join(__dirname, "../csv-import-client/dist")
));

// 👇 Fallback for SPA (React/Vue routing)
// app.get("*", (req, res) => {
app.get(/.*/, (req, res) => {
  res.sendFile(
    path.join(__dirname, "../csv-import-client/dist/index.html")
  );
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
