import { useParams } from "react-router-dom";
import { Element, Link } from "react-scroll";
import CommentsList from "../../components/commentsList/CommentsList";
import DecisionDetail from "../../components/decisionDetail/DecisionDetail";
import NavBar from "../../components/navBar/NavBar";
import PostCommentDecision from "../../components/postCommentDecision.ts/PostCommentDecision";
import UsersAnimatorsList from "../../components/users/usersAnimatorsList/UsersAnimatorsList";
import UsersExpertList from "../../components/users/usersExpertList/UsersExpertList";
import UsersImpactedtList from "../../components/users/usersImpactedList/UsersImpactedList";
import style from "./decisionDetailPage.module.css";

export default function DecisionDetailPage() {
  const { id } = useParams<string>();

  if (!id) {
    return <div>Erreur, saississez un id valide</div>;
  }

  return (
    <>
      <NavBar />
      <main className={style.page}>
        <section className={style.container}>
          <Element name="top">
            <section className={style.detailsComments}>
              <DecisionDetail id={id} />
              <CommentsList id={id} />
              <PostCommentDecision id={id} />
            </section>
          </Element>
          <section className={style.users}>
            <UsersAnimatorsList id={id} />
            <UsersExpertList id={id} />
            <UsersImpactedtList id={id} />
          </section>
        </section>
        <Link
          to="top"
          smooth={true}
          duration={500}
          className={style.buttonScrollToTop}
        >
          Revenir en haut
        </Link>
      </main>
    </>
  );
}
