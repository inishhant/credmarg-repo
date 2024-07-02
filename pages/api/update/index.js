import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), "public", "database.json");

  if (req.method === "PATCH") {
    try {
      const { id, updatedData } = JSON.parse(req.body);

      // Read the data from the file
      const allData = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(allData);

      // Find the index of the employee to update
      const employeeIndex = data.findIndex((employee) => employee._id == id);

      if (employeeIndex === -1) {
        return res.status(404).json({ error: "Employee not found" });
      }

      // Update the employee data
      data[employeeIndex] = { ...data[employeeIndex], ...updatedData };

      // Write the updated data back to the file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      return res.status(200).json(data[employeeIndex]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to update the file" });
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    return res.status(405).end(`Method ${req.method} not allowed`);
  }
}
