import * as bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { getDbConnection } from "../../lib/db"; // Ensure this path is correct
import * as sql from "mssql";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    try {
      // Get the database connection
      const pool = await getDbConnection();

      // Query the database for the user by email
      const result = await pool
        .request()
        .input("email", sql.VarChar, email)
        .query("SELECT * FROM Users WHERE email = @email");

      if (result.recordset.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Check if the password matches
      const user = result.recordset[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Return a success message if login is successful
      return res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
