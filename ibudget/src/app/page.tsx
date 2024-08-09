import Dashboard from "../components/Dashboard";
import { dashboardLoader } from "../utils/helpers";
import { DashboardProps } from "../types";

const Home = async () => {
  const { userName, budgets, expenses, waitlist } = await dashboardLoader();

  return (
    <div>
      <Dashboard
        userName={userName}
        budgets={budgets}
        expenses={expenses}
        waitlist={waitlist}
      />
    </div>
  );
};

export default Home;
