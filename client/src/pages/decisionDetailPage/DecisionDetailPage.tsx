import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { Element, Link } from "react-scroll";
import CommentsList from "../../components/commentsList/CommentsList";
import DecisionDetail from "../../components/decisionDetail/DecisionDetail";
import NavBar from "../../components/navBar/NavBar";
import PostCommentDecision from "../../components/postCommentDecision.ts/PostCommentDecision";
import UsersAnimatorsList from "../../components/users/usersAnimatorsList/UsersAnimatorsList";
import UsersExpertList from "../../components/users/usersExpertList/UsersExpertList";
import UsersImpactedtList from "../../components/users/usersImpactedList/UsersImpactedList";
import VoteCard from "../../components/voteCard/VoteCard";
import VoteCounter from "../../components/voteCounter/VoteCounter";
import style from "./decisionDetailPage.module.css";

export default function DecisionDetailPage() {
  const { id } = useParams<string>();
  if (!id) {
    return <div>Erreur, saississez un id valide</div>;
  }

  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = useCallback(() => {
    setRefresh((prev) => !prev);
  }, []);

  return (
    <>
      <Element name="top">
        <NavBar />
      </Element>
      <main className={style.page}>
        <section className={style.container}>
          <section className={style.detailsComments}>
            <DecisionDetail id={id} />
            <VoteCard id={id} onVote={triggerRefresh} />
            <CommentsList id={id} refresh={refresh} />
            <PostCommentDecision id={id} onComment={triggerRefresh} />
          </section>

          <section className={style.users}>
            <VoteCounter id={id} refresh={refresh} />
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
