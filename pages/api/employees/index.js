import fs from "fs";
import path from "path";
import crypto from "crypto";
import * as EmailValidator from "email-validator";

async function generateId(data) {
  const id = crypto.randomBytes(10).toString("hex");
  if (data.filter((d) => d._id == id).length > 0) {
    generateId(data);
  }
  return id;
}

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), "public", "database.json");

  if (req.method === "GET") {
    try {
      const data = fs.readFileSync(filePath, "utf8");
      const employees = JSON.parse(data);
      const employees_data = employees.filter((v)=> v.type=="employee");
      return res.status(200).json(employees_data);
    } catch (error) {
      return res.status(500).json({ error: "Failed to read the file" });
    }
  } else if (req.method === "POST") {
    try {
      // Read the current employees from the file
      const body = req.body;
      const data = fs.readFileSync(filePath, "utf8");
      const currentEmployees = JSON.parse(data);

      if(currentEmployees.filter((d)=>d.email==body.email).length>0){
        return res.status(400).json({error:"Email already exists"})
      }

      const id = await generateId(currentEmployees);
      const newEmployee = {
        _id: id,
        type: 'employee',
        name: body.name ? body.name : "",
        email: body.email ? body.email : "",
        designation: body.designation ? body.designation : "",
        ctc: body.ctc ? body.ctc : "",
      };
      for (const key in newEmployee) {
        if (!newEmployee[key]) {
          return res
            .status(400)
            .json({ error: `Invalid request, ${key} is required.` });
        }
      }

      if (!EmailValidator.validate(body.email)) {
        return res
          .status(400)
          .json({ error: "Invalid request, incorrect email address." });
      }

      // Adding new employee to the array
      currentEmployees.push(newEmployee);

      // Writting the updated employees array back to the file
      fs.writeFileSync(filePath, JSON.stringify(currentEmployees, null, 2));

      return res.status(201).json(newEmployee);
    } catch (error) {
      return res.status(500).json({ error: "Failed to write to the file" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" }); // Method Not Allowed
  }
}
