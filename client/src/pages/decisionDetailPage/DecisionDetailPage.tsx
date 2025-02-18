import { useParams } from "react-router-dom";
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
      <main className={style.container}>
        <section className={style.detailsComments}>
          <DecisionDetail id={id} />
          <CommentsList id={id} />
          <PostCommentDecision id={id} />
        </section>
        <section className={style.users}>
          <UsersAnimatorsList id={id} />
          <UsersExpertList id={id} />
          <UsersImpactedtList id={id} />
        </section>
      </main>
    </>
  );
}
