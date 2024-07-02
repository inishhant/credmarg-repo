import fs from "fs";
import path from "path";
export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), "public", "database.json");
  if (req.method === "GET") {
    try {
      const { employeeId } = req.query;
      const all_data = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(all_data);
      const employee_data = data.filter(
        (employee) => employee._id == employeeId
      );
      return res.status(200).json(employee_data);
    } catch {
      return res.status(500).json({ error: "Failed to read the file" });
    }
  }
}
