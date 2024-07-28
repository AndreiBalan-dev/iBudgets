// rrd imports
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// library imports
import { toast } from "react-toastify";
import supabase from "../../supabaseClient";

// components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

//  helper functions
import {
  createBudget,
  createExpense,
  deleteItem,
  fetchData,
  waait,
} from "../helpers";
import Waitlist from "../components/Waitlist";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  const waitlist = fetchData("waitlist");
  return { userName, budgets, expenses, waitlist };
}

// action
export async function dashboardAction({ request }) {
  await waait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // new user submission

  console.log(_action);

  if (_action === "createBudget") {
    const budgets = fetchData("budgets");
    try {
      const createBudgetRes = createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
        currentBudgets: budgets,
      });
      if (createBudgetRes === "ALREADY_EXISTS") {
        return toast.error("Budget name already in use!");
      } else {
        return toast.success("Budget created!");
      }
    } catch (e) {
      console.log(e);
      throw new Error("There was a problem creating your budget.");
    }
  }

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { budgets, expenses } = useLoaderData(); // removed username from here

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("undefined");

  supabase.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_IN") {
      setIsLoggedIn(true);
    } else if (event === "SIGNED_OUT") {
      setIsLoggedIn(false);
      navigate(0);
    }
  });

  useEffect(() => {
    const getSession = async () => {
      const session = await supabase.auth.getSession();
      if (session.data.session !== null) {
        setIsLoggedIn(true);
        console.log(session.data.session);
        let username = session.data.session.user.user_metadata.full_name;
        if (username.split(" ").length > 1) {
          username = username.split(" ")[0];
        }
        setUsername(username);
      }
    };
    getSession();
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{username}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 8)}
                    />
                    {expenses.length > 8 && (
                      <Link
                        to="expenses"
                        className="btn--dark text-white bg-hslblack flex items-center justify-center px-4 py-2 text-base font-normal mr-2"
                      >
                        View all expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};
export default Dashboard;
