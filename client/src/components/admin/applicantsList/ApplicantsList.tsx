import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import style from "./applicantsList.module.css";

export default function ApplicantsList({
  user,
  onChange,
}: {
  user: UserListType;
  onChange: () => void;
}) {
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
      toast.success("Utilisateur accepté");
      onChange();
    } catch (error) {
      toast.error("Erreur lors de la modification du profil");
    }
  };

  const onRefused = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/applicant/${userId}`, {
        method: "delete",
      });
      toast.success("Utilisateur refusé");
      onChange();
    } catch (error) {
      toast.error("Erreur lors de la modification du profil");
    }
  };

  return (
    <section className={style.container}>
      <article key={user.id} className={style.userCard}>
        <img src={user.avatar} alt={user.lastname} className={style.avatar} />
        <div className={style.name}>
          {user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)}{" "}
          {user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1)}
        </div>
        <p className={style.dateText}>
          Inscrit le {new Date(user.created_at).toLocaleDateString("fr")}
        </p>
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
