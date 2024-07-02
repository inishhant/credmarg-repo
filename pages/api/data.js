import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), "public", "database.json");

  if (req.method === "GET") {
    try {
      const data = fs.readFileSync(filePath, "utf8");
      const vendors = JSON.parse(data);
      return res.status(200).json(vendors);
    } catch (error) {
      return res.status(500).json({ error: "Failed to read the file" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" }); // Method Not Allowed
  }
}
