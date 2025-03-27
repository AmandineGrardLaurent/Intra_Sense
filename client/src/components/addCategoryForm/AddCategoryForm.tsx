import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import style from "./addCategoryForm.module.css";

function AddCategoryForm() {
  const { register, handleSubmit, reset } = useForm<FormValuesCategory>();

  const onSubmit = async (data: CategoryFormData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/category`,
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
        toast.success("Catégorie ajoutée");
      } else {
        toast.error("Erreur lors de l'envoi...");
      }
    } catch (error) {
      toast.error("Erreur lors de l'envoi...");
    }
  };

  return (
    <section className={style.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <label htmlFor="label" className={style.label}>
          Ajoutez une nouvelle catégorie :
          <input
            className={style.input}
            type="text"
            id="label"
            placeholder="Nouvelle catégorie"
            {...register("label", {
              required: "Veuillez entrer une catégorie",
              minLength: { value: 2, message: "Au moins 2 caractères requis" },
              maxLength: { value: 50, message: "Maximum 50 caractères" },
            })}
          />
        </label>
        <button type="submit" className={style.buttonAddCategory}>
          Ajout d'une catégorie
        </button>
      </form>
    </section>
  );
}

export default AddCategoryForm;
