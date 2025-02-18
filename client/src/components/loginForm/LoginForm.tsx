import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./loginForm.module.css";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>();

  const Navigate = useNavigate();
  const onSubmit = async (data: FieldValues) => {
    try {
      const { email, hash_password } = data;

      const loginData = {
        email: email.toLowerCase(),
        hash_password,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
      });
      const result = await response.json();
      if (response.ok) {
        reset();
        toast.success(result.message || "Connexion réussie !");
      } else {
        toast.error(result.message || "Erreur lors de la connexion");
      }

      setTimeout(() => {
        Navigate("/");
      }, 1500);
    } catch (error) {
      toast.error("Erreur de connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <section className={style.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.card}>
        <h1 className={style.title}>Connexion</h1>
        <section>
          <label htmlFor="email" className={style.label}>
            Email
            <input
              id="email"
              type="email"
              aria-label="Saisissez votre email"
              placeholder="arthur@kaamelott.fr"
              className={style.input}
              autoComplete="email"
              {...register("email", {
                required: "champ obligatoire",
              })}
            />
            <span className={style.errorText}>
              {errors.email?.message?.toString()}
            </span>
          </label>

          <label htmlFor="hash_password" className={style.label}>
            Mot de passe
            <input
              id="hash_password"
              type="password"
              aria-label="Saisissez votre mot de passe"
              placeholder="Saisissez votre mot de passe"
              className={style.input}
              autoComplete="current-password"
              {...register("hash_password", {
                required: "champ obligatoire",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                  message:
                    "Le mot de passe doit contenir au minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial",
                },
              })}
            />
            <span className={style.errorText}>
              {errors.hash_password?.message?.toString()}
            </span>
          </label>
          <div className={style.containerButton}>
            <button type="submit" className={style.buttonLogin}>
              Se connecter
            </button>
          </div>
        </section>
      </form>
    </section>
  );
}
