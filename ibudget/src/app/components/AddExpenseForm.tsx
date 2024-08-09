import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { fetchData } from "../utils/helpers";

interface AddExpenseFormProps {
  budgets: { id: string; name: string; createdAt: number }[];
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ budgets }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const focusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSubmitting && formRef.current && focusRef.current) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Handle form submission logic here

    setIsSubmitting(false);
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">Add New Expense</h2>
      <form
        method="post"
        className="grid-sm"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g., Coffee"
              ref={focusRef}
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g., 3.50"
              required
            />
          </div>
        </div>
        {budgets.length > 1 && (
          <div className="grid-xs">
            <label htmlFor="newExpenseBudget">Budget Category</label>
            <select name="newExpenseBudget" id="newExpenseBudget" required>
              {budgets
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((budget) => (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                ))}
            </select>
          </div>
        )}
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? <span>Submitting…</span> : <span>Add Expense</span>}
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
