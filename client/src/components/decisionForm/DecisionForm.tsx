import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddCategoryForm from "../addCategoryForm/AddCategoryForm";
import style from "./decisionForm.module.css";

function CreateDecisionForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<DataFormDecisionType>();
  const [categories, setCategories] = useState([] as CategoryType[]);
  const [countries, setCountries] = useState([] as CountryType[]);
  const [users, setUsers] = useState([] as UserType[]);
  const min_date_vote = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/country`)
      .then((response) => response.json())
      .then((data: CountryType[]) => {
        setCountries(data);
      })
      .catch(() => toast.error("Erreur de connexion au serveur"));
    fetch(`${import.meta.env.VITE_API_URL}/api/category`)
      .then((response) => response.json())
      .then((data: CategoryType[]) => {
        setCategories(data);
      })
      .catch(() => toast.error("Erreur de connexion au serveur"));
    fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data: UserType[]) => {
        setUsers(data);
      })
      .catch(() => toast.error("Erreur de connexion au serveur"));
  }, []);

  const onSubmit = async (data: DataFormDecisionType) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/decisionform`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        },
      );
      if (response.ok) {
        reset();
        navigate("/homepage");
        toast.success("Décision envoyée à l'administrateur");
      } else {
        toast.error("Erreur lors de l'envoi de la décision");
      }
    } catch (error) {
      toast.error("Erreur de connexion au serveur...");
    }
  };

  return (
    <section className={style.decisionContainer}>
      <section className={style.logo_exit}>
        <NavLink to={"/homepage"}>
          <img src="/intrasenselogo.png" alt="logo" className={style.logo} />
        </NavLink>
      </section>
      <h2 className={style.titleH2}>Création d'une décision</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <section>
          <label htmlFor="title" className={style.label}>
            Intitulé de la prise de décision :
            <input
              className={style.input}
              type="text"
              id="title"
              placeholder="Saisissez le texte ici"
              {...register("title", { required: true })}
            />
          </label>
        </section>
        <section>
          <label htmlFor="description" className={style.label}>
            Description :
            <textarea
              className={style.textarea}
              id="description"
              placeholder="Saisissez la description ici"
              {...register("description", { required: true })}
            />
          </label>
        </section>
        <section>
          <label htmlFor="context" className={style.label}>
            Quel impact sur l'organisation ?
            <textarea
              className={style.textarea}
              id="context"
              placeholder="Saisissez l'impact ici"
              {...register("context", { required: true })}
            />
          </label>
        </section>
        <section>
          <label htmlFor="profit" className={style.label}>
            Quels sont les bénéfices ?
            <textarea
              className={style.textarea}
              id="profit"
              placeholder="Saisissez les bénéfices ici"
              {...register("profit", { required: true })}
            />
          </label>
        </section>
        <section>
          <label htmlFor="risk" className={style.label}>
            Quels sont les risques ?
            <textarea
              className={style.textarea}
              id="risk"
              placeholder="Saisissez les risques ici"
              {...register("risk", { required: true })}
            />
          </label>
        </section>
        <section>
          <label className={style.label}>
            Le planning :
            <article className={style.calendar}>
              <legend className={style.legend}>
                La période de prise de décision totale doit être comprise entre
                15 jours et 90 jours
              </legend>
              <label htmlFor="min_date" className={style.label}>
                Date de clotûre des votes :
                <input
                  type="date"
                  id="min_date"
                  className={style.input}
                  min={min_date_vote}
                  required
                  {...register("min_date")}
                />
              </label>
              <label htmlFor="max_date" className={style.label}>
                Date définitive de la décision :
                <input
                  type="date"
                  id="max_date"
                  className={style.input}
                  min={min_date_vote}
                  required
                  {...register("max_date")}
                />
              </label>
            </article>
          </label>
        </section>
        <section>
          <label htmlFor="country_id" className={style.label}>
            Saisissez une localisation :
            <select
              className={style.select}
              id="country_id"
              {...register("country_id", { required: true })}
            >
              <option value="">Choisissez une localisation</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.label}
                </option>
              ))}
            </select>
          </label>
        </section>
        <section>
          <label htmlFor="category" className={style.label}>
            Saisissez une catégorie :
            <select
              id="category"
              className={style.select}
              multiple={true}
              size={3}
              {...register("category_id", { required: true })}
            >
              <option value="">Choisissez une catégorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>
        </section>

        <section className={style.users}>
          <article>
            <label htmlFor="user-expert" className={style.label}>
              Qui sont les experts ?
              <select
                id="user-expert"
                className={style.select}
                multiple={true}
                size={3}
                {...register("user_expert_id", { required: true })}
              >
                <option value="">Les experts</option>
                {users.map((userExpert) => (
                  <option key={userExpert.id} value={userExpert.id}>
                    {userExpert.firstname} {userExpert.lastname}
                  </option>
                ))}
              </select>
            </label>
          </article>
          <article>
            <label htmlFor="user-impacted" className={style.label}>
              Qui sont les impactés ?
              <select
                id="user-impacted"
                className={style.select}
                multiple={true}
                size={3}
                {...register("user_impacted_id", { required: true })}
              >
                <option value="">Les impactées</option>
                {users.map((userImpacted) => (
                  <option key={userImpacted.id} value={userImpacted.id}>
                    {userImpacted.firstname} {userImpacted.lastname}
                  </option>
                ))}
              </select>
            </label>
          </article>
          <article>
            <label htmlFor="user-animators" className={style.label}>
              Qui sont les animateurs ?
              <select
                id="user-impacted"
                className={style.select}
                multiple={true}
                size={3}
                {...register("user_animator_id", { required: true })}
              >
                <option value="">Les animateurs</option>
                {users.map((userAnimator) => (
                  <option key={userAnimator.id} value={userAnimator.id}>
                    {userAnimator.firstname} {userAnimator.lastname}
                  </option>
                ))}
              </select>
            </label>
          </article>
        </section>
        <section className={style.buttongroup}>
          <NavLink to={"/homepage"}>
            <button type="button" className={style.canceldButton}>
              Annuler
            </button>
          </NavLink>
          <button type="submit" className={style.addDecisionButton}>
            Ajouter une décision
          </button>
        </section>
      </form>
      <AddCategoryForm />
    </section>
  );
}

export default CreateDecisionForm;
