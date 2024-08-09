import ExpensesPage from "../../components/ExpensesPage";
import { expensesLoader } from "../../utils/helpers";
import { GetServerSideProps } from "next";
import { ExpensesPageProps } from "../../types";

export const getServerSideProps: GetServerSideProps = async () => {
  const { expenses } = expensesLoader();
  return { props: { expenses } };
};

const Expenses: React.FC<ExpensesPageProps> = ({ expenses }) => {
  return <ExpensesPage expenses={expenses} />;
};

export default Expenses;
