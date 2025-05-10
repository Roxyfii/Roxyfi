import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), "src", "data", "Abi.json");
  const stakingAbi = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.status(200).json(stakingAbi);
}
