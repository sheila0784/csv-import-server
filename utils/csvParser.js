import fs from "fs";
import csv from "csv-parser";

export const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(
        csv({
          headers: [
            "Account Code",
            "Account Name",
            "Account Classification Code",
            "Account Classification Name",
            "Branch Code",
            "Branch Name",
            "Invoice Number",
            "Invoice Amount",
            "Sales Order Number",
            "Product Code",
            "Product Name",
            "Unit of Measure",
            "Invoice Date",
            "Date Uploaded",
            "Visit Number",
            "Service Level/Fill Rate",
            "Invoice Username",
            "Product UOM",
            "Quantity Ordered",
            "Quantity Served",
            "Price (From CSV)",
            "Salesman",
            "Odoo Invoice Status",
            "Incomplete Delivery Reason",
          ],
          skipLines: 1,
          mapValues: ({ value }) => value.trim(),
        })
      )
      .on("data", (row) => results.push(row))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
};