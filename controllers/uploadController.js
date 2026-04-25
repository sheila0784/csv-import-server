import fs from "fs";
import { parseCSV } from "../utils/csvParser.js";
import { processUpload } from "../services/uploadService.js";

export const uploadFile = async (req, res) => {
  try {
    const rows = await parseCSV(req.file.path);

    const result = await processUpload(rows);

    fs.unlinkSync(req.file.path);

    res.json({
      message: result.recordset[0]?.returnMsg,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};