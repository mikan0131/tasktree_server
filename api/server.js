import fs from "fs-extra";
import path from "path";

const API_KEY = process.env.API_KEY || "my-secret-key";
const dbPath = path.join(process.cwd(), "db.json");

export default async function handler(req, res) {
    const key = req.headers["x-api-key"];
    if (key !== API_KEY) {
        res.tstaus(401).json({ error: "Invalid API Key" });
        return;
    }

    if (req.method == "GET") {
        const db = await fs.readJSON(dbPath);
        res.status(200).json(db.posts || []);
        return;
    }

    res.status(405).json({ error: "Method Not Allowed" });
}
