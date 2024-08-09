import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchData } from "../utils/helpers"; // Assuming you only need fetchData, not fetchFormData

const AddBudgetForm: React.FC = () => {
  const router = useRouter();
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

    // Perform your form submission logic here

    setIsSubmitting(false);
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create budget</h2>
      <form
        method="post"
        className="grid-sm"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., $350"
            required
            inputMode="decimal"
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? <span>Submitting…</span> : <span>Create budget</span>}
        </button>
      </form>
    </div>
  );
};

export default AddBudgetForm;
