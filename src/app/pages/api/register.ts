import * as bcrypt from "bcryptjs";  
import { NextApiRequest, NextApiResponse } from "next";
import { getDbConnection } from "../../lib/db";  
import * as sql from "mssql";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    try {
     
      const hashedPassword = await bcrypt.hash(password, 10);

    
      const pool = await getDbConnection();


      await pool
        .request()
        .input("email", sql.VarChar, email)  
        .input("password", sql.VarChar, hashedPassword) 
        .query("INSERT INTO Users (email, password) VALUES (@email, @password)");

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error inserting user into database:", error);
      res.status(500).json({ message: "Server error: Could not register user" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
