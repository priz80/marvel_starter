import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <p
        style={{
          display: "block",
          padding: "20px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Page doesn't exist
      </p>
      <Link
        style={{
          display: "block",
          color: "blue",
          padding: "20px",
          textAlign: "center",
          fontWeight: "bold",
        }}
        to="/"
      >
        Back to main page
      </Link>
    </div>
  );
};

export default Page404;
