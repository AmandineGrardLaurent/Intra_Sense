import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import DecisionCard from "../../components/decisionCard/DecisionCard";
import NavBar from "../../components/navBar/NavBar";
import style from "./decisions.module.css";

export default function AllDecisionPage() {
  const [decisions, setDecisions] = useState<DecisionDetailCard[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/mydecisions`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setDecisions(data);
      })
      .catch(() => toast.error("Erreur de connexion au serveur"));
  }, []);

  return (
    <div>
      <NavBar />
      <main>
        <NavLink to={"/decisionformpage"}>
          <button type="button" className={style.buttonCreateDecision}>
            Créer une prise de décision
          </button>
        </NavLink>
        <section>
          <h2>Toutes Les décisions</h2>
          <div className={style.cardsContainer}>
            {decisions.map((decision) => (
              <article key={decision.id}>
                <DecisionCard decision={decision} />
              </article>
            ))}
          </div>
        </section>
        <button type="button" className={style.buttonScrollToTop}>
          Revenir en haut
        </button>
      </main>
    </div>
  );
}
