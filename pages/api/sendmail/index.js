import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

const transporter_obj = {
  service: process.env.SMTP_SERVICE,
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(transporter_obj);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email } = req.body;
      const filePath = path.join(process.cwd(), "public", "database.json");
      const file = fs.readFileSync(filePath, "utf8");
      const data = JSON.parse(file);
      const vendor = data.filter((d) => {
        return d.email === email && d.type === "vendor";
      });
      if(!vendor.length>0){
        return res.status(400).json({message:"Vendor not found"})
      }
      const options = {
        from: "CREDMARG <nishant.nk.02@gmail.com>",
        to: email,
        subject: "Credmarg Payment Completed",
        text: `Sending payments to vendor ${vendor[0].name} at upi ${vendor[0].upi}.`,
      };

      const send_email = await transporter.sendMail(options);
      res.status(200).json({ message: 'email sent' });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }
  if (req.method === "GET") {
    // const {email} = req.body;
    res.status(400).json({ error: "Invalid request" });
  }
}
