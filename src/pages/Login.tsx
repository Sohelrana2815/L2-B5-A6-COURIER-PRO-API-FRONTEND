import LoginForm from "@/components/modules/Authentication/LoginForm";
import { Link } from "react-router";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
      <p>
        Don't have an account?{" "}
        <Link className="underline" to="/register">
          Register here
        </Link>
      </p>
    </div>
  );
}
