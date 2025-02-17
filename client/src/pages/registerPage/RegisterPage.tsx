import CreateUserForm from "../../components/createUserForm/CreateUserForm";
import style from "./registerPage.module.css";

export default function RegisterPage() {
  return (
    <main className={style.container}>
      <CreateUserForm />
    </main>
  );
}
