import sql from "mssql";

const dbConfig = {
  user: "sa",
  password: "Dagroup2020it",
  server: "imgcserver",
  database: "SOLEX",
  options: {
    trustServerCertificate: true,
  },
};

export const getConnection = async () => {
  return await sql.connect(dbConfig);
};

export { sql };