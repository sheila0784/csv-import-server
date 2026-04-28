import express from "express";
import { getConnection, sql } from "../config/db.js";
import { Parser } from "json2csv";

const router = express.Router();

router.get("/:type", async (req, res) => {
  console.log("🔥 exportRoutes loaded");
  try {
    const { type } = req.params;

    const pool = await getConnection();
    let result;

    // 🔀 Call stored procedures
    switch (type) {
      case "opt1":
        result = await pool.request().execute("sp_GetPOSInvoices");
        break;
      case "opt2":
        result = await pool.request().execute("sp_GetPOSInvoiceAdjustments");
        break;
      case "opt3":
        result = await pool.request().execute("sp_GetPOSInvoicesForDeletion");
        break;
      default:
        return res.status(400).json({ message: "Invalid export type" });
    }

    const data = result.recordset;

    if (!data || data.length === 0) {
      console.log("⚠️ No data found for type:", type);

      return res.status(404).json({ message: "No data found" });
    }

    // 📄 Convert to CSV
    const parser = new Parser();
    const csv = parser.parse(data);

    // 📥 Send as downloadable file
    res.header("Content-Type", "text/csv");
    res.attachment(`${type}.csv`);
    res.send(csv);
  } catch (err) {
    console.error("Export error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
