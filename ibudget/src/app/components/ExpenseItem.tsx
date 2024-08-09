import { Link } from "next/link";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "../utils/helpers";

interface ExpenseItemProps {
  expense: {
    id: string;
    name: string;
    amount: number;
    createdAt: number;
    budgetId: string;
  };
  showBudget?: boolean;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({
  expense,
  showBudget = true,
}) => {
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];

  const handleDelete = async () => {
    // Handle delete logic here
  };

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {showBudget && budget && (
        <td>
          <Link href={`/budget/${budget.id}`}>
            <a style={{ "--accent": budget.color } as React.CSSProperties}>
              {budget.name}
            </a>
          </Link>
        </td>
      )}
      <td>
        <button
          onClick={handleDelete}
          className="btn btn--warning"
          aria-label={`Delete ${expense.name} expense`}
        >
          <TrashIcon width={20} />
        </button>
      </td>
    </>
  );
};

export default ExpenseItem;
