import { useRouter } from "next/router";

const ErrorPage = () => {
  const router = useRouter();
  const error = router.query.error || "An unknown error occurred";

  return (
    <div className="error">
      <h1>Uh oh! We’ve got a problem.</h1>
      <p>{error}</p>
      <div className="flex-md">
        <button className="btn btn--dark" onClick={() => router.back()}>
          <span>Go Back</span>
        </button>
        <button className="btn btn--dark" onClick={() => router.push("/")}>
          <span>Go home</span>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
