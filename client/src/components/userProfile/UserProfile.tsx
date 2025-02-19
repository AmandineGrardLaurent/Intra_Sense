import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./userProfile.module.css";

export default function UserProfile({ id }: { id: string }) {
  const navigate = useNavigate();
  const handleback = () => {
    navigate("/homepage");
  };
  const [user, setUser] = useState<ProfileFormValues | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const { register, handleSubmit, reset } = useForm<UpdateFormValues>();

  const validatePassword = (value: string) => {
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!pattern.test(value)) {
      setPasswordError(
        "Le mot de passe doit contenir au minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial",
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = (value: string) => {
    if (value !== password) {
      setConfirmError("Les mots de passe ne correspondent pas");
      return false;
    }
    setConfirmError("");
    return true;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
    if (confirmPassword) {
      validateConfirmPassword(confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validateConfirmPassword(value);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/${id}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok)
          throw new Error("Erreur lors de la récupération des données");

        const data = await response.json();
        const { hash_password, ...userWithoutPassword } = data;
        setUser(userWithoutPassword);
        reset(userWithoutPassword);
      } catch (error) {
        toast.error("Erreur lors de la récupération des informations");
      }
    };

    fetchProfileData();
  }, [reset, id]);

  const onSubmit = async (data: UpdateFormValues) => {
    try {
      const updatedData = {
        lastname: data.lastname?.toLowerCase(),
        firstname: data.firstname?.toLowerCase(),
        email: data.email?.toLowerCase(),
        avatar: data.avatar?.toLowerCase(),
        new_password: data.new_password,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedData),
        },
      );

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      toast.success("Modifications prises en compte");
    } catch (error) {
      toast.error("Erreur lors de l'envoi...");
    }
  };

  if (!user) return <div>Chargement...</div>;

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <header className={styles.profileHeader}>
          <h2 className={styles.title}>Mes informations</h2>
          <section className={styles.avatarContainer}>
            <img
              src={user.avatar || "/default-avatar.png"}
              alt={`${user.firstname} ${user.lastname}`}
              className={styles.profilePicture}
            />
            <p className={styles.photoChange}>Changer de photo</p>
          </section>
        </header>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.row}>
            <section className={styles.field}>
              <label className={styles.label}>
                Nom :
                <input
                  type="text"
                  defaultValue={user.lastname}
                  {...register("lastname")}
                  className={styles.input}
                />
              </label>
            </section>
            <section className={styles.field}>
              <label className={styles.label}>
                Prénom :
                <input
                  type="text"
                  defaultValue={user.firstname}
                  {...register("firstname")}
                  className={styles.input}
                />
              </label>
            </section>
          </section>

          <section className={styles.field}>
            <label className={styles.label}>
              Email :
              <input
                type="email"
                defaultValue={user.email}
                {...register("email")}
                className={styles.input}
              />
            </label>
          </section>

          <section className={styles.row}>
            <section className={styles.field}>
              <label className={styles.label}>
                Modifier votre mot de passe :
                <input
                  type="password"
                  value={password}
                  {...register("new_password")}
                  onChange={handlePasswordChange}
                  className={`${styles.input} ${passwordError ? styles.inputError : ""}`}
                  placeholder="Cliquez pour modifier"
                />
                {passwordError && (
                  <span className={styles.errorText}>{passwordError}</span>
                )}
              </label>
            </section>
            <section className={styles.field}>
              <label className={styles.label}>
                Confirmer votre mot de passe :
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={`${styles.input} ${confirmError ? styles.inputError : ""}`}
                  placeholder="Confirmer le nouveau mot de passe"
                />
                {confirmError && (
                  <span className={styles.errorText}>{confirmError}</span>
                )}
              </label>
            </section>
          </section>
          <p>
            <i className={styles.information}>
              Pour toute modification merci de saisir votre mot de passe.
            </i>
          </p>

          <footer className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.backButton}
              onClick={handleback}
            >
              Retour à l'accueil
            </button>
            <button type="submit" className={styles.saveButton}>
              Enregistrer
            </button>
          </footer>
        </form>
      </section>
    </main>
  );
}
