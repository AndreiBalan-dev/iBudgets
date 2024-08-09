import { NextApiRequest, NextApiResponse } from "next";
import { deleteItem } from "../../utils/helpers";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    deleteItem({ key: "userName" });
    deleteItem({ key: "budgets" });
    deleteItem({ key: "expenses" });
    res.status(200).json({ message: "You’ve deleted your account!" });
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
