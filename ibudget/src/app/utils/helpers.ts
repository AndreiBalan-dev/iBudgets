// Introduce a delay with a random duration
export const waait = (): Promise<void> =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

// Generate a random color for budgets based on the number of existing budgets
const generateRandomColor = (): string => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

// Fetch data from local storage
export const fetchData = (key: string): any => {
  return JSON.parse(localStorage.getItem(key) || "null");
};

// Get all matching items from a specified category in local storage
export const getAllMatchingItems = ({
  category,
  key,
  value,
}: {
  category: string;
  key: string;
  value: string;
}) => {
  const data = fetchData(category) ?? [];
  return data.filter((item: any) => item[key] === value);
};

// Delete an item or entire key from local storage
export const deleteItem = ({ key, id }: { key: string; id?: string }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item: any) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

// Create a new budget and save it in local storage
export const createBudget = ({
  name,
  amount,
  currentBudgets,
}: {
  name: string;
  amount: number;
  currentBudgets: any[];
}): string | void => {
  if (currentBudgets !== null) {
    for (const elem of currentBudgets) {
      if (elem.name.toLowerCase() === name.toLowerCase()) {
        return "ALREADY_EXISTS";
      }
    }
  }

  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };

  const existingBudgets = fetchData("budgets") ?? [];
  localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

// Create a new expense and save it in local storage
export const createExpense = ({
  name,
  amount,
  budgetId,
}: {
  name: string;
  amount: number;
  budgetId: string;
}): void => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };

  const existingExpenses = fetchData("expenses") ?? [];
  localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

// Calculate the total amount spent for a specific budget
export const calculateSpentByBudget = (budgetId: string): number => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc: number, expense: any) => {
    if (expense.budgetId !== budgetId) return acc;
    return acc + expense.amount;
  }, 0);
  return budgetSpent;
};

// Format an epoch timestamp into a localized date string
export const formatDateToLocaleString = (epoch: number): string =>
  new Date(epoch).toLocaleDateString();

// Format a number as a percentage string
export const formatPercentage = (amt: number): string => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

// Format a number as a currency string
export const formatCurrency = (amt: number): string => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};

export const fetchFormData = (
  form: HTMLFormElement
): Record<string, FormDataEntryValue> => {
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
};
