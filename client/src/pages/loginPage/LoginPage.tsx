import LoginForm from "../../components/loginForm/LoginForm";
import style from "./loginPage.module.css";

export default function LoginPage() {
  return (
    <main className={style.container}>
      <LoginForm />
    </main>
  );
}
