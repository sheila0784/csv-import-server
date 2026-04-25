import { sql, getConnection } from "../config/db.js";

export const processUpload = async (rows) => {
  const pool = await getConnection();

  // const table = new sql.Table();
  const table = new sql.Table("dbo.InvoicesTableType");

  table.columns.add("Account Code", sql.VarChar(50));
  table.columns.add("Account Name", sql.VarChar(150));
  table.columns.add("Account Classification Code", sql.VarChar(50));
  table.columns.add("Account Classification Name", sql.VarChar(150));
  table.columns.add("Branch Code", sql.VarChar(50));
  table.columns.add("Branch Name", sql.VarChar(150));
  table.columns.add("Invoice Number", sql.VarChar(50));
  table.columns.add("Invoice Amount", sql.Float);
  table.columns.add("Sales Order Number", sql.VarChar(50));
  table.columns.add("Product Code", sql.VarChar(50));
  table.columns.add("Product Name", sql.VarChar(150));
  table.columns.add("Unit of Measure", sql.VarChar(10));
  table.columns.add("Invoice Date", sql.Date);
  table.columns.add("Date Uploaded", sql.SmallDateTime);
  table.columns.add("Visit Number", sql.VarChar(20));
  table.columns.add("Service Level/Fill Rate", sql.Float);
  table.columns.add("Invoice Username", sql.VarChar(50));
  table.columns.add("Product UOM", sql.VarChar(10));
  table.columns.add("Quantity Ordered", sql.VarChar(10));
  table.columns.add("Quantity Served", sql.Float);
  table.columns.add("Price (From CSV)", sql.Float);
  table.columns.add("Salesman", sql.VarChar(150));
  table.columns.add("Odoo Invoice Status", sql.VarChar(50));
  table.columns.add("Incomplete Delivery Reason", sql.VarChar(150));

  rows.forEach((row) => {
    table.rows.add(
      row["Account Code"] || null,
      row["Account Name"] || null,
      row["Account Classification Code"] || null,
      row["Account Classification Name"] || null,
      row["Branch Code"] || null,
      row["Branch Name"] || null,
      row["Invoice Number"] || null,
      row["Invoice Amount"] ? parseFloat(row["Invoice Amount"]) : null,
      row["Sales Order Number"] || null,
      row["Product Code"] || null,
      row["Product Name"] || null,
      row["Unit of Measure"] || null,
      row["Invoice Date"] ? new Date(row["Invoice Date"]) : null,
      row["Date Uploaded"] ? new Date(row["Date Uploaded"]) : null,
      row["Visit Number"] || null,
      row["Service Level/Fill Rate"]
        ? parseFloat(row["Service Level/Fill Rate"])
        : null,
      row["Invoice Username"] || null,
      row["Product UOM"] || null,
      row["Quantity Ordered"] || null,
      row["Quantity Served"] ? parseFloat(row["Quantity Served"]) : null,
      row["Price (From CSV)"] ? parseFloat(row["Price (From CSV)"]) : null,
      row["Salesman"] || null,
      row["Odoo Invoice Status"] || null,
      row["Incomplete Delivery Reason"] || null,
    );
  });

  try {
    const result = await pool
      .request()
      .input("Invoices", table)
      .execute("sp_InsertInvoicesBulk");
    console.log("Stored procedure executed successfully:", result);
    return result;
  } catch (err) {
    console.error("SQL ERROR FULL:", err);
    console.error("SQL ERROR MESSAGE:", err.message);
    console.error("SQL ERROR ORIGINAL:", err.originalError);
    throw err;
  }

  // const result = await pool
  //   .request()

  //   .input("Invoices", sql.TVP("dbo.InvoicesTableType"), table)
  //   .execute("sp_InsertInvoicesBulk");

  // return result;
};
