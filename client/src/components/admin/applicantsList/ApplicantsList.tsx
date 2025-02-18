import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import style from "./applicantsList.module.css";

export default function ApplicantsList({ user }: { user: UserListType }) {
  const { handleSubmit } = useForm<UserListType>();
  const userId = user.id;
  const onAccept = async (user: UserListType) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/applicant/${userId}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    } catch (error) {
      toast.error("Erreur lors de la modification du profil");
    }
  };

  const onRefused = async () => {
    try {
      fetch(`${import.meta.env.VITE_API_URL}/api/applicant/${userId}`, {
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
        <div className={style.buttonGroup}>
          <form onSubmit={handleSubmit(onAccept)}>
            <button type="submit" className={style.buttonAccepted}>
              Accepter
            </button>
          </form>
          <form onSubmit={handleSubmit(onRefused)}>
            <button type="submit" className={style.buttonRefused}>
              Rejeter
            </button>
          </form>
        </div>
      </article>
    </section>
  );
}
