import ExpenseItem from "./ExpenseItem";

interface TableProps {
  expenses: {
    id: string;
    name: string;
    amount: number;
    createdAt: number;
    budgetId: string;
  }[];
  showBudget?: boolean;
}

const Table: React.FC<TableProps> = ({ expenses, showBudget = true }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {["Name", "Amount", "Date", showBudget ? "Budget" : "", ""].map(
              (header, index) => (
                <th key={index}>{header}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <ExpenseItem expense={expense} showBudget={showBudget} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
