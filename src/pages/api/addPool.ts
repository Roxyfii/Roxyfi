import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, amount } = req.body;
    const filePath = path.join(process.cwd(), "src", "data", "pools.json");
    const pools = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const newPool = {
      id: pools.length ? pools[pools.length - 1].id + 1 : 1,
      name,
      amount,
    };

    pools.push(newPool);
    fs.writeFileSync(filePath, JSON.stringify(pools, null, 2));
    res.status(200).json(newPool);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
