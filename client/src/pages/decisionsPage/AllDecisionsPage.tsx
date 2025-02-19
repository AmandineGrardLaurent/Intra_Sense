import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Element, Link } from "react-scroll";
import { toast } from "react-toastify";
import DecisionCard from "../../components/decisionCard/DecisionCard";
import NavBar from "../../components/navBar/NavBar";
import style from "./decisions.module.css";

export default function AllDecisionsPage() {
  const [decisions, setDecisions] = useState<DecisionDetailCard[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/alldecisions`)
      .then((response) => response.json())
      .then((data) => {
        setDecisions(data);
      })
      .catch(() => toast.error("Erreur de connexion au serveur"));
  }, []);

  return (
    <div>
      <NavBar />
      <main className={style.main}>
        <Element name="createDecision" className={style.buttonContainer}>
          <button type="button" className={style.buttonCreateDecision}>
            <NavLink to={"/decisionformpage"}>
              Créer une prise de décision
            </NavLink>
          </button>
        </Element>
        <section>
          <h2 className={style.titleH2}>Toutes Les décisions</h2>
          <div className={style.cardsContainer}>
            {decisions.map((decision) => (
              <article key={decision.id}>
                <DecisionCard decision={decision} />
              </article>
            ))}
          </div>
        </section>
        <Link
          to="createDecision"
          smooth={true}
          duration={500}
          className={style.buttonScrollToTop}
        >
          Revenir en haut
        </Link>
      </main>
    </div>
  );
}
