import fs from "fs";
import path from "path";
export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), "public", "database.json");
  if (req.method === "GET") {
    try {
      const { vendorId } = req.query;
      const all_data = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(all_data);
      const vendor_data = data.filter(
        (vendor) => vendor._id == vendorId
      );
      return res.status(200).json(vendor_data);
    } catch {
      return res.status(500).json({ error: "Failed to read the file" });
    }
  }
}
