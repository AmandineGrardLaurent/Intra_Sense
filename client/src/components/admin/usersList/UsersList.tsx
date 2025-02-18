import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import style from "./usersList.module.css";

export default function UsersList({ user }: { user: UserListType }) {
  const { handleSubmit } = useForm();
  const userId = user.id;

  const onSubmit = async () => {
    try {
      fetch(`${import.meta.env.VITE_API_URL}/api/user/${userId}`, {
        method: "delete",
      });
    } catch (error) {
      toast.error("Erreur lors de la modification du profil");
    }
  };

  return (
    <section className={style.container}>
      <article key={user.id} className={style.userCard}>
        <img src={user.avatar} alt={user.lastname} className={style.avatar} />
        <div className={style.name}>
          {user.firstname} {user.lastname}
        </div>
        <div>
          Inscrit le {new Date(user.created_at).toLocaleDateString("fr")}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <button type="submit" className={style.buttonRefused}>
            Supprimer
          </button>
        </form>
      </article>
    </section>
  );
}
