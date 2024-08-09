import BudgetPage from "../../../components/BudgetPage";
import { budgetLoader } from "../../../utils/helpers";
import { GetServerSideProps } from "next";
import { BudgetPageProps } from "../../../types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const { budget, expenses } = budgetLoader({ params: { id } });
  return { props: { budget, expenses } };
};

const Budget: React.FC<BudgetPageProps> = ({ budget, expenses }) => {
  return <BudgetPage budget={budget} expenses={expenses} />;
};

export default Budget;
