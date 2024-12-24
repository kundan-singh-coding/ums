import sql from 'mssql'

const config = {
  user: "datatec",
  password: "FWAl62",
  server: "107.180.104.92",
  database: "mludatatec",
  options: {
    encrypt: true,
    trustServerCertificate: true, 
  },
};

export const getDbConnection = async () => {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (error) {
    console.error("Database connection error: ", error);
    throw new Error("Database connection failed");
  }
};

export type User = {
  id: number;
  email: string;
  password: string;
};
