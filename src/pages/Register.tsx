import RegisterForm from "@/components/modules/Authentication/RegisterForm";
import { Link } from "react-router";

export default function Register() {
  return (
    <div>
      <h1>Register</h1>
      <RegisterForm />
      <p>
        Already have an account?{" "}
        <Link className="underline" to="/login">
          Login here
        </Link>
      </p>
    </div>
  );
}
