import { NextApiRequest, NextApiResponse } from "next";
import { deleteItem, getAllMatchingItems } from "../../utils/helpers";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { id } = req.body;
    deleteItem({ key: "budgets", id });

    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: id,
    });

    associatedExpenses.forEach((expense: { id: any }) => {
      deleteItem({ key: "expenses", id: expense.id });
    });

    res.status(200).json({ message: "Budget deleted successfully!" });
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
