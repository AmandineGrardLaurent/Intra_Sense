import { useEffect, useState } from "react";
import ShowMoreText from "react-show-more-text";
import style from "./decisionDetail.module.css";

export default function DecisionDetail({ id }: { id: string }) {
  const [decision, setDecision] = useState(null as null | DecisionDetailType);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/decision/${id}`)
      .then((response) => response.json())
      .then((data: DecisionDetailType) => {
        setDecision(data);
      });
  }, [id]);

  return (
    decision && (
      <section className={style.container}>
        <article>
          <h1 className={style.title}>{decision.title}</h1>
          <p className={style.creatorNameTitle}>
            Animé par{" "}
            <span className={style.creatorName}>
              {decision.firstname} {decision.lastname}
            </span>
          </p>
        </article>
        <article>
          <h2 className={style.titleH2}>
            Description détaillée de la prise de décision
          </h2>
          <ShowMoreText
            lines={4}
            more="Voir plus"
            less="Voir moins"
            className={style.paragraph}
            anchorClass={style.ShowMoreText}
          >
            <p>{decision.description}</p>
          </ShowMoreText>
        </article>
        <article>
          <h2 className={style.titleH2}>Impact sur l'organisation</h2>
          <ShowMoreText
            lines={4}
            more="Voir plus"
            less="Voir moins"
            className={style.paragraph}
            anchorClass={style.ShowMoreText}
          >
            <p>{decision.context}</p>
          </ShowMoreText>
        </article>
        <article>
          <h2 className={style.titleH2}>Bénéfices</h2>
          <ShowMoreText
            lines={4}
            more="Voir plus"
            less="Voir moins"
            className={style.paragraph}
            anchorClass={style.ShowMoreText}
          >
            <p>{decision.profit}</p>
          </ShowMoreText>
        </article>
        <article>
          <h2 className={style.titleH2}>Risques potentiels</h2>
          <ShowMoreText
            lines={4}
            more="Voir plus"
            less="Voir moins"
            className={style.paragraph}
            anchorClass={style.ShowMoreText}
          >
            <p>{decision.risk}</p>
          </ShowMoreText>
        </article>
      </section>
    )
  );
}
