import { NavLink } from "react-router-dom";
import style from "./decisionCard.module.css";

export default function DecisionCard({
  decision,
}: { decision: DecisionDetailCard }) {
  return (
    <NavLink to={`/decisionslist/${decision.id}`}>
      <section className={style.card}>
        <p className={style.userInfo}>
          <span className={style.country}>{decision.country}</span>
        </p>

        <h2 className={style.title}>{decision.title}</h2>

        <article className={style.footer}>
          <img
            src={decision.avatar}
            alt={`${decision.firstname} ${decision.lastname}'s profile`}
            className={style.profilePicture}
          />
          <p className={style.userInfo}>
            par{" "}
            <span className={style.userName}>
              {decision.firstname} {decision.lastname}
            </span>
          </p>
        </article>
      </section>
    </NavLink>
  );
}
